/* */ 
var baseEach = require("../internal/baseEach"),
    isLength = require("../internal/isLength"),
    restParam = require("../function/restParam");
var invoke = restParam(function(collection, methodName, args) {
  var index = -1,
      isFunc = typeof methodName == 'function',
      length = collection ? collection.length : 0,
      result = isLength(length) ? Array(length) : [];
  baseEach(collection, function(value) {
    var func = isFunc ? methodName : (value != null && value[methodName]);
    result[++index] = func ? func.apply(value, args) : undefined;
  });
  return result;
});
module.exports = invoke;
