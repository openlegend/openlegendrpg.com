/* */ 
var arrayEachRight = require('./_arrayEachRight'),
    baseEachRight = require('./_baseEachRight'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray');
function forEachRight(collection, iteratee) {
  var func = isArray(collection) ? arrayEachRight : baseEachRight;
  return func(collection, baseIteratee(iteratee, 3));
}
module.exports = forEachRight;
