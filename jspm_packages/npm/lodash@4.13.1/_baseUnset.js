/* */ 
var baseHas = require('./_baseHas'),
    castPath = require('./_castPath'),
    isKey = require('./_isKey'),
    last = require('./last'),
    parent = require('./_parent'),
    toKey = require('./_toKey');
function baseUnset(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  object = parent(object, path);
  var key = toKey(last(path));
  return !(object != null && baseHas(object, key)) || delete object[key];
}
module.exports = baseUnset;
