/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
exports.Program = Program;
var t = _interopRequireWildcard(require('../../../types/index'));
function Program(program, parent, scope, file) {
  if (file.transformers.strict.canRun()) {
    program.body.unshift(t.expressionStatement(t.literal("use strict")));
  }
}
exports.__esModule = true;
