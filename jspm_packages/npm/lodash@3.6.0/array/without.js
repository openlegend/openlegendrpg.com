/* */ 
var baseDifference = require("../internal/baseDifference"),
    isArguments = require("../lang/isArguments"),
    isArray = require("../lang/isArray"),
    restParam = require("../function/restParam");
var without = restParam(function(array, values) {
  return (isArray(array) || isArguments(array)) ? baseDifference(array, values) : [];
});
module.exports = without;
