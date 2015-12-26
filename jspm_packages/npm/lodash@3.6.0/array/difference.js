/* */ 
var baseDifference = require("../internal/baseDifference"),
    baseFlatten = require("../internal/baseFlatten"),
    isArguments = require("../lang/isArguments"),
    isArray = require("../lang/isArray"),
    restParam = require("../function/restParam");
var difference = restParam(function(array, values) {
  return (isArray(array) || isArguments(array)) ? baseDifference(array, baseFlatten(values, false, true)) : [];
});
module.exports = difference;
