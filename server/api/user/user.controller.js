'use strict';

var User = require('./user.model');
var uuid = require('node-uuid');
var passport = require('passport');
var config = require('../../config/environment');
var errors = require(__base + 'errors');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');

const USER = 'user';

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res, next) {
  User.find({}, '-salt -hashedPassword')
  .exec()
  .then(function (users) {
    res.json(200, users);
  }, next);
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.uuid = uuid.v4();
  newUser.role = 'user';
  newUser.provider = 'local';

  newUser.save()
  .then(function(user) {
    var token = jwt.sign({ uuid: user.uuid }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  }, function(err) {
    next(new errors.StatusError(422, err));
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findOne({ uuid: userId })
  .exec()
  .then(function(user) {
    if (!user) { return next(new errors.NotFound(USER)); }
    res.json(user.profile);
  }, next);
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res, next) {
  User.findOneAndRemove({ uuid: req.params.id })
  .exec()
  .then(function() {
    return res.send(204);
  }, next);
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user.uuid;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findOne({ uuid: userId })
  .exec()
  .then(function(user) {
    if (!user) { return next(new errors.NotFound(USER)); }

    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save()
      .then(function() {
        res.send(204);
      }, function(err) {
        next(new errors.StatusError(422, err));
      });
    } else {
      next(new errors.StatusError(403, { code: 'authentication.error', message: 'The old password did not match.' }));
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user.uuid;
  User.findOne({ uuid: userId }, '-salt -hashedPassword') // don't ever give out the password or salt
  .exec()
  .then(function(user) {
    if (!user) { return next(new errors.NotFound(USER)); }
    res.json(user);
  }, next);
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
};

/**
 * Create file upload
 */
exports.uploadProfilePhoto = function (req, res) {
  var form = new multiparty.Form({
    autoFiles: true,
    uploadDir: process.env.TMPDIR
  });
  form.parse(req, function(err, fields, files) {
    var file = files.file[0];
    var contentType = file.headers['content-type'];
    var tmpPath = file.path;
    var extIndex = tmpPath.lastIndexOf('.');
    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
    // uuid is for generating unique filenames.
    var fileName = uuid.v4() + extension;
    var destFullPath = config.uploadPath + '/profiles/' + fileName;
    var destRelPath = config.server.uri + config.uploadDir + '/profiles/' + fileName;

    // Server side file type checker.
    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
      fs.unlink(tmpPath);
      return res.status(400).send('Unsupported file type.');
    }

    // check headers for a user property, if present, this is an profile
    // image for a new user
    if ( res.req.headers.hasOwnProperty('user') ) {
      var user = JSON.parse(res.req.header('user') );
    }
    // case where POS system is sending a photo to attach to a given
    if ( res.req.headers.hasOwnProperty('order') ) {
      var order = JSON.parse(res.req.header('order') );
    }

    if ( _.isEmpty( order ) && _.isEmpty( user ) ) {
      return res.status(400).send('request has neither `user` nor `order` property');
    } else {
      fs.rename(tmpPath, destFullPath, function(err) {
        if (err) {
          return res.status(400).send('Image is not saved:'+ err);
        }
        // add this as an avatar for the user's profile
        if ( user ) {
          User.findById(user._id, function (err, user) {
            if (err) return validationError(res, err);
            user.avatar = destRelPath;
            user.save(function(err) {
              res.status(200);
            });
          });
        }
        // @TODO build this out
        if ( order ) {
          // do work to associate the photo with a given order, probably just
          // pass back the URL so that it can be stored in app front-end and then
          // added to the payload of an order

        }
        return res.send(destRelPath);
      });
    }
  });
};
