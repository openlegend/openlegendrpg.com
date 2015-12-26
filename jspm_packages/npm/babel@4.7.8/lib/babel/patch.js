/* */ 
"use strict";
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
};
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
var estraverse = _interopRequire(require("estraverse"));
var extend = _interopRequire(require("lodash/object/extend"));
var types = _interopRequire(require("ast-types"));
var t = _interopRequireWildcard(require("./types/index"));
extend(estraverse.VisitorKeys, t.VISITOR_KEYS);
var def = types.Type.def;
var or = types.Type.or;
def("File").bases("Node").build("program").field("program", def("Program"));
def("AssignmentPattern").bases("Pattern").build("left", "right").field("left", def("Pattern")).field("right", def("Expression"));
def("ImportBatchSpecifier").bases("Specifier").build("name").field("name", def("Identifier"));
def("RestElement").bases("Pattern").build("argument").field("argument", def("expression"));
def("VirtualPropertyExpression").bases("Expression").build("object", "property").field("object", def("Expression")).field("property", or(def("Identifier"), def("Expression")));
def("PrivateDeclaration").bases("Declaration").build("declarations").field("declarations", [def("Identifier")]);
def("BindMemberExpression").bases("Expression").build("object", "property", "arguments").field("object", def("Expression")).field("property", or(def("Identifier"), def("Expression"))).field("arguments", [def("Expression")]);
def("BindFunctionExpression").bases("Expression").build("callee", "arguments").field("callee", def("Expression")).field("arguments", [def("Expression")]);
types.finalize();
