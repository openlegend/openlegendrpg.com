/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.manipulateOptions = manipulateOptions;
exports.Program = Program;
exports.pre = pre;
exports.Identifier = Identifier;
var includes = _interopRequire(require('lodash/collection/includes'));
var util = _interopRequireWildcard(require('../../../util'));
var core = _interopRequire(require('core-js/library'));
var has = _interopRequire(require('lodash/object/has'));
var t = _interopRequireWildcard(require('../../../types/index'));
var isSymboliterator = t.buildMatchMemberExpression("Symbol.iterator");
var coreHas = function coreHas(node) {
  return node.name !== "_" && has(core, node.name);
};
var ALIASABLE_CONSTRUCTORS = ["Symbol", "Promise", "Map", "WeakMap", "Set", "WeakSet"];
var astVisitor = {enter: function enter(node, parent, scope, file) {
    var prop;
    if (this.isMemberExpression() && this.isReferenced()) {
      var obj = node.object;
      prop = node.property;
      if (!t.isReferenced(obj, node))
        return;
      if (!node.computed && coreHas(obj) && has(core[obj.name], prop.name) && !scope.getBindingIdentifier(obj.name)) {
        this.skip();
        return t.prependToMemberExpression(node, file.get("coreIdentifier"));
      }
    } else if (this.isReferencedIdentifier() && !t.isMemberExpression(parent) && includes(ALIASABLE_CONSTRUCTORS, node.name) && !scope.getBindingIdentifier(node.name)) {
      return t.memberExpression(file.get("coreIdentifier"), node);
    } else if (this.isCallExpression()) {
      var callee = node.callee;
      if (node.arguments.length)
        return false;
      if (!t.isMemberExpression(callee))
        return false;
      if (!callee.computed)
        return false;
      prop = callee.property;
      if (!isSymboliterator(prop))
        return false;
      return util.template("corejs-iterator", {
        CORE_ID: file.get("coreIdentifier"),
        VALUE: callee.object
      });
    } else if (this.isBinaryExpression()) {
      if (node.operator !== "in")
        return;
      var left = node.left;
      if (!isSymboliterator(left))
        return;
      return util.template("corejs-is-iterator", {
        CORE_ID: file.get("coreIdentifier"),
        VALUE: node.right
      });
    }
  }};
var optional = exports.optional = true;
function manipulateOptions(opts) {
  if (opts.whitelist.length)
    opts.whitelist.push("es6.modules");
}
function Program(node, parent, scope, file) {
  scope.traverse(node, astVisitor, file);
}
function pre(file) {
  file.set("helperGenerator", function(name) {
    return file.addImport("babel-runtime/helpers/" + name, name);
  });
  file.setDynamic("coreIdentifier", function() {
    return file.addImport("babel-runtime/core-js", "core");
  });
  file.setDynamic("regeneratorIdentifier", function() {
    return file.addImport("babel-runtime/regenerator", "regeneratorRuntime");
  });
}
function Identifier(node, parent, scope, file) {
  if (this.isReferencedIdentifier({name: "regeneratorRuntime"})) {
    return file.get("regeneratorIdentifier");
  }
}
exports.__esModule = true;
