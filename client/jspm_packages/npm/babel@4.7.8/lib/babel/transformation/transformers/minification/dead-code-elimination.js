/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.ExpressionStatement = ExpressionStatement;
var t = _interopRequire(require('../../../types/index'));
var optional = exports.optional = true;
function ExpressionStatement(node) {
  var expr = node.expression;
  if (t.isLiteral(expr) || t.isIdentifier(node) && t.hasBinding(node.name)) {
    this.remove();
  }
}
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
var IfStatement = exports.IfStatement = {exit: function exit(node) {
    var consequent = node.consequent;
    var alternate = node.alternate;
    var test = node.test;
    var evaluateTest = t.evaluateTruthy(test);
    if (evaluateTest === true) {
      return consequent;
    }
    if (evaluateTest === false) {
      if (alternate) {
        return alternate;
      } else {
        return this.remove();
      }
    }
    if (t.isBlockStatement(alternate) && !alternate.body.length) {
      alternate = node.alternate = null;
    }
    if (t.blockStatement(consequent) && !consequent.body.length && t.isBlockStatement(alternate) && alternate.body.length) {
      node.consequent = node.alternate;
      node.alternate = null;
      node.test = t.unaryExpression("!", test, true);
    }
  }};
exports.__esModule = true;
