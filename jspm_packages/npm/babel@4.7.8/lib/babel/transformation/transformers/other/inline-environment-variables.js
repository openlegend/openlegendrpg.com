/* */ 
(function(process) {
  "use strict";
  var _interopRequire = function(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
  exports.MemberExpression = MemberExpression;
  var t = _interopRequire(require('../../../types/index'));
  var optional = exports.optional = true;
  var match = t.buildMatchMemberExpression("process.env");
  function MemberExpression(node) {
    if (match(node.object)) {
      var key = t.toComputedKey(node, node.property);
      if (!t.isLiteral(key))
        return;
      var env = process.env[key.value];
      if (env === undefined) {
        return t.identifier("undefined");
      } else {
        return t.literal(env);
      }
    }
  }
  exports.__esModule = true;
})(require('process'));
