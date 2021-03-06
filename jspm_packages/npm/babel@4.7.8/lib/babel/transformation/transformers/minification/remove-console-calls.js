/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.CallExpression = CallExpression;
var t = _interopRequire(require('../../../types/index'));
var isConsole = t.buildMatchMemberExpression("console", true);
var optional = exports.optional = true;
function CallExpression(node, parent) {
  if (isConsole(node.callee)) {
    if (t.isExpressionStatement(parent)) {
      this.parentPath.remove();
    } else {
      this.remove();
    }
  }
}
exports.__esModule = true;
