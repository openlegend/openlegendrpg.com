/* */ 
var isArguments = require('./isArguments'),
    isArray = require('./isArray');
function isFlattenable(value) {
  return isArray(value) || isArguments(value);
}
module.exports = isFlattenable;
