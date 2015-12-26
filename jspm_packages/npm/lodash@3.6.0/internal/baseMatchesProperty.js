/* */ 
var baseIsEqual = require("./baseIsEqual"),
    isStrictComparable = require("./isStrictComparable"),
    toObject = require("./toObject");
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value && (typeof value != 'undefined' || (key in toObject(object)));
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}
module.exports = baseMatchesProperty;
