/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
exports.ForOfStatement = ForOfStatement;
exports.CatchClause = CatchClause;
exports.ExpressionStatement = ExpressionStatement;
exports.AssignmentExpression = AssignmentExpression;
exports.VariableDeclaration = VariableDeclaration;
var messages = _interopRequireWildcard(require("../../../messages"));
var t = _interopRequireWildcard(require("../../../types/index"));
var check = exports.check = t.isPattern;
function ForOfStatement(node, parent, scope, file) {
  var left = node.left;
  if (t.isPattern(left)) {
    var temp = scope.generateUidIdentifier("ref");
    node.left = t.variableDeclaration("var", [t.variableDeclarator(temp)]);
    t.ensureBlock(node);
    node.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(left, temp)]));
    return ;
  }
  if (!t.isVariableDeclaration(left))
    return ;
  var pattern = left.declarations[0].id;
  if (!t.isPattern(pattern))
    return ;
  var key = scope.generateUidIdentifier("ref");
  node.left = t.variableDeclaration(left.kind, [t.variableDeclarator(key, null)]);
  var nodes = [];
  var destructuring = new DestructuringTransformer({
    kind: left.kind,
    file: file,
    scope: scope,
    nodes: nodes
  });
  destructuring.init(pattern, key);
  t.ensureBlock(node);
  var block = node.body;
  block.body = nodes.concat(block.body);
}
exports.ForInStatement = ForOfStatement;
exports.Function = function(node, parent, scope, file) {
  var nodes = [];
  var hasDestructuring = false;
  node.params = node.params.map(function(pattern, i) {
    if (!t.isPattern(pattern))
      return pattern;
    hasDestructuring = true;
    var ref = scope.generateUidIdentifier("ref");
    var destructuring = new DestructuringTransformer({
      blockHoist: node.params.length - i,
      nodes: nodes,
      scope: scope,
      file: file,
      kind: "let"
    });
    destructuring.init(pattern, ref);
    return ref;
  });
  if (!hasDestructuring)
    return ;
  file.checkNode(nodes);
  t.ensureBlock(node);
  var block = node.body;
  block.body = nodes.concat(block.body);
};
function CatchClause(node, parent, scope, file) {
  var pattern = node.param;
  if (!t.isPattern(pattern))
    return ;
  var ref = scope.generateUidIdentifier("ref");
  node.param = ref;
  var nodes = [];
  var destructuring = new DestructuringTransformer({
    kind: "let",
    file: file,
    scope: scope,
    nodes: nodes
  });
  destructuring.init(pattern, ref);
  node.body.body = nodes.concat(node.body.body);
  return node;
}
function ExpressionStatement(node, parent, scope, file) {
  var expr = node.expression;
  if (expr.type !== "AssignmentExpression")
    return ;
  if (!t.isPattern(expr.left))
    return ;
  if (file.isConsequenceExpressionStatement(node))
    return ;
  var nodes = [];
  var ref = scope.generateUidIdentifier("ref");
  nodes.push(t.variableDeclaration("var", [t.variableDeclarator(ref, expr.right)]));
  var destructuring = new DestructuringTransformer({
    operator: expr.operator,
    file: file,
    scope: scope,
    nodes: nodes
  });
  destructuring.init(expr.left, ref);
  return nodes;
}
function AssignmentExpression(node, parent, scope, file) {
  if (!t.isPattern(node.left))
    return ;
  var ref = scope.generateUidIdentifier("temp");
  scope.push({id: ref});
  var nodes = [];
  nodes.push(t.assignmentExpression("=", ref, node.right));
  var destructuring = new DestructuringTransformer({
    operator: node.operator,
    file: file,
    scope: scope,
    nodes: nodes
  });
  destructuring.init(node.left, ref);
  nodes.push(ref);
  return t.toSequenceExpression(nodes, scope);
}
function variableDeclarationHasPattern(node) {
  for (var i = 0; i < node.declarations.length; i++) {
    if (t.isPattern(node.declarations[i].id)) {
      return true;
    }
  }
  return false;
}
function VariableDeclaration(node, parent, scope, file) {
  if (t.isForInStatement(parent) || t.isForOfStatement(parent))
    return ;
  if (!variableDeclarationHasPattern(node))
    return ;
  var nodes = [];
  var declar;
  for (var i = 0; i < node.declarations.length; i++) {
    declar = node.declarations[i];
    var patternId = declar.init;
    var pattern = declar.id;
    var destructuring = new DestructuringTransformer({
      nodes: nodes,
      scope: scope,
      kind: node.kind,
      file: file
    });
    if (t.isPattern(pattern) && patternId) {
      destructuring.init(pattern, patternId);
      if (+i !== node.declarations.length - 1) {
        t.inherits(nodes[nodes.length - 1], declar);
      }
    } else {
      nodes.push(t.inherits(destructuring.buildVariableAssignment(declar.id, declar.init), declar));
    }
  }
  if (!t.isProgram(parent) && !t.isBlockStatement(parent)) {
    declar = null;
    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      if (!declar)
        declar = t.variableDeclaration(node.kind, []);
      if (!t.isVariableDeclaration(node) && declar.kind !== node.kind) {
        throw file.errorWithNode(node, messages.get("invalidParentForThisNode"));
      }
      declar.declarations = declar.declarations.concat(node.declarations);
    }
    return declar;
  }
  return nodes;
}
var hasRest = function hasRest(pattern) {
  for (var i = 0; i < pattern.elements.length; i++) {
    if (t.isRestElement(pattern.elements[i])) {
      return true;
    }
  }
  return false;
};
var DestructuringTransformer = (function() {
  function DestructuringTransformer(opts) {
    _classCallCheck(this, DestructuringTransformer);
    this.blockHoist = opts.blockHoist;
    this.operator = opts.operator;
    this.nodes = opts.nodes;
    this.scope = opts.scope;
    this.file = opts.file;
    this.kind = opts.kind;
  }
  DestructuringTransformer.prototype.buildVariableAssignment = function buildVariableAssignment(id, init) {
    var op = this.operator;
    if (t.isMemberExpression(id))
      op = "=";
    var node;
    if (op) {
      node = t.expressionStatement(t.assignmentExpression(op, id, init));
    } else {
      node = t.variableDeclaration(this.kind, [t.variableDeclarator(id, init)]);
    }
    node._blockHoist = this.blockHoist;
    return node;
  };
  DestructuringTransformer.prototype.buildVariableDeclaration = function buildVariableDeclaration(id, init) {
    var declar = t.variableDeclaration("var", [t.variableDeclarator(id, init)]);
    declar._blockHoist = this.blockHoist;
    return declar;
  };
  DestructuringTransformer.prototype.push = function push(id, init) {
    if (t.isObjectPattern(id)) {
      this.pushObjectPattern(id, init);
    } else if (t.isArrayPattern(id)) {
      this.pushArrayPattern(id, init);
    } else if (t.isAssignmentPattern(id)) {
      this.pushAssignmentPattern(id, init);
    } else {
      this.nodes.push(this.buildVariableAssignment(id, init));
    }
  };
  DestructuringTransformer.prototype.pushAssignmentPattern = function pushAssignmentPattern(pattern, valueRef) {
    var tempValueRef = this.scope.generateUidBasedOnNode(valueRef);
    var declar = t.variableDeclaration("var", [t.variableDeclarator(tempValueRef, valueRef)]);
    declar._blockHoist = this.blockHoist;
    this.nodes.push(declar);
    this.nodes.push(this.buildVariableAssignment(pattern.left, t.conditionalExpression(t.binaryExpression("===", tempValueRef, t.identifier("undefined")), pattern.right, tempValueRef)));
  };
  DestructuringTransformer.prototype.pushObjectSpread = function pushObjectSpread(pattern, objRef, spreadProp, spreadPropIndex) {
    var keys = [];
    for (var i = 0; i < pattern.properties.length; i++) {
      var prop = pattern.properties[i];
      if (i >= spreadPropIndex)
        break;
      if (t.isSpreadProperty(prop))
        continue;
      var key = prop.key;
      if (t.isIdentifier(key))
        key = t.literal(prop.key.name);
      keys.push(key);
    }
    keys = t.arrayExpression(keys);
    var value = t.callExpression(this.file.addHelper("object-without-properties"), [objRef, keys]);
    this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
  };
  DestructuringTransformer.prototype.pushObjectProperty = function pushObjectProperty(prop, propRef) {
    if (t.isLiteral(prop.key))
      prop.computed = true;
    var pattern = prop.value;
    var objRef = t.memberExpression(propRef, prop.key, prop.computed);
    if (t.isPattern(pattern)) {
      this.push(pattern, objRef);
    } else {
      this.nodes.push(this.buildVariableAssignment(pattern, objRef));
    }
  };
  DestructuringTransformer.prototype.pushObjectPattern = function pushObjectPattern(pattern, objRef) {
    if (!pattern.properties.length) {
      this.nodes.push(t.expressionStatement(t.callExpression(this.file.addHelper("object-destructuring-empty"), [objRef])));
    }
    if (pattern.properties.length > 1 && t.isMemberExpression(objRef)) {
      var temp = this.scope.generateUidBasedOnNode(objRef, this.file);
      this.nodes.push(this.buildVariableDeclaration(temp, objRef));
      objRef = temp;
    }
    for (var i = 0; i < pattern.properties.length; i++) {
      var prop = pattern.properties[i];
      if (t.isSpreadProperty(prop)) {
        this.pushObjectSpread(pattern, objRef, prop, i);
      } else {
        this.pushObjectProperty(prop, objRef);
      }
    }
  };
  DestructuringTransformer.prototype.canUnpackArrayPattern = function canUnpackArrayPattern(pattern, arr) {
    if (!t.isArrayExpression(arr))
      return false;
    if (pattern.elements.length > arr.elements.length)
      return ;
    if (pattern.elements.length < arr.elements.length && !hasRest(pattern))
      return false;
    for (var i = 0; i < pattern.elements.length; i++) {
      if (!pattern.elements[i])
        return false;
    }
    return true;
  };
  DestructuringTransformer.prototype.pushUnpackedArrayPattern = function pushUnpackedArrayPattern(pattern, arr) {
    for (var i = 0; i < pattern.elements.length; i++) {
      var elem = pattern.elements[i];
      if (t.isRestElement(elem)) {
        this.push(elem.argument, t.arrayExpression(arr.elements.slice(i)));
      } else {
        this.push(elem, arr.elements[i]);
      }
    }
  };
  DestructuringTransformer.prototype.pushArrayPattern = function pushArrayPattern(pattern, arrayRef) {
    if (!pattern.elements)
      return ;
    if (this.canUnpackArrayPattern(pattern, arrayRef)) {
      return this.pushUnpackedArrayPattern(pattern, arrayRef);
    }
    var count = !hasRest(pattern) && pattern.elements.length;
    var toArray = this.scope.toArray(arrayRef, count);
    if (t.isIdentifier(toArray)) {
      arrayRef = toArray;
    } else {
      arrayRef = this.scope.generateUidBasedOnNode(arrayRef);
      this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray));
      this.scope.assignTypeGeneric(arrayRef.name, "Array");
    }
    for (var i = 0; i < pattern.elements.length; i++) {
      var elem = pattern.elements[i];
      if (!elem)
        continue;
      var elemRef;
      if (t.isRestElement(elem)) {
        elemRef = this.scope.toArray(arrayRef);
        if (i > 0) {
          elemRef = t.callExpression(t.memberExpression(elemRef, t.identifier("slice")), [t.literal(i)]);
        }
        elem = elem.argument;
      } else {
        elemRef = t.memberExpression(arrayRef, t.literal(i), true);
      }
      this.push(elem, elemRef);
    }
  };
  DestructuringTransformer.prototype.init = function init(pattern, ref) {
    if (!t.isArrayExpression(ref) && !t.isMemberExpression(ref) && !t.isIdentifier(ref)) {
      var key = this.scope.generateUidBasedOnNode(ref);
      this.nodes.push(this.buildVariableDeclaration(key, ref));
      ref = key;
    }
    this.push(pattern, ref);
  };
  return DestructuringTransformer;
})();
exports.__esModule = true;
