'use strict';

var restify = require('restify');
var bunyan = require('bunyan');
var config = require('./config/environment');

var log = new bunyan.createLogger({ name: 'EXP API' });
var server = restify.createServer({log: log});

// add authorization to whitelisted headers
restify.CORS.ALLOW_HEADERS.push('authorization');

server.acceptable.push('html'); // html is not part of 'acceptable' array by default
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.jsonBodyParser());
server.use(restify.CORS()); // CORS

server.on('uncaughtException', function(req, res, route, err) {
  console.log(err.stack);
  res.send(500, err);
});

// var path     = require('path'),
//     express  = require('express'),
//     server      = express();

// server.configure(function() {
//     server.use(express.logger('dev'));
//     server.use(express.compress());
//     server.use(express.methodOverride());
//     server.use(express.bodyParser());
//     server.use(server.router);
//     server.all('/*', function(req, res, next) {
//         res.sendfile('index.html', { root: config.root });
//     });
//     server.use(express.errorHandler({
//         dumpExceptions: true,
//         showStack: true
//     }));
// });

module.exports = server;

