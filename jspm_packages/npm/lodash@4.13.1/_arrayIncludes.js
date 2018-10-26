/* */ 
var baseIndexOf = require('./_baseIndexOf');
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
module.exports = arrayIncludes;
