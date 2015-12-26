/* */ 
var baseAt = require("../internal/baseAt"),
    baseFlatten = require("../internal/baseFlatten"),
    isLength = require("../internal/isLength"),
    restParam = require("../function/restParam"),
    toIterable = require("../internal/toIterable");
var at = restParam(function(collection, props) {
  var length = collection ? collection.length : 0;
  if (isLength(length)) {
    collection = toIterable(collection);
  }
  return baseAt(collection, baseFlatten(props));
});
module.exports = at;
