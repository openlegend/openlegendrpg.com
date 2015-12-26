/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _toConsumableArray = function(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0,
        arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
};
var _classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
module.exports = ReplaceSupers;
var messages = _interopRequireWildcard(require("../../messages"));
var t = _interopRequireWildcard(require("../../types/index"));
function isIllegalBareSuper(node, parent) {
  if (!isSuper(node, parent))
    return false;
  if (t.isMemberExpression(parent, {computed: false}))
    return false;
  if (t.isCallExpression(parent, {callee: node}))
    return false;
  return true;
}
function isSuper(node, parent) {
  return t.isIdentifier(node, {name: "super"}) && t.isReferenced(node, parent);
}
var visitor = {enter: function enter(node, parent, scope, state) {
    var topLevel = state.topLevel;
    var self = state.self;
    if (t.isFunction(node) && !t.isArrowFunctionExpression(node)) {
      self.traverseLevel(node, false);
      return this.skip();
    }
    if (t.isProperty(node, {method: true}) || t.isMethodDefinition(node)) {
      return this.skip();
    }
    var getThisReference = topLevel ? t.thisExpression : self.getThisReference.bind(self);
    var callback = self.specHandle;
    if (self.isLoose)
      callback = self.looseHandle;
    return callback.call(self, getThisReference, node, parent);
  }};
var ReplaceSupers = (function() {
  function ReplaceSupers(opts) {
    var inClass = arguments[1] === undefined ? false : arguments[1];
    _classCallCheck(this, ReplaceSupers);
    this.topLevelThisReference = opts.topLevelThisReference;
    this.methodNode = opts.methodNode;
    this.superRef = opts.superRef;
    this.isStatic = opts.isStatic;
    this.hasSuper = false;
    this.inClass = inClass;
    this.isLoose = opts.isLoose;
    this.scope = opts.scope;
    this.file = opts.file;
    this.opts = opts;
  }
  ReplaceSupers.prototype.getObjectRef = function getObjectRef() {
    return this.opts.objectRef || this.opts.getObjectRef();
  };
  ReplaceSupers.prototype.setSuperProperty = function setSuperProperty(property, value, isComputed, thisExpression) {
    return t.callExpression(this.file.addHelper("set"), [t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")), [this.isStatic ? this.getObjectRef() : t.memberExpression(this.getObjectRef(), t.identifier("prototype"))]), isComputed ? property : t.literal(property.name), value, thisExpression]);
  };
  ReplaceSupers.prototype.getSuperProperty = function getSuperProperty(property, isComputed, thisExpression) {
    return t.callExpression(this.file.addHelper("get"), [t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")), [this.isStatic ? this.getObjectRef() : t.memberExpression(this.getObjectRef(), t.identifier("prototype"))]), isComputed ? property : t.literal(property.name), thisExpression]);
  };
  ReplaceSupers.prototype.replace = function replace() {
    this.traverseLevel(this.methodNode.value, true);
  };
  ReplaceSupers.prototype.traverseLevel = function traverseLevel(node, topLevel) {
    var state = {
      self: this,
      topLevel: topLevel
    };
    this.scope.traverse(node, visitor, state);
  };
  ReplaceSupers.prototype.getThisReference = function getThisReference() {
    if (this.topLevelThisReference) {
      return this.topLevelThisReference;
    } else {
      var ref = this.topLevelThisReference = this.scope.generateUidIdentifier("this");
      this.methodNode.value.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(this.topLevelThisReference, t.thisExpression())]));
      return ref;
    }
  };
  ReplaceSupers.prototype.getLooseSuperProperty = function getLooseSuperProperty(id, parent) {
    var methodNode = this.methodNode;
    var methodName = methodNode.key;
    var superRef = this.superRef || t.identifier("Function");
    if (parent.property === id) {
      return ;
    } else if (t.isCallExpression(parent, {callee: id})) {
      parent.arguments.unshift(t.thisExpression());
      if (methodName.name === "constructor") {
        return t.memberExpression(superRef, t.identifier("call"));
      } else {
        id = superRef;
        if (!methodNode["static"]) {
          id = t.memberExpression(id, t.identifier("prototype"));
        }
        id = t.memberExpression(id, methodName, methodNode.computed);
        return t.memberExpression(id, t.identifier("call"));
      }
    } else if (t.isMemberExpression(parent) && !methodNode["static"]) {
      return t.memberExpression(superRef, t.identifier("prototype"));
    } else {
      return superRef;
    }
  };
  ReplaceSupers.prototype.looseHandle = function looseHandle(getThisReference, node, parent) {
    if (t.isIdentifier(node, {name: "super"})) {
      this.hasSuper = true;
      return this.getLooseSuperProperty(node, parent);
    } else if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (!t.isMemberExpression(callee))
        return ;
      if (callee.object.name !== "super")
        return ;
      this.hasSuper = true;
      t.appendToMemberExpression(callee, t.identifier("call"));
      node.arguments.unshift(getThisReference());
    }
  };
  ReplaceSupers.prototype.specHandle = function specHandle(getThisReference, node, parent) {
    var methodNode = this.methodNode;
    var property;
    var computed;
    var args;
    var thisReference;
    if (isIllegalBareSuper(node, parent)) {
      throw this.file.errorWithNode(node, messages.get("classesIllegalBareSuper"));
    }
    if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (isSuper(callee, node)) {
        property = methodNode.key;
        computed = methodNode.computed;
        args = node.arguments;
        if (methodNode.key.name !== "constructor" || !this.inClass) {
          var methodName = methodNode.key.name || "METHOD_NAME";
          throw this.file.errorWithNode(node, messages.get("classesIllegalSuperCall", methodName));
        }
      } else if (t.isMemberExpression(callee) && isSuper(callee.object, callee)) {
        property = callee.property;
        computed = callee.computed;
        args = node.arguments;
      }
    } else if (t.isMemberExpression(node) && isSuper(node.object, node)) {
      property = node.property;
      computed = node.computed;
    } else if (t.isAssignmentExpression(node) && isSuper(node.left.object, node.left) && methodNode.kind === "set") {
      this.hasSuper = true;
      return this.setSuperProperty(node.left.property, node.right, node.left.computed, getThisReference());
    }
    if (!property)
      return ;
    this.hasSuper = true;
    thisReference = getThisReference();
    var superProperty = this.getSuperProperty(property, computed, thisReference);
    if (args) {
      if (args.length === 1 && t.isSpreadElement(args[0])) {
        return t.callExpression(t.memberExpression(superProperty, t.identifier("apply")), [thisReference, args[0].argument]);
      } else {
        return t.callExpression(t.memberExpression(superProperty, t.identifier("call")), [thisReference].concat(_toConsumableArray(args)));
      }
    } else {
      return superProperty;
    }
  };
  return ReplaceSupers;
})();
module.exports = ReplaceSupers;
