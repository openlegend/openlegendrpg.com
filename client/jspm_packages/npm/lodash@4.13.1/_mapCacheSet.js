/* */ 
var getMapData = require('./_getMapData');
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}
module.exports = mapCacheSet;
