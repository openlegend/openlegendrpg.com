/* */ 
var baseToNumber = require('./_baseToNumber'),
    baseToString = require('./_baseToString');
function createMathOperation(operator) {
  return function(value, other) {
    var result;
    if (value === undefined && other === undefined) {
      return 0;
    }
    if (value !== undefined) {
      result = value;
    }
    if (other !== undefined) {
      if (result === undefined) {
        return other;
      }
      if (typeof value == 'string' || typeof other == 'string') {
        value = baseToString(value);
        other = baseToString(other);
      } else {
        value = baseToNumber(value);
        other = baseToNumber(other);
      }
      result = operator(value, other);
    }
    return result;
  };
}
module.exports = createMathOperation;
