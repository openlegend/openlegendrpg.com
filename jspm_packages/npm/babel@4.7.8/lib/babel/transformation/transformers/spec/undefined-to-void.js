/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.Identifier = Identifier;
var t = _interopRequireWildcard(require('../../../types/index'));
var optional = exports.optional = true;
function Identifier(node, parent) {
  if (node.name === "undefined" && this.isReferenced()) {
    return t.unaryExpression("void", t.literal(0), true);
  }
}
exports.__esModule = true;
