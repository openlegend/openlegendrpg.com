/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.ImportDeclaration = ImportDeclaration;
exports.ExportDeclaration = ExportDeclaration;
var t = _interopRequireWildcard(require("../../../types/index"));
exports.check = require("../internal/modules").check;
function ImportDeclaration(node, parent, scope, file) {
  if (node.isType)
    return ;
  var nodes = [];
  if (node.specifiers.length) {
    for (var i = 0; i < node.specifiers.length; i++) {
      file.moduleFormatter.importSpecifier(node.specifiers[i], node, nodes, parent);
    }
  } else {
    file.moduleFormatter.importDeclaration(node, nodes, parent);
  }
  if (nodes.length === 1) {
    nodes[0]._blockHoist = node._blockHoist;
  }
  return nodes;
}
function ExportDeclaration(node, parent, scope, file) {
  if (t.isTypeAlias(node.declaration))
    return ;
  var nodes = [];
  var i;
  if (node.declaration) {
    if (t.isVariableDeclaration(node.declaration)) {
      var declar = node.declaration.declarations[0];
      declar.init = declar.init || t.identifier("undefined");
    }
    file.moduleFormatter.exportDeclaration(node, nodes, parent);
  } else if (node.specifiers) {
    for (i = 0; i < node.specifiers.length; i++) {
      file.moduleFormatter.exportSpecifier(node.specifiers[i], node, nodes, parent);
    }
  }
  if (node._blockHoist) {
    for (i = 0; i < nodes.length; i++) {
      nodes[i]._blockHoist = node._blockHoist;
    }
  }
  return nodes;
}
exports.__esModule = true;
