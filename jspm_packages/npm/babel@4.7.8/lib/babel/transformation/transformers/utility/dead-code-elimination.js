/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.ConditionalExpression = ConditionalExpression;
var t = _interopRequireWildcard(require("../../../types/index"));
function toStatements(node) {
  if (t.isBlockStatement(node)) {
    var hasBlockScoped = false;
    for (var i = 0; i < node.body.length; i++) {
      var bodyNode = node.body[i];
      if (t.isBlockScoped(bodyNode))
        hasBlockScoped = true;
    }
    if (!hasBlockScoped) {
      return node.body;
    }
  }
  return node;
}
var optional = exports.optional = true;
function ConditionalExpression(node, parent, scope) {
  var evaluateTest = t.evaluateTruthy(node.test, scope);
  if (evaluateTest === true) {
    return node.consequent;
  } else if (evaluateTest === false) {
    return node.alternate;
  }
}
var IfStatement = exports.IfStatement = {exit: function exit(node, parent, scope) {
    var consequent = node.consequent;
    var alternate = node.alternate;
    var test = node.test;
    var evaluateTest = t.evaluateTruthy(test, scope);
    if (evaluateTest === true) {
      return toStatements(consequent);
    }
    if (evaluateTest === false) {
      if (alternate) {
        return toStatements(alternate);
      } else {
        return this.remove();
      }
    }
    if (t.isBlockStatement(alternate) && !alternate.body.length) {
      alternate = node.alternate = null;
    }
    if (t.isBlockStatement(consequent) && !consequent.body.length && t.isBlockStatement(alternate) && alternate.body.length) {
      node.consequent = node.alternate;
      node.alternate = null;
      node.test = t.unaryExpression("!", test, true);
    }
  }};
exports.__esModule = true;
