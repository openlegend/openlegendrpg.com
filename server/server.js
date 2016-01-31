'use strict';

var restify = require('restify');
var serveStatic = require('serve-static');

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

// custom middleware for apps that make requests to paths with no
// file associated - allows angular to handle routing fallback
function checkHtml5Route (req, res, next) {
  // 301 redirect www to non-www
  // if ( req.headers.host.match(/www\.openlegendrpg\.com/) ) {
  //   res.setHeader('Location','http://openlegendrpg.com');
  //   res.send(301);
  // }

  // requesting a route rather than a file (has no `.` character)
  if ( req.path().split('.').length <= 1 ) {
    req.url = 'index.html';
    req.path = function () { return req.url; };
    var serve = serveStatic(
      config.root+'/client',
      {'index': ['index.html']}
    );

    serve(req,res,next);
  } else {
    next();
  }
};

server.use(checkHtml5Route);
server.use(serveStatic(config.root + '/client', {'index': ['index.html']}));

server.on('uncaughtException', function(req, res, route, err) {
  console.log(err.stack);
  res.send(500, err);
});

module.exports = server;
