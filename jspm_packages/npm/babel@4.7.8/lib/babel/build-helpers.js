/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var File = _interopRequire(require('./transformation/file'));
var util = _interopRequireWildcard(require('./util'));
var each = _interopRequire(require('lodash/collection/each'));
var t = _interopRequire(require('./types/index'));
module.exports = function(body, namespace) {
  var whitelist = arguments[2] === undefined ? [] : arguments[2];
  each(File.helpers, function(name) {
    if (whitelist.length && whitelist.indexOf(name) === -1)
      return;
    var key = t.identifier(t.toIdentifier(name));
    body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(namespace, key), util.template(name))));
  });
};
