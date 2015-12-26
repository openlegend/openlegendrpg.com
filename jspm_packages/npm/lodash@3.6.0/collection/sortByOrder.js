/* */ 
var baseSortByOrder = require("../internal/baseSortByOrder"),
    isArray = require("../lang/isArray"),
    isIterateeCall = require("../internal/isIterateeCall");
function sortByOrder(collection, props, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (guard && isIterateeCall(props, orders, guard)) {
    orders = null;
  }
  if (!isArray(props)) {
    props = props == null ? [] : [props];
  }
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseSortByOrder(collection, props, orders);
}
module.exports = sortByOrder;
