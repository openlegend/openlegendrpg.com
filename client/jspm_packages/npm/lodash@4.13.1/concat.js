/* */ 
var arrayPush = require('./_arrayPush'),
    baseFlatten = require('./_baseFlatten'),
    copyArray = require('./_copyArray'),
    isArray = require('./isArray');
function concat() {
  var length = arguments.length,
      args = Array(length ? length - 1 : 0),
      array = arguments[0],
      index = length;
  while (index--) {
    args[index - 1] = arguments[index];
  }
  return length ? arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1)) : [];
}
module.exports = concat;
