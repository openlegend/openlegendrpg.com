'use strict';

var config = require(__base + 'config/environment');
var jwt = require('jsonwebtoken');
var restifyJwt = require('restify-jwt');
var compose = require('composable-middleware');
var User = require(__base + 'api/user/user.model');
var validateJwt = restifyJwt({ secret: config.secrets.session });
var server = require(__base + 'server');

/**
 * Catch errors
 */
server.on('InvalidCredentials', function(req, res) {
  res.json(401, { code: 'authentication.error', message: 'The authorization token is missing or invalid.' });
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findOne({ uuid: req.user.uuid }, function (err, user) {
        if (err) return next(err);
        if (!user) return res.json(401, { code: 'authentication.error', message: 'The authorization token is missing or invalid.' });

        req.user = user;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.send(403, 'Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ uuid: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = signToken(req.user.uuid, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
