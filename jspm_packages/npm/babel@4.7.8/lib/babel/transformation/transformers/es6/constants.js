/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.check = check;
exports.Scopable = Scopable;
exports.VariableDeclaration = VariableDeclaration;
var messages = _interopRequireWildcard(require('../../../messages'));
var t = _interopRequireWildcard(require('../../../types/index'));
function check(node) {
  return t.isVariableDeclaration(node, {kind: "const"});
}
var visitor = {enter: function enter(node, parent, scope, state) {
    if (this.isAssignmentExpression() || this.isUpdateExpression()) {
      var ids = this.getBindingIdentifiers();
      for (var name in ids) {
        var id = ids[name];
        var constant = state.constants[name];
        if (!constant)
          continue;
        var constantIdentifier = constant.identifier;
        if (id === constantIdentifier)
          continue;
        if (!scope.bindingIdentifierEquals(name, constantIdentifier))
          continue;
        throw state.file.errorWithNode(id, messages.get("readOnly", name));
      }
    } else if (this.isScope()) {
      this.skip();
    }
  }};
function Scopable(node, parent, scope, file) {
  scope.traverse(node, visitor, {
    constants: scope.getAllBindingsOfKind("const"),
    file: file
  });
}
function VariableDeclaration(node) {
  if (node.kind === "const")
    node.kind = "let";
}
exports.__esModule = true;
