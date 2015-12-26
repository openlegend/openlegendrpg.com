/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.custom = custom;
exports.property = property;
exports.bare = bare;
var getFunctionArity = _interopRequire(require("./get-function-arity"));
var util = _interopRequireWildcard(require("../../util"));
var t = _interopRequireWildcard(require("../../types/index"));
var visitor = {enter: function enter(node, parent, scope, state) {
    if (!this.isReferencedIdentifier({name: state.name}))
      return ;
    var localDeclar = scope.getBindingIdentifier(state.name);
    if (localDeclar !== state.outerDeclar)
      return ;
    state.selfReference = true;
    this.stop();
  }};
var wrap = function wrap(state, method, id, scope) {
  if (state.selfReference) {
    var templateName = "property-method-assignment-wrapper";
    if (method.generator)
      templateName += "-generator";
    var template = util.template(templateName, {
      FUNCTION: method,
      FUNCTION_ID: id,
      FUNCTION_KEY: scope.generateUidIdentifier(id.name),
      WRAPPER_KEY: scope.generateUidIdentifier(id.name + "Wrapper")
    });
    var params = template.callee.body.body[0].declarations[0].init.params;
    for (var i = 0,
        len = getFunctionArity(method); i < len; i++) {
      params.push(scope.generateUidIdentifier("x"));
    }
    return template;
  } else {
    method.id = id;
    return method;
  }
};
var visit = function visit(node, name, scope) {
  var state = {
    selfAssignment: false,
    selfReference: false,
    outerDeclar: scope.getBindingIdentifier(name),
    references: [],
    name: name
  };
  var bindingInfo = null;
  if (bindingInfo) {
    if (bindingInfo.kind === "param") {
      state.selfReference = true;
    } else {}
  } else {
    scope.traverse(node, visitor, state);
  }
  return state;
};
function custom(node, id, scope) {
  var state = visit(node, id.name, scope);
  return wrap(state, node, id, scope);
}
function property(node, file, scope) {
  var key = t.toComputedKey(node, node.key);
  if (!t.isLiteral(key))
    return node;
  var name = t.toIdentifier(key.value);
  var id = t.identifier(name);
  var method = node.value;
  var state = visit(method, name, scope);
  node.value = wrap(state, method, id, scope);
}
function bare(node, parent, scope) {
  if (node.id)
    return node;
  var id;
  if (t.isProperty(parent) && parent.kind === "init" && !parent.computed) {
    id = parent.key;
  } else if (t.isVariableDeclarator(parent)) {
    id = parent.id;
  } else {
    return node;
  }
  if (!t.isIdentifier(id))
    return node;
  var name = t.toIdentifier(id.name);
  id = t.identifier(name);
  var state = visit(node, name, scope);
  return wrap(state, node, id, scope);
}
exports.__esModule = true;
