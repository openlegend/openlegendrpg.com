/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.check = check;
exports.ImportDeclaration = ImportDeclaration;
exports.ExportDeclaration = ExportDeclaration;
var t = _interopRequireWildcard(require("../../../types/index"));
function check(node) {
  return t.isImportDeclaration(node) || t.isExportDeclaration(node);
}
function ImportDeclaration(node, parent, scope, file) {
  var resolveModuleSource = file.opts.resolveModuleSource;
  if (node.source && resolveModuleSource) {
    node.source.value = resolveModuleSource(node.source.value, file.opts.filename);
  }
}
function ExportDeclaration(node, parent, scope) {
  ImportDeclaration.apply(this, arguments);
  if (node.isType)
    return ;
  var declar = node.declaration;
  var getDeclar = function getDeclar() {
    declar._ignoreUserWhitespace = true;
    return declar;
  };
  if (node["default"]) {
    if (t.isClassDeclaration(declar)) {
      this.node = [getDeclar(), node];
      node.declaration = declar.id;
    } else if (t.isClassExpression(declar)) {
      var temp = scope.generateUidIdentifier("default");
      declar = t.variableDeclaration("var", [t.variableDeclarator(temp, declar)]);
      node.declaration = temp;
      return [getDeclar(), node];
    } else if (t.isFunctionDeclaration(declar)) {
      node._blockHoist = 2;
      node.declaration = declar.id;
      return [getDeclar(), node];
    }
  } else {
    if (t.isFunctionDeclaration(declar)) {
      node.specifiers = [t.importSpecifier(declar.id, declar.id)];
      node.declaration = null;
      node._blockHoist = 2;
      return [getDeclar(), node];
    } else if (t.isVariableDeclaration(declar)) {
      var specifiers = [];
      var bindings = t.getBindingIdentifiers(declar);
      for (var key in bindings) {
        var id = bindings[key];
        specifiers.push(t.exportSpecifier(id, id));
      }
      return [declar, t.exportDeclaration(null, specifiers)];
    }
  }
}
exports.__esModule = true;
