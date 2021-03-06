/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.toEsprimaToken = toEsprimaToken;
exports.toEsprimaAST = toEsprimaAST;
var traverse = _interopRequire(require('../traversal/index'));
var tokTypes = require('acorn-babel').tokTypes;
var t = _interopRequire(require('../types/index'));
function toEsprimaToken(token) {
  var type = token.type;
  if (type === tokTypes.name) {
    token.type = "Identifier";
  } else if (type === tokTypes.semi || type === tokTypes.comma || type === tokTypes.parenL || type === tokTypes.parenR || type === tokTypes.braceL || type === tokTypes.braceR) {
    token.type = "Punctuator";
    token.value = type.type;
  }
  return token;
}
function toEsprimaAST(ast) {
  traverse(ast, astTransformVisitor);
}
var astTransformVisitor = {
  noScope: true,
  enter: function enter(node) {
    if (t.isImportBatchSpecifier(node)) {
      node.type = "ImportNamespaceSpecifier";
      node.id = node.name;
      delete node.name;
    } else if (t.isFunction(node)) {
      node.defaults = [];
      node.params = node.params.map(function(param) {
        if (t.isAssignmentPattern(param)) {
          node.defaults.push(param.right);
          return param.left;
        } else {
          node.defaults.push(null);
          return param;
        }
      });
      if (t.isRestElement(node.params[node.params.length - 1])) {
        node.rest = node.params.pop();
      }
    } else if (t.isClassProperty(node)) {
      this.remove();
    }
  }
};
exports.__esModule = true;
