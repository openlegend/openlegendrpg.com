'use strict';

var passport = require('passport');
var auth = require('../auth.service');
var server = require(__base + 'server');

server.post('/api/auth/local', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log(err,user,info);
    var error = err || info;
    if (error) return res.json(401, { code: 'authentication.error', message: 'The credentials are missing or invalid.' });
    if (!user) return res.json(404, { code: 'user.missing', message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user.uuid, user.role);
    res.json({token: token});
  })(req, res, next);
});
