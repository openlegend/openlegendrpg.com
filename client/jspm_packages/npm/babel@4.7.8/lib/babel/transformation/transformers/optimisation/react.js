/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.JSXElement = JSXElement;
var react = _interopRequireWildcard(require('../../helpers/react'));
var t = _interopRequire(require('../../../types/index'));
var optional = exports.optional = true;
var immutabilityVisitor = {enter: function enter(node, parent, scope, state) {
    if (t.isJSXIdentifier(node) && react.isCompatTag(node.name)) {
      return;
    }
    if (t.isJSXIdentifier(node) || t.isIdentifier(node)) {
      if (t.isReferenced(node, parent)) {
        state.identifiers.push(node.name);
        return;
      }
    }
    if (t.isJSXClosingElement(node)) {
      this.skip();
      return;
    }
    if (t.isIdentifier(node) || t.isJSXMemberExpression(node)) {
      return;
    }
    state.isImmutable = t.isImmutable(node);
    if (!state.isImmutable)
      this.stop();
  }};
function JSXElement(node, parent, scope, file) {
  var state = {
    identifiers: [],
    isImmutable: true
  };
  this.traverse(immutabilityVisitor, state);
  this.skip();
  if (!state.isImmutable)
    return;
  var lastCompatibleScope = scope;
  var checkScope = scope;
  crawl: do {
    for (var i = 0; i < state.identifiers.length; i++) {
      if (!checkScope.hasBinding(state.identifiers[i])) {
        break crawl;
      }
    }
    lastCompatibleScope = checkScope;
  } while (checkScope = checkScope.parent);
  if (lastCompatibleScope === scope)
    return;
  var uid = scope.generateUidIdentifier("ref");
  var scopeBlock = lastCompatibleScope.block;
  if (t.isFunction(scopeBlock)) {
    scopeBlock = scopeBlock.body;
  }
  if (t.isBlockStatement(scopeBlock) || t.isProgram(scopeBlock)) {
    scopeBlock.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(uid, node)]));
    return uid;
  }
}
exports.__esModule = true;
