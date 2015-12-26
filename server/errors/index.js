/**
 * Error responses
 */

'use strict';

var restify = require('restify');
var util = require('util');

var messages = require('./messages.json');

// bad request error (400)
function BadRequest(error) {
  restify.RestError.call(this, {
    restCode: error,
    statusCode: 400,
    message: messages[error],
    constructorOpt: BadRequest
  });
  this.name = 'BadRequest';
}
util.inherits(BadRequest, restify.RestError);

module.exports.BadRequest = BadRequest;

// not found error (404)
function NotFound(error) {
  restify.RestError.call(this, {
    restCode: error  + '.missing',
    statusCode: 404,
    message: messages[error  + '.missing'],
    constructorOpt: NotFound
  });
  this.name = 'NotFound';
}
util.inherits(NotFound, restify.RestError);

module.exports.NotFound = NotFound;

// status code error (any status or body)
function StatusError(status, body) {
  restify.RestError.call(this, {
    statusCode: status,
    body: body,
    constructorOpt: StatusError
  });
  this.name = 'StatusError';
}
util.inherits(StatusError, restify.RestError);

module.exports.StatusError = StatusError;

// request promise error (maps or proxies errors from request-promise)
function RequestPromiseError(reason) {
  var body;
  var statusCode = reason.statusCode || 500;
  var restCode = 'system.error';
  var message = reason.message;
  console.log(reason);

  // parse error body
  if (reason.response &&
      reason.response.headers['content-type'] &&
      reason.response.headers['content-type'].indexOf('application/json') === 0) {
    body = JSON.parse(reason.error);
  }

  restify.RestError.call(this, {
    restCode: restCode,
    statusCode: statusCode,
    message: message,
    body: body,
    constructorOpt: RequestPromiseError
  });
  this.name = 'RequestPromiseError';
}
util.inherits(RequestPromiseError, restify.RestError);

module.exports.RequestPromiseError = RequestPromiseError;

