/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.ArrowFunctionExpression = ArrowFunctionExpression;
var t = _interopRequireWildcard(require('../../../types/index'));
var check = exports.check = t.isArrowFunctionExpression;
function ArrowFunctionExpression(node) {
  t.ensureBlock(node);
  node._aliasFunction = "arrow";
  node.expression = false;
  node.type = "FunctionExpression";
  return node;
}
exports.__esModule = true;
