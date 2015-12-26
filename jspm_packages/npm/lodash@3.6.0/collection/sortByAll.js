/* */ 
var baseFlatten = require("../internal/baseFlatten"),
    baseSortByOrder = require("../internal/baseSortByOrder"),
    isIterateeCall = require("../internal/isIterateeCall");
function sortByAll() {
  var args = arguments,
      collection = args[0],
      guard = args[3],
      index = 0,
      length = args.length - 1;
  if (collection == null) {
    return [];
  }
  var props = Array(length);
  while (index < length) {
    props[index] = args[++index];
  }
  if (guard && isIterateeCall(args[1], args[2], guard)) {
    props = args[1];
  }
  return baseSortByOrder(collection, baseFlatten(props), []);
}
module.exports = sortByAll;
