/* */ 
var baseForOwnRight = require('./_baseForOwnRight'),
    baseIteratee = require('./_baseIteratee');
function forOwnRight(object, iteratee) {
  return object && baseForOwnRight(object, baseIteratee(iteratee, 3));
}
module.exports = forOwnRight;
