/**
 * Restify configuration
 */

'use strict';

var restify = require('restify');
var favicon = require('serve-favicon');
var path = require('path');
var config = require('./environment');

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

  api.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  // if ('production' === env) {
  //   // api.use(express.static(path.join(config.root, 'public')));
  //   // api.set('appPath', path.join(config.root, 'public'));
  //   api.get(/.*/, restify.serveStatic({
  //     'directory': 'client',
  //     'default': 'index.html'
  //   }));

  // }

  // if ('development' === env || 'test' === env) {
    api.get(/.*/, restify.serveStatic({
      'directory': 'client',
      'default': 'index.html'
    }));
  // }

};
