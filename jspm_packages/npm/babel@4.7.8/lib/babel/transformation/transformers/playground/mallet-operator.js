/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var messages = _interopRequireWildcard(require('../../../messages'));
var build = _interopRequire(require('../../helpers/build-conditional-assignment-operator-transformer'));
var t = _interopRequireWildcard(require('../../../types/index'));
var playground = exports.playground = true;
build(exports, {
  is: function is(node, file) {
    if (t.isAssignmentExpression(node, {operator: "||="})) {
      var left = node.left;
      if (!t.isMemberExpression(left) && !t.isIdentifier(left)) {
        throw file.errorWithNode(left, messages.get("expectedMemberExpressionOrIdentifier"));
      }
      return true;
    }
  },
  build: function build(node) {
    return t.unaryExpression("!", node, true);
  }
});
exports.__esModule = true;
