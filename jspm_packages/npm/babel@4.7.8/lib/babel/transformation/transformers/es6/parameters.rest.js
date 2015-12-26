/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var isNumber = _interopRequire(require("lodash/lang/isNumber"));
var util = _interopRequireWildcard(require("../../../util"));
var t = _interopRequireWildcard(require("../../../types/index"));
var check = exports.check = t.isRestElement;
var memberExpressionOptimisationVisitor = {enter: function enter(node, parent, scope, state) {
    if (this.isScope() && !scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      return this.skip();
    }
    if (this.isFunctionDeclaration() || this.isFunctionExpression()) {
      state.noOptimise = true;
      scope.traverse(node, memberExpressionOptimisationVisitor, state);
      state.noOptimise = false;
      return this.skip();
    }
    if (!this.isReferencedIdentifier({name: state.name}))
      return ;
    if (!state.noOptimise && t.isMemberExpression(parent) && parent.computed) {
      var prop = parent.property;
      if (isNumber(prop.value) || t.isUnaryExpression(prop) || t.isBinaryExpression(prop)) {
        state.candidates.push(this);
        return ;
      }
    }
    state.canOptimise = false;
    this.stop();
  }};
function optimizeMemberExpression(parent, offset) {
  var newExpr;
  var prop = parent.property;
  if (t.isLiteral(prop)) {
    prop.value += offset;
    prop.raw = String(prop.value);
  } else {
    newExpr = t.binaryExpression("+", prop, t.literal(offset));
    parent.property = newExpr;
  }
}
var hasRest = function hasRest(node) {
  return t.isRestElement(node.params[node.params.length - 1]);
};
exports.Function = function(node, parent, scope, file) {
  if (!hasRest(node))
    return ;
  var rest = node.params.pop().argument;
  var argsId = t.identifier("arguments");
  argsId._ignoreAliasFunctions = true;
  if (t.isPattern(rest)) {
    var pattern = rest;
    rest = scope.generateUidIdentifier("ref");
    var declar = t.variableDeclaration("let", pattern.elements.map(function(elem, index) {
      var accessExpr = t.memberExpression(rest, t.literal(index), true);
      return t.variableDeclarator(elem, accessExpr);
    }));
    file.checkNode(declar);
    node.body.body.unshift(declar);
  }
  var state = {
    outerBinding: scope.getBindingIdentifier(rest.name),
    canOptimise: true,
    candidates: [],
    method: node,
    name: rest.name
  };
  scope.traverse(node, memberExpressionOptimisationVisitor, state);
  if (state.canOptimise && state.candidates.length) {
    for (var i = 0; i < state.candidates.length; i++) {
      var candidate = state.candidates[i];
      candidate.node = argsId;
      optimizeMemberExpression(candidate.parent, node.params.length);
    }
    return ;
  }
  var start = t.literal(node.params.length);
  var key = scope.generateUidIdentifier("key");
  var len = scope.generateUidIdentifier("len");
  var arrKey = key;
  var arrLen = len;
  if (node.params.length) {
    arrKey = t.binaryExpression("-", key, start);
    arrLen = t.conditionalExpression(t.binaryExpression(">", len, start), t.binaryExpression("-", len, start), t.literal(0));
  }
  scope.assignTypeGeneric(rest.name, "Array");
  var loop = util.template("rest", {
    ARGUMENTS: argsId,
    ARRAY_KEY: arrKey,
    ARRAY_LEN: arrLen,
    START: start,
    ARRAY: rest,
    KEY: key,
    LEN: len
  });
  loop._blockHoist = node.params.length + 1;
  node.body.body.unshift(loop);
};
exports.__esModule = true;
