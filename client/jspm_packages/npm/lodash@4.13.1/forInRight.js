/* */ 
var baseForRight = require('./_baseForRight'),
    baseIteratee = require('./_baseIteratee'),
    keysIn = require('./keysIn');
function forInRight(object, iteratee) {
  return object == null ? object : baseForRight(object, baseIteratee(iteratee, 3), keysIn);
}
module.exports = forInRight;
