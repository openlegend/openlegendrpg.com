/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.check = check;
exports.Property = Property;
var t = _interopRequireWildcard(require('../../../types/index'));
function check(node) {
  return t.isProperty(node) && (node.method || node.shorthand);
}
function Property(node) {
  if (node.method) {
    node.method = false;
  }
  if (node.shorthand) {
    node.shorthand = false;
    node.key = t.removeComments(t.clone(node.key));
  }
}
exports.__esModule = true;
