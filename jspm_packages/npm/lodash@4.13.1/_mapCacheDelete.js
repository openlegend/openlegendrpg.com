/* */ 
var getMapData = require('./_getMapData');
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}
module.exports = mapCacheDelete;
