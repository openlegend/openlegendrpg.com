/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseSortedUniq = require('./_baseSortedUniq');
function sortedUniqBy(array, iteratee) {
  return (array && array.length) ? baseSortedUniq(array, baseIteratee(iteratee)) : [];
}
module.exports = sortedUniqBy;
