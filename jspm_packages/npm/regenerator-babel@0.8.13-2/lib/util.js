/* */ 
var assert = require('assert');
var types = require('ast-types');
var n = types.namedTypes;
var b = types.builders;
var hasOwn = Object.prototype.hasOwnProperty;
exports.defaults = function(obj) {
  var len = arguments.length;
  var extension;
  for (var i = 1; i < len; ++i) {
    if ((extension = arguments[i])) {
      for (var key in extension) {
        if (hasOwn.call(extension, key) && !hasOwn.call(obj, key)) {
          obj[key] = extension[key];
        }
      }
    }
  }
  return obj;
};
exports.runtimeProperty = function(name) {
  return b.memberExpression(b.identifier("regeneratorRuntime"), b.identifier(name), false);
};
exports.isReference = function(path, name) {
  var node = path.value;
  if (!n.Identifier.check(node)) {
    return false;
  }
  if (name && node.name !== name) {
    return false;
  }
  var parent = path.parent.value;
  switch (parent.type) {
    case "VariableDeclarator":
      return path.name === "init";
    case "MemberExpression":
      return path.name === "object" || (parent.computed && path.name === "property");
    case "FunctionExpression":
    case "FunctionDeclaration":
    case "ArrowFunctionExpression":
      if (path.name === "id") {
        return false;
      }
      if (parent.params === path.parentPath && parent.params[path.name] === node) {
        return false;
      }
      return true;
    case "ClassDeclaration":
    case "ClassExpression":
      return path.name !== "id";
    case "CatchClause":
      return path.name !== "param";
    case "Property":
    case "MethodDefinition":
      return path.name !== "key";
    case "ImportSpecifier":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "LabeledStatement":
      return false;
    default:
      return true;
  }
};
