/* */ 
var ListCache = require('./_ListCache');
function stackClear() {
  this.__data__ = new ListCache;
}
module.exports = stackClear;
