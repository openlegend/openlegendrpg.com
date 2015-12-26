/* */ 
var baseMatches = require("./baseMatches"),
    baseMatchesProperty = require("./baseMatchesProperty"),
    baseProperty = require("./baseProperty"),
    bindCallback = require("./bindCallback"),
    identity = require("../utility/identity");
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return typeof thisArg == 'undefined' ? func : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined' ? baseProperty(func + '') : baseMatchesProperty(func + '', thisArg);
}
module.exports = baseCallback;
