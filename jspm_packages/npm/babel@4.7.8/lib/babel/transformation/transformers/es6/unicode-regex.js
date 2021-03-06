/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.check = check;
exports.Literal = Literal;
var rewritePattern = _interopRequire(require('regexpu/rewrite-pattern'));
var pull = _interopRequire(require('lodash/array/pull'));
var t = _interopRequire(require('../../../types/index'));
function check(node) {
  return t.isLiteral(node) && node.regex && node.regex.flags.indexOf("u") >= 0;
}
function Literal(node) {
  var regex = node.regex;
  if (!regex)
    return;
  var flags = regex.flags.split("");
  if (regex.flags.indexOf("u") < 0)
    return;
  pull(flags, "u");
  regex.pattern = rewritePattern(regex.pattern, regex.flags);
  regex.flags = flags.join("");
}
exports.__esModule = true;
