/* */ 
var baseEach = require("./baseEach"),
    baseSortBy = require("./baseSortBy"),
    compareMultiple = require("./compareMultiple"),
    isLength = require("./isLength");
function baseSortByOrder(collection, props, orders) {
  var index = -1,
      length = collection.length,
      result = isLength(length) ? Array(length) : [];
  baseEach(collection, function(value) {
    var length = props.length,
        criteria = Array(length);
    while (length--) {
      criteria[length] = value == null ? undefined : value[props[length]];
    }
    result[++index] = {
      'criteria': criteria,
      'index': index,
      'value': value
    };
  });
  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}
module.exports = baseSortByOrder;
