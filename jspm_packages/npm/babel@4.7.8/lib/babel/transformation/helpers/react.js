/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.isCreateClass = isCreateClass;
exports.isCompatTag = isCompatTag;
var t = _interopRequireWildcard(require("../../types/index"));
var isCreateClassCallExpression = t.buildMatchMemberExpression("React.createClass");
function isCreateClass(node) {
  if (!node || !t.isCallExpression(node))
    return false;
  if (!isCreateClassCallExpression(node.callee))
    return false;
  var args = node.arguments;
  if (args.length !== 1)
    return false;
  var first = args[0];
  if (!t.isObjectExpression(first))
    return false;
  return true;
}
var isReactComponent = exports.isReactComponent = t.buildMatchMemberExpression("React.Component");
function isCompatTag(tagName) {
  return tagName && /^[a-z]|\-/.test(tagName);
}
exports.__esModule = true;
