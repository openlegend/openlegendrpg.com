/* */ 
var arrayMap = require('./_arrayMap'),
    baseAt = require('./_baseAt'),
    baseFlatten = require('./_baseFlatten'),
    basePullAt = require('./_basePullAt'),
    compareAscending = require('./_compareAscending'),
    isIndex = require('./_isIndex'),
    rest = require('./rest');
var pullAt = rest(function(array, indexes) {
  indexes = baseFlatten(indexes, 1);
  var length = array ? array.length : 0,
      result = baseAt(array, indexes);
  basePullAt(array, arrayMap(indexes, function(index) {
    return isIndex(index, length) ? +index : index;
  }).sort(compareAscending));
  return result;
});
module.exports = pullAt;
