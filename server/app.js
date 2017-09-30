'use strict';
/*global __base*/

// Helper for imports relative to application root.
// i.e. require(__base + 'models')
global.__base = __dirname + '/';

// Set default node environment to localhost
// process.env.NODE_ENV = process.env.NODE_ENV || 'localhost';

// var mongoose = require('mongoose');
var config = require('./config/environment');
var server = require(__base + '/server');

// Connect to database
// mongoose.connect(config.mongo.uri, config.mongo.options);
// server.log.warn('FIXME: Handle mongo failures.');

// Populate DB with sample data
// if(config.seedDB) { require('./config/seed'); }

// var socketio = require('socket.io')(server, {
//   serveClient: config.env !== 'production',
//   path: '/socket.io-client'
// });

// Temp: Uncomment to test Interface.
// setTimeout(require.bind(null, __base + 'lib/interface/test'), 3000);

// require('./config/socketio')(socketio);
require('./config/restify')(server);

// @TODO API requires some work to get running, uncomment and fix
// openshift issues if using API
// require('./routes')(server);

// Start API server
server.listen(config.port, config.ip, function () {
  server.log.info('Restify API server listening on %d, in %s mode', config.port, config.env);
});

// Expose api
exports = module.exports = server; // Don't think requiring the main script is sensible. -J
