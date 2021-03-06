/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.check = check;
exports.Property = Property;
var messages = _interopRequireWildcard(require('../../../messages'));
function check(node) {
  return node.kind === "set";
}
function Property(node, parent, scope, file) {
  if (node.kind === "set" && node.value.params.length !== 1) {
    throw file.errorWithNode(node.value, messages.get("settersInvalidParamLength"));
  }
}
exports.MethodDefinition = Property;
exports.__esModule = true;
