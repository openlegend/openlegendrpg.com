/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.ForOfStatement = ForOfStatement;
var messages = _interopRequireWildcard(require('../../../messages'));
var _types = require('../../../types/index');
var t = _interopRequire(_types);
exports.check = _types.isFor;
function ForOfStatement(node, parent, scope, file) {
  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    var declar = left.declarations[0];
    if (declar.init)
      throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
  }
}
exports.ForInStatement = ForOfStatement;
exports.__esModule = true;
