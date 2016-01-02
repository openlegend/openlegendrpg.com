/**
 * Restify configuration
 */

'use strict';

var restify = require('restify');
var favicon = require('serve-favicon');
var path = require('path');
var config = require('./environment');
var fs = require('fs');

module.exports = function(api) {
  var env = config.env;

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  // api.use(session({
  //   secret: config.secrets.session,
  //   resave: true,
  //   saveUninitialized: true,
  //   store: new mongoStore({ mongoose_connection: mongoose.connection })
  // }));

  // if ('development' === env || 'test' === env) {

    api.get(/.*/, function (req, res, next) {
      // requesting a route rather than a file (has no `.` character)
      // allows angular to handle via html5 push state
      // if ( req.path().split('.').length <= 1 ) {
      //   req.url = 'index.html';
      //   req.path = function () { return req.url; };
      // }
      // var serve = restify.serveStatic({
      //   'directory': config.root+'/client',
      //   'default': 'index.html'
      // });

      // serve(req,res,next);
    });

  // }

};
