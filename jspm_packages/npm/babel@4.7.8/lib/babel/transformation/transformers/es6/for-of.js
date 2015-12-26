/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.ForOfStatement = ForOfStatement;
var messages = _interopRequireWildcard(require("../../../messages"));
var util = _interopRequireWildcard(require("../../../util"));
var t = _interopRequireWildcard(require("../../../types/index"));
var check = exports.check = t.isForOfStatement;
function ForOfStatement(node, parent, scope, file) {
  var callback = spec;
  if (file.isLoose("es6.forOf"))
    callback = loose;
  var build = callback(node, parent, scope, file);
  var declar = build.declar;
  var loop = build.loop;
  var block = loop.body;
  t.inheritsComments(loop, node);
  t.ensureBlock(node);
  if (declar) {
    block.body.push(declar);
  }
  block.body = block.body.concat(node.body.body);
  t.inherits(loop, node);
  loop._scopeInfo = node._scopeInfo;
  if (build.replaceParent) {
    this.parentPath.node = build.node;
  } else {
    return build.node;
  }
}
var loose = function loose(node, parent, scope, file) {
  var left = node.left;
  var declar,
      id;
  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    id = left;
  } else if (t.isVariableDeclaration(left)) {
    id = scope.generateUidIdentifier("ref");
    declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, id)]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }
  var iteratorKey = scope.generateUidIdentifier("iterator");
  var isArrayKey = scope.generateUidIdentifier("isArray");
  var loop = util.template("for-of-loose", {
    LOOP_OBJECT: iteratorKey,
    IS_ARRAY: isArrayKey,
    OBJECT: node.right,
    INDEX: scope.generateUidIdentifier("i"),
    ID: id
  });
  if (!declar) {
    loop.body.body.shift();
  }
  return {
    declar: declar,
    node: loop,
    loop: loop
  };
};
var spec = function spec(node, parent, scope, file) {
  var left = node.left;
  var declar;
  var stepKey = scope.generateUidIdentifier("step");
  var stepValue = t.memberExpression(stepKey, t.identifier("value"));
  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
  } else if (t.isVariableDeclaration(left)) {
    declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, stepValue)]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }
  var iteratorKey = scope.generateUidIdentifier("iterator");
  var template = util.template("for-of", {
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
    ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
    ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
    ITERATOR_KEY: iteratorKey,
    STEP_KEY: stepKey,
    OBJECT: node.right,
    BODY: null
  });
  var isLabeledParent = t.isLabeledStatement(parent);
  var tryBody = template[3].block.body;
  var loop = tryBody[0];
  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }
  return {
    replaceParent: isLabeledParent,
    declar: declar,
    loop: loop,
    node: template
  };
};
exports.__esModule = true;
