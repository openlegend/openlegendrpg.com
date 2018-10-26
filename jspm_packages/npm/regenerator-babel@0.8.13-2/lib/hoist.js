/* */ 
var assert = require('assert');
var types = require('ast-types');
var n = types.namedTypes;
var b = types.builders;
var hasOwn = Object.prototype.hasOwnProperty;
exports.hoist = function(funPath) {
  assert.ok(funPath instanceof types.NodePath);
  n.Function.assert(funPath.value);
  var vars = {};
  function varDeclToExpr(vdec, includeIdentifiers) {
    n.VariableDeclaration.assert(vdec);
    var exprs = [];
    vdec.declarations.forEach(function(dec) {
      vars[dec.id.name] = dec.id;
      if (dec.init) {
        exprs.push(b.assignmentExpression("=", dec.id, dec.init));
      } else if (includeIdentifiers) {
        exprs.push(dec.id);
      }
    });
    if (exprs.length === 0)
      return null;
    if (exprs.length === 1)
      return exprs[0];
    return b.sequenceExpression(exprs);
  }
  types.visit(funPath.get("body"), {
    visitVariableDeclaration: function(path) {
      var expr = varDeclToExpr(path.value, false);
      if (expr === null) {
        path.replace();
      } else {
        return b.expressionStatement(expr);
      }
      return false;
    },
    visitForStatement: function(path) {
      var init = path.value.init;
      if (n.VariableDeclaration.check(init)) {
        path.get("init").replace(varDeclToExpr(init, false));
      }
      this.traverse(path);
    },
    visitForInStatement: function(path) {
      var left = path.value.left;
      if (n.VariableDeclaration.check(left)) {
        path.get("left").replace(varDeclToExpr(left, true));
      }
      this.traverse(path);
    },
    visitFunctionDeclaration: function(path) {
      var node = path.value;
      vars[node.id.name] = node.id;
      var parentNode = path.parent.node;
      var assignment = b.expressionStatement(b.assignmentExpression("=", node.id, b.functionExpression(node.id, node.params, node.body, node.generator, node.expression)));
      if (n.BlockStatement.check(path.parent.node)) {
        path.parent.get("body").unshift(assignment);
        path.replace();
      } else {
        path.replace(assignment);
      }
      return false;
    },
    visitFunctionExpression: function(path) {
      return false;
    }
  });
  var paramNames = {};
  funPath.get("params").each(function(paramPath) {
    var param = paramPath.value;
    if (n.Identifier.check(param)) {
      paramNames[param.name] = param;
    } else {}
  });
  var declarations = [];
  Object.keys(vars).forEach(function(name) {
    if (!hasOwn.call(paramNames, name)) {
      declarations.push(b.variableDeclarator(vars[name], null));
    }
  });
  if (declarations.length === 0) {
    return null;
  }
  return b.variableDeclaration("var", declarations);
};
