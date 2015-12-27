/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.BlockStatement = BlockStatement;
var t = _interopRequireWildcard(require('../../../types/index'));
function BlockStatement(node, parent, scope, file) {
  if (t.isFunction(parent) && parent.body === node || t.isExportDeclaration(parent)) {
    return;
  }
  for (var i = 0; i < node.body.length; i++) {
    var func = node.body[i];
    if (!t.isFunctionDeclaration(func))
      continue;
    var declar = t.variableDeclaration("let", [t.variableDeclarator(func.id, t.toExpression(func))]);
    declar._blockHoist = 2;
    func.id = null;
    node.body[i] = declar;
    file.checkNode(declar);
  }
}
exports.__esModule = true;
