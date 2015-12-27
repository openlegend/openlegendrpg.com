/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var _classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
exports.check = check;
exports.VariableDeclaration = VariableDeclaration;
exports.Loop = Loop;
exports.BlockStatement = BlockStatement;
var traverse = _interopRequire(require('../../../traversal/index'));
var object = _interopRequire(require('../../../helpers/object'));
var util = _interopRequireWildcard(require('../../../util'));
var t = _interopRequireWildcard(require('../../../types/index'));
var values = _interopRequire(require('lodash/object/values'));
var extend = _interopRequire(require('lodash/object/extend'));
function isLet(node, parent) {
  if (!t.isVariableDeclaration(node))
    return false;
  if (node._let)
    return true;
  if (node.kind !== "let")
    return false;
  if (isLetInitable(node, parent)) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      var _declar = declar;
      if (!_declar.init)
        _declar.init = t.identifier("undefined");
    }
  }
  node._let = true;
  node.kind = "var";
  return true;
}
function isLetInitable(node, parent) {
  return !t.isFor(parent) || !t.isFor(parent, {left: node});
}
function isVar(node, parent) {
  return t.isVariableDeclaration(node, {kind: "var"}) && !isLet(node, parent);
}
function standardizeLets(declars) {
  for (var i = 0; i < declars.length; i++) {
    delete declars[i]._let;
  }
}
function check(node) {
  return t.isVariableDeclaration(node) && (node.kind === "let" || node.kind === "const");
}
function VariableDeclaration(node, parent, scope, file) {
  if (!isLet(node, parent))
    return;
  if (isLetInitable(node) && file.transformers["es6.blockScopingTDZ"].canRun()) {
    var nodes = [node];
    for (var i = 0; i < node.declarations.length; i++) {
      var decl = node.declarations[i];
      if (decl.init) {
        var assign = t.assignmentExpression("=", decl.id, decl.init);
        assign._ignoreBlockScopingTDZ = true;
        nodes.push(t.expressionStatement(assign));
      }
      decl.init = file.addHelper("temporal-undefined");
    }
    node._blockHoist = 2;
    return nodes;
  }
}
function Loop(node, parent, scope, file) {
  var init = node.left || node.init;
  if (isLet(init, node)) {
    t.ensureBlock(node);
    node.body._letDeclarators = [init];
  }
  var blockScoping = new BlockScoping(node, node.body, parent, scope, file);
  blockScoping.run();
}
function BlockStatement(block, parent, scope, file) {
  if (!t.isLoop(parent)) {
    var blockScoping = new BlockScoping(null, block, parent, scope, file);
    blockScoping.run();
  }
}
exports.Program = BlockStatement;
function replace(node, parent, scope, remaps) {
  if (!t.isReferencedIdentifier(node, parent))
    return;
  var remap = remaps[node.name];
  if (!remap)
    return;
  var ownBinding = scope.getBindingIdentifier(node.name);
  if (ownBinding === remap.binding) {
    node.name = remap.uid;
  } else {
    if (this)
      this.skip();
  }
}
var replaceVisitor = {enter: replace};
function traverseReplace(node, parent, scope, remaps) {
  replace(node, parent, scope, remaps);
  scope.traverse(node, replaceVisitor, remaps);
}
var letReferenceBlockVisitor = {enter: function enter(node, parent, scope, state) {
    if (this.isFunction()) {
      scope.traverse(node, letReferenceFunctionVisitor, state);
      return this.skip();
    }
  }};
var letReferenceFunctionVisitor = {enter: function enter(node, parent, scope, state) {
    if (!this.isReferencedIdentifier())
      return;
    if (scope.hasOwnBinding(node.name))
      return;
    if (!state.letReferences[node.name])
      return;
    state.closurify = true;
  }};
var hoistVarDeclarationsVisitor = {enter: function enter(node, parent, scope, self) {
    if (this.isForStatement()) {
      if (isVar(node.init, node)) {
        node.init = t.sequenceExpression(self.pushDeclar(node.init));
      }
    } else if (this.isFor()) {
      if (isVar(node.left, node)) {
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent)) {
      return self.pushDeclar(node).map(t.expressionStatement);
    } else if (this.isFunction()) {
      return this.skip();
    }
  }};
var loopLabelVisitor = {enter: function enter(node, parent, scope, state) {
    if (this.isLabeledStatement()) {
      state.innerLabels.push(node.label.name);
    }
  }};
var loopNodeTo = function loopNodeTo(node) {
  if (t.isBreakStatement(node)) {
    return "break";
  } else if (t.isContinueStatement(node)) {
    return "continue";
  }
};
var loopVisitor = {enter: function enter(node, parent, scope, state) {
    var replace;
    if (this.isLoop()) {
      state.ignoreLabeless = true;
      scope.traverse(node, loopVisitor, state);
      state.ignoreLabeless = false;
    }
    if (this.isFunction() || this.isLoop()) {
      return this.skip();
    }
    var loopText = loopNodeTo(node);
    if (loopText) {
      if (node.label) {
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }
        loopText = "" + loopText + "|" + node.label.name;
      } else {
        if (state.ignoreLabeless)
          return;
        if (t.isBreakStatement(node) && t.isSwitchCase(parent))
          return;
      }
      state.hasBreakContinue = true;
      state.map[loopText] = node;
      replace = t.literal(loopText);
    }
    if (this.isReturnStatement()) {
      state.hasReturn = true;
      replace = t.objectExpression([t.property("init", t.identifier("v"), node.argument || t.identifier("undefined"))]);
    }
    if (replace) {
      replace = t.returnStatement(replace);
      return t.inherits(replace, node);
    }
  }};
var BlockScoping = (function() {
  function BlockScoping(loopParent, block, parent, scope, file) {
    _classCallCheck(this, BlockScoping);
    this.loopParent = loopParent;
    this.parent = parent;
    this.scope = scope;
    this.block = block;
    this.file = file;
    this.outsideLetReferences = object();
    this.hasLetReferences = false;
    this.letReferences = block._letReferences = object();
    this.body = [];
  }
  BlockScoping.prototype.run = function run() {
    var block = this.block;
    if (block._letDone)
      return;
    block._letDone = true;
    var needsClosure = this.getLetReferences();
    if (t.isFunction(this.parent) || t.isProgram(this.block))
      return;
    if (!this.hasLetReferences)
      return;
    if (needsClosure) {
      this.wrapClosure();
    } else {
      this.remap();
    }
  };
  BlockScoping.prototype.remap = function remap() {
    var hasRemaps = false;
    var letRefs = this.letReferences;
    var scope = this.scope;
    var remaps = object();
    for (var key in letRefs) {
      var ref = letRefs[key];
      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
        var uid = scope.generateUidIdentifier(ref.name).name;
        ref.name = uid;
        hasRemaps = true;
        remaps[key] = remaps[uid] = {
          binding: ref,
          uid: uid
        };
      }
    }
    if (!hasRemaps)
      return;
    var loopParent = this.loopParent;
    if (loopParent) {
      traverseReplace(loopParent.right, loopParent, scope, remaps);
      traverseReplace(loopParent.test, loopParent, scope, remaps);
      traverseReplace(loopParent.update, loopParent, scope, remaps);
    }
    scope.traverse(this.block, replaceVisitor, remaps);
  };
  BlockScoping.prototype.wrapClosure = function wrapClosure() {
    var block = this.block;
    var outsideRefs = this.outsideLetReferences;
    if (this.loopParent) {
      for (var name in outsideRefs) {
        var id = outsideRefs[name];
        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
          delete outsideRefs[id.name];
          delete this.letReferences[id.name];
          this.scope.rename(id.name);
          this.letReferences[id.name] = id;
          outsideRefs[id.name] = id;
        }
      }
    }
    this.has = this.checkLoop();
    this.hoistVarDeclarations();
    var params = values(outsideRefs);
    var fn = t.functionExpression(null, params, t.blockStatement(block.body));
    fn._aliasFunction = true;
    block.body = this.body;
    var call = t.callExpression(fn, params);
    var ret = this.scope.generateUidIdentifier("ret");
    var hasYield = traverse.hasType(fn.body, this.scope, "YieldExpression", t.FUNCTION_TYPES);
    if (hasYield) {
      fn.generator = true;
      call = t.yieldExpression(call, true);
    }
    var hasAsync = traverse.hasType(fn.body, this.scope, "AwaitExpression", t.FUNCTION_TYPES);
    if (hasAsync) {
      fn.async = true;
      call = t.awaitExpression(call, true);
    }
    this.build(ret, call);
  };
  BlockScoping.prototype.getLetReferences = function getLetReferences() {
    var block = this.block;
    var declarators = block._letDeclarators || [];
    var declar;
    for (var i = 0; i < declarators.length; i++) {
      declar = declarators[i];
      extend(this.outsideLetReferences, t.getBindingIdentifiers(declar));
    }
    if (block.body) {
      for (i = 0; i < block.body.length; i++) {
        declar = block.body[i];
        if (isLet(declar, block)) {
          declarators = declarators.concat(declar.declarations);
        }
      }
    }
    for (i = 0; i < declarators.length; i++) {
      declar = declarators[i];
      var keys = t.getBindingIdentifiers(declar);
      extend(this.letReferences, keys);
      this.hasLetReferences = true;
    }
    if (!this.hasLetReferences)
      return;
    standardizeLets(declarators);
    var state = {
      letReferences: this.letReferences,
      closurify: false
    };
    this.scope.traverse(this.block, letReferenceBlockVisitor, state);
    return state.closurify;
  };
  BlockScoping.prototype.checkLoop = function checkLoop() {
    var state = {
      hasBreakContinue: false,
      ignoreLabeless: false,
      innerLabels: [],
      hasReturn: false,
      isLoop: !!this.loopParent,
      map: {}
    };
    this.scope.traverse(this.block, loopLabelVisitor, state);
    this.scope.traverse(this.block, loopVisitor, state);
    return state;
  };
  BlockScoping.prototype.hoistVarDeclarations = function hoistVarDeclarations() {
    traverse(this.block, hoistVarDeclarationsVisitor, this.scope, this);
  };
  BlockScoping.prototype.pushDeclar = function pushDeclar(node) {
    this.body.push(t.variableDeclaration(node.kind, node.declarations.map(function(declar) {
      return t.variableDeclarator(declar.id);
    })));
    var replace = [];
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      if (!declar.init)
        continue;
      var expr = t.assignmentExpression("=", declar.id, declar.init);
      replace.push(t.inherits(expr, declar));
    }
    return replace;
  };
  BlockScoping.prototype.build = function build(ret, call) {
    var has = this.has;
    if (has.hasReturn || has.hasBreakContinue) {
      this.buildHas(ret, call);
    } else {
      this.body.push(t.expressionStatement(call));
    }
  };
  BlockScoping.prototype.buildHas = function buildHas(ret, call) {
    var body = this.body;
    body.push(t.variableDeclaration("var", [t.variableDeclarator(ret, call)]));
    var loopParent = this.loopParent;
    var retCheck;
    var has = this.has;
    var cases = [];
    if (has.hasReturn) {
      retCheck = util.template("let-scoping-return", {RETURN: ret});
    }
    if (has.hasBreakContinue) {
      if (!loopParent) {
        throw new Error("Has no loop parent but we're trying to reassign breaks " + "and continues, something is going wrong here.");
      }
      for (var key in has.map) {
        cases.push(t.switchCase(t.literal(key), [has.map[key]]));
      }
      if (has.hasReturn) {
        cases.push(t.switchCase(null, [retCheck]));
      }
      if (cases.length === 1) {
        var single = cases[0];
        body.push(this.file.attachAuxiliaryComment(t.ifStatement(t.binaryExpression("===", ret, single.test), single.consequent[0])));
      } else {
        body.push(this.file.attachAuxiliaryComment(t.switchStatement(ret, cases)));
      }
    } else {
      if (has.hasReturn) {
        body.push(this.file.attachAuxiliaryComment(retCheck));
      }
    }
  };
  return BlockScoping;
})();
exports.__esModule = true;
