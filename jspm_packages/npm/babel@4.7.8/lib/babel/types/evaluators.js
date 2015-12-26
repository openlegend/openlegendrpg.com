/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.evaluateTruthy = evaluateTruthy;
exports.evaluate = evaluate;
var t = _interopRequireWildcard(require("./index"));
function evaluateTruthy(node, scope) {
  var res = evaluate(node, scope);
  if (res.confident)
    return !!res.value;
}
function evaluate(node, scope) {
  var confident = true;
  var value = evaluate(node);
  if (!confident)
    value = undefined;
  return {
    confident: confident,
    value: value
  };
  function evaluate(node) {
    if (!confident)
      return ;
    if (t.isSequenceExpression(node)) {
      return evaluate(node.expressions[node.expressions.length - 1]);
    }
    if (t.isLiteral(node)) {
      if (node.regex && node.value === null) {} else {
        return node.value;
      }
    }
    if (t.isConditionalExpression(node)) {
      if (evaluate(node.test)) {
        return evaluate(node.consequent);
      } else {
        return evaluate(node.alternate);
      }
    }
    if (t.isIdentifier(node)) {
      if (node.name === "undefined") {
        return undefined;
      } else {
        return evaluate(scope.getImmutableBindingValue(node.name));
      }
    }
    if (t.isUnaryExpression(node, {prefix: true})) {
      var arg = evaluate(node.argument);
      switch (node.operator) {
        case "void":
          return undefined;
        case "!":
          return !arg;
        case "+":
          return +arg;
        case "-":
          return -arg;
      }
    }
    if (t.isArrayExpression(node) || t.isObjectExpression(node)) {}
    if (t.isLogicalExpression(node)) {
      var left = evaluate(node.left);
      var right = evaluate(node.right);
      switch (node.operator) {
        case "||":
          return left || right;
        case "&&":
          return left && right;
      }
    }
    if (t.isBinaryExpression(node)) {
      var left = evaluate(node.left);
      var right = evaluate(node.right);
      switch (node.operator) {
        case "-":
          return left - right;
        case "+":
          return left + right;
        case "/":
          return left / right;
        case "*":
          return left * right;
        case "%":
          return left % right;
        case "<":
          return left < right;
        case ">":
          return left > right;
        case "<=":
          return left <= right;
        case ">=":
          return left >= right;
        case "==":
          return left == right;
        case "!=":
          return left != right;
        case "===":
          return left === right;
        case "!==":
          return left !== right;
      }
    }
    confident = false;
  }
}
exports.__esModule = true;
