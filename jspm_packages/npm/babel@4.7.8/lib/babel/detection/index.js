/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var SYNTAX_KEYS = _interopRequire(require('./syntax-keys.json!systemjs-json'));
var traverse = _interopRequire(require('../traversal/index'));
var visitors = traverse.explode(require('./visitors'));
module.exports = function(ast) {
  var stats = {
    syntax: {},
    builtins: {}
  };
  var detectedSyntax = function detectedSyntax(name) {
    stats.syntax[name] = true;
  };
  traverse(ast, {enter: function enter(node, parent) {
      if (SYNTAX_KEYS[node.type]) {
        detectedSyntax(SYNTAX_KEYS[node.type]);
      }
      var visitor = visitors[node.type];
      if (visitor)
        visitor(node, parent, detectedSyntax);
    }});
  return stats;
};
