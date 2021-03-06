/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var build = _interopRequire(require('../../helpers/build-binary-assignment-operator-transformer'));
var t = _interopRequireWildcard(require('../../../types/index'));
var experimental = exports.experimental = true;
var MATH_POW = t.memberExpression(t.identifier("Math"), t.identifier("pow"));
build(exports, {
  operator: "**",
  build: function build(left, right) {
    return t.callExpression(MATH_POW, [left, right]);
  }
});
exports.__esModule = true;
