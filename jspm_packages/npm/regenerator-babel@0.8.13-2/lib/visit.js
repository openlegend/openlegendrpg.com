/* */ 
var assert = require("assert");
var fs = require("fs");
var types = require("ast-types");
var n = types.namedTypes;
var b = types.builders;
var isArray = types.builtInTypes.array;
var isObject = types.builtInTypes.object;
var NodePath = types.NodePath;
var hoist = require("./hoist").hoist;
var Emitter = require("./emit").Emitter;
var runtimeProperty = require("./util").runtimeProperty;
exports.transform = function transform(node, options) {
  options = options || {};
  var path = node instanceof NodePath ? node : new NodePath(node);
  visitor.visit(path, options);
  node = path.value;
  options.madeChanges = visitor.wasChangeReported();
  return node;
};
var visitor = types.PathVisitor.fromMethodsObject({
  reset: function(node, options) {
    this.options = options;
  },
  visitFunction: function(path) {
    this.traverse(path);
    var node = path.value;
    var shouldTransformAsync = node.async && !this.options.disableAsync;
    if (!node.generator && !shouldTransformAsync) {
      return ;
    }
    this.reportChanged();
    node.generator = false;
    if (node.expression) {
      node.expression = false;
      node.body = b.blockStatement([b.returnStatement(node.body)]);
    }
    if (shouldTransformAsync) {
      awaitVisitor.visit(path.get("body"));
    }
    var outerFnId = node.id || (node.id = path.scope.parent.declareTemporary("callee$"));
    var outerBody = [];
    var bodyBlock = path.value.body;
    bodyBlock.body = bodyBlock.body.filter(function(node) {
      if (node && node._blockHoist != null) {
        outerBody.push(node);
        return false;
      } else {
        return true;
      }
    });
    var innerFnId = b.identifier(node.id.name + "$");
    var contextId = path.scope.declareTemporary("context$");
    var vars = hoist(path);
    var emitter = new Emitter(contextId);
    emitter.explode(path.get("body"));
    if (vars && vars.declarations.length > 0) {
      outerBody.push(vars);
    }
    var wrapArgs = [emitter.getContextFunction(innerFnId), shouldTransformAsync ? b.literal(null) : outerFnId, b.thisExpression()];
    var tryLocsList = emitter.getTryLocsList();
    if (tryLocsList) {
      wrapArgs.push(tryLocsList);
    }
    var wrapCall = b.callExpression(shouldTransformAsync ? runtimeProperty("async") : runtimeProperty("wrap"), wrapArgs);
    outerBody.push(b.returnStatement(wrapCall));
    node.body = b.blockStatement(outerBody);
    node.body._declarations = bodyBlock._declarations;
    if (shouldTransformAsync) {
      node.async = false;
      return ;
    }
    if (n.FunctionDeclaration.check(node)) {
      var pp = path.parent;
      while (pp && !(n.BlockStatement.check(pp.value) || n.Program.check(pp.value))) {
        pp = pp.parent;
      }
      if (!pp) {
        return ;
      }
      path.replace();
      node.type = "FunctionExpression";
      var varDecl = b.variableDeclaration("var", [b.variableDeclarator(node.id, b.callExpression(runtimeProperty("mark"), [node]))]);
      if (node.comments) {
        varDecl.leadingComments = node.leadingComments;
        varDecl.trailingComments = node.trailingComments;
        node.leadingComments = null;
        node.trailingComments = null;
      }
      varDecl._blockHoist = 3;
      var bodyPath = pp.get("body");
      var bodyLen = bodyPath.value.length;
      bodyPath.push(varDecl);
    } else {
      n.FunctionExpression.assert(node);
      return b.callExpression(runtimeProperty("mark"), [node]);
    }
  }
});
function shouldNotHoistAbove(stmtPath) {
  var value = stmtPath.value;
  n.Statement.assert(value);
  if (n.ExpressionStatement.check(value) && n.Literal.check(value.expression) && value.expression.value === "use strict") {
    return true;
  }
  if (n.VariableDeclaration.check(value)) {
    for (var i = 0; i < value.declarations.length; ++i) {
      var decl = value.declarations[i];
      if (n.CallExpression.check(decl.init) && types.astNodesAreEquivalent(decl.init.callee, runtimeProperty("mark"))) {
        return true;
      }
    }
  }
  return false;
}
var awaitVisitor = types.PathVisitor.fromMethodsObject({
  visitFunction: function(path) {
    return false;
  },
  visitAwaitExpression: function(path) {
    var argument = path.value.argument;
    if (path.value.all) {
      argument = b.callExpression(b.memberExpression(b.identifier("Promise"), b.identifier("all"), false), [argument]);
    }
    return b.yieldExpression(argument, false);
  }
});
