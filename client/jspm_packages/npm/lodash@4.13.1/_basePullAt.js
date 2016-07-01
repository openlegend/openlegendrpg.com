/* */ 
var castPath = require('./_castPath'),
    isIndex = require('./_isIndex'),
    isKey = require('./_isKey'),
    last = require('./last'),
    parent = require('./_parent'),
    toKey = require('./_toKey');
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;
  while (length--) {
    var index = indexes[length];
    if (length == lastIndex || index !== previous) {
      var previous = index;
      if (isIndex(index)) {
        splice.call(array, index, 1);
      } else if (!isKey(index, array)) {
        var path = castPath(index),
            object = parent(array, path);
        if (object != null) {
          delete object[toKey(last(path))];
        }
      } else {
        delete array[toKey(index)];
      }
    }
  }
  return array;
}
module.exports = basePullAt;
