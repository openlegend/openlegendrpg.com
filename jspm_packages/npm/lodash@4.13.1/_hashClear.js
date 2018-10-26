/* */ 
var nativeCreate = require('./_nativeCreate');
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
module.exports = hashClear;
