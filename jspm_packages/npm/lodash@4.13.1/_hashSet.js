/* */ 
var nativeCreate = require('./_nativeCreate');
var HASH_UNDEFINED = '__lodash_hash_undefined__';
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}
module.exports = hashSet;
