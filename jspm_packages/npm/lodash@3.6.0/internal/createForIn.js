/* */ 
var bindCallback = require('./bindCallback'),
    keysIn = require('../object/keysIn');
function createForIn(objectFunc) {
  return function(object, iteratee, thisArg) {
    if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
      iteratee = bindCallback(iteratee, thisArg, 3);
    }
    return objectFunc(object, iteratee, keysIn);
  };
}
module.exports = createForIn;
