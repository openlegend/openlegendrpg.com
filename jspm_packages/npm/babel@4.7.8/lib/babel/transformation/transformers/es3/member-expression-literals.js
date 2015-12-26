/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.MemberExpression = MemberExpression;
var t = _interopRequireWildcard(require("../../../types/index"));
function MemberExpression(node) {
  var prop = node.property;
  if (node.computed && t.isLiteral(prop) && t.isValidIdentifier(prop.value)) {
    node.property = t.identifier(prop.value);
    node.computed = false;
  } else if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
    node.property = t.literal(prop.name);
    node.computed = true;
  }
}
exports.__esModule = true;
