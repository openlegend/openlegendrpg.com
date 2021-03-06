/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.Program = Program;
exports.FunctionExpression = FunctionExpression;
exports.ThisExpression = ThisExpression;
exports.CallExpression = CallExpression;
var messages = _interopRequireWildcard(require('../../../messages'));
var t = _interopRequireWildcard(require('../../../types/index'));
function Program(program) {
  var first = program.body[0];
  if (t.isExpressionStatement(first) && t.isLiteral(first.expression, {value: "use strict"})) {
    program.body.shift();
  }
}
function FunctionExpression() {
  this.skip();
}
exports.FunctionDeclaration = FunctionExpression;
function ThisExpression() {
  return t.identifier("undefined");
}
function CallExpression(node, parent, scope, file) {
  if (t.isIdentifier(node.callee, {name: "eval"})) {
    throw file.errorWithNode(node, messages.get("evalInStrictMode"));
  }
}
exports.__esModule = true;
