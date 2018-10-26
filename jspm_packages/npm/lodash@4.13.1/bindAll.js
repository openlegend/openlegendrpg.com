/* */ 
var arrayEach = require('./_arrayEach'),
    baseFlatten = require('./_baseFlatten'),
    bind = require('./bind'),
    rest = require('./rest'),
    toKey = require('./_toKey');
var bindAll = rest(function(object, methodNames) {
  arrayEach(baseFlatten(methodNames, 1), function(key) {
    key = toKey(key);
    object[key] = bind(object[key], object);
  });
  return object;
});
module.exports = bindAll;
