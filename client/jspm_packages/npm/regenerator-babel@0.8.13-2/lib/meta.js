/* */ 
var assert = require('assert');
var m = require('private').makeAccessor();
var types = require('ast-types');
var isArray = types.builtInTypes.array;
var n = types.namedTypes;
var hasOwn = Object.prototype.hasOwnProperty;
function makePredicate(propertyName, knownTypes) {
  function onlyChildren(node) {
    n.Node.assert(node);
    var result = false;
    function check(child) {
      if (result) {} else if (isArray.check(child)) {
        child.some(check);
      } else if (n.Node.check(child)) {
        assert.strictEqual(result, false);
        result = predicate(child);
      }
      return result;
    }
    types.eachField(node, function(name, child) {
      check(child);
    });
    return result;
  }
  function predicate(node) {
    n.Node.assert(node);
    var meta = m(node);
    if (hasOwn.call(meta, propertyName))
      return meta[propertyName];
    if (hasOwn.call(opaqueTypes, node.type))
      return meta[propertyName] = false;
    if (hasOwn.call(knownTypes, node.type))
      return meta[propertyName] = true;
    return meta[propertyName] = onlyChildren(node);
  }
  predicate.onlyChildren = onlyChildren;
  return predicate;
}
var opaqueTypes = {FunctionExpression: true};
var sideEffectTypes = {
  CallExpression: true,
  ForInStatement: true,
  UnaryExpression: true,
  BinaryExpression: true,
  AssignmentExpression: true,
  UpdateExpression: true,
  NewExpression: true
};
var leapTypes = {
  YieldExpression: true,
  BreakStatement: true,
  ContinueStatement: true,
  ReturnStatement: true,
  ThrowStatement: true
};
for (var type in leapTypes) {
  if (hasOwn.call(leapTypes, type)) {
    sideEffectTypes[type] = leapTypes[type];
  }
}
exports.hasSideEffects = makePredicate("hasSideEffects", sideEffectTypes);
exports.containsLeap = makePredicate("containsLeap", leapTypes);
