/* */ 
var baseAt = require("../internal/baseAt"),
    baseCompareAscending = require("../internal/baseCompareAscending"),
    baseFlatten = require("../internal/baseFlatten"),
    isIndex = require("../internal/isIndex"),
    restParam = require("../function/restParam");
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
var pullAt = restParam(function(array, indexes) {
  array || (array = []);
  indexes = baseFlatten(indexes);
  var length = indexes.length,
      result = baseAt(array, indexes);
  indexes.sort(baseCompareAscending);
  while (length--) {
    var index = parseFloat(indexes[length]);
    if (index != previous && isIndex(index)) {
      var previous = index;
      splice.call(array, index, 1);
    }
  }
  return result;
});
module.exports = pullAt;
