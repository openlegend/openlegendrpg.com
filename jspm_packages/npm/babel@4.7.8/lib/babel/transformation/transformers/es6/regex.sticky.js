/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.check = check;
exports.Literal = Literal;
var regex = _interopRequireWildcard(require('../../helpers/regex'));
var t = _interopRequireWildcard(require('../../../types/index'));
function check(node) {
  return regex.is(node, "y");
}
function Literal(node) {
  if (!regex.is(node, "y"))
    return;
  return t.newExpression(t.identifier("RegExp"), [t.literal(node.regex.pattern), t.literal(node.regex.flags)]);
}
exports.__esModule = true;
