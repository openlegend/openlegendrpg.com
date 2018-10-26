/* */ 
var ListCache = require('./_ListCache'),
    MapCache = require('./_MapCache');
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
    cache = this.__data__ = new MapCache(cache.__data__);
  }
  cache.set(key, value);
  return this;
}
module.exports = stackSet;
