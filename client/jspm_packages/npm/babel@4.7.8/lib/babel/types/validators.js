/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.isReferenced = isReferenced;
exports.isReferencedIdentifier = isReferencedIdentifier;
exports.isValidIdentifier = isValidIdentifier;
exports.isLet = isLet;
exports.isBlockScoped = isBlockScoped;
exports.isVar = isVar;
exports.isSpecifierDefault = isSpecifierDefault;
exports.isScope = isScope;
exports.isImmutable = isImmutable;
var isString = _interopRequire(require('lodash/lang/isString'));
var esutils = _interopRequire(require('esutils'));
var t = _interopRequireWildcard(require('./index'));
function isReferenced(node, parent) {
  if (t.isMemberExpression(parent)) {
    if (parent.property === node && parent.computed) {
      return true;
    } else if (parent.object === node) {
      return true;
    } else {
      return false;
    }
  }
  if (t.isProperty(parent) && parent.key === node) {
    return parent.computed;
  }
  if (t.isVariableDeclarator(parent)) {
    return parent.id !== node;
  }
  if (t.isFunction(parent)) {
    for (var i = 0; i < parent.params.length; i++) {
      var param = parent.params[i];
      if (param === node)
        return false;
    }
    return parent.id !== node;
  }
  if (t.isExportSpecifier(parent, {name: node})) {
    return false;
  }
  if (t.isImportSpecifier(parent, {id: node})) {
    return false;
  }
  if (t.isClass(parent)) {
    return parent.id !== node;
  }
  if (t.isMethodDefinition(parent)) {
    return parent.key === node && parent.computed;
  }
  if (t.isLabeledStatement(parent)) {
    return false;
  }
  if (t.isCatchClause(parent)) {
    return parent.param !== node;
  }
  if (t.isRestElement(parent)) {
    return false;
  }
  if (t.isAssignmentPattern(parent)) {
    return parent.right === node;
  }
  if (t.isPattern(parent)) {
    return false;
  }
  if (t.isImportSpecifier(parent)) {
    return false;
  }
  if (t.isImportBatchSpecifier(parent)) {
    return false;
  }
  if (t.isPrivateDeclaration(parent)) {
    return false;
  }
  return true;
}
function isReferencedIdentifier(node, parent, opts) {
  return t.isIdentifier(node, opts) && t.isReferenced(node, parent);
}
function isValidIdentifier(name) {
  return isString(name) && esutils.keyword.isIdentifierName(name) && !esutils.keyword.isReservedWordES6(name, true);
}
function isLet(node) {
  return t.isVariableDeclaration(node) && (node.kind !== "var" || node._let);
}
function isBlockScoped(node) {
  return t.isFunctionDeclaration(node) || t.isClassDeclaration(node) || t.isLet(node);
}
function isVar(node) {
  return t.isVariableDeclaration(node, {kind: "var"}) && !node._let;
}
function isSpecifierDefault(specifier) {
  return specifier["default"] || t.isIdentifier(specifier.id) && specifier.id.name === "default";
}
function isScope(node, parent) {
  if (t.isBlockStatement(node)) {
    if (t.isLoop(parent.block, {body: node})) {
      return false;
    }
    if (t.isFunction(parent.block, {body: node})) {
      return false;
    }
  }
  return t.isScopable(node);
}
function isImmutable(node) {
  if (t.isLiteral(node)) {
    if (node.regex) {
      return false;
    } else {
      return true;
    }
  } else if (t.isIdentifier(node)) {
    if (node.name === "undefined") {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
exports.__esModule = true;
