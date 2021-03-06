/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.manipulateOptions = manipulateOptions;
var remapAsyncToGenerator = _interopRequire(require('../../helpers/remap-async-to-generator'));
var t = _interopRequireWildcard(require('../../../types/index'));
function manipulateOptions(opts) {
  opts.experimental = true;
  opts.blacklist.push("regenerator");
}
var optional = exports.optional = true;
exports.Function = function(node, parent, scope, file) {
  if (!node.async || node.generator)
    return;
  return remapAsyncToGenerator(node, t.memberExpression(file.addImport("bluebird", null, true), t.identifier("coroutine")), scope);
};
exports.__esModule = true;
