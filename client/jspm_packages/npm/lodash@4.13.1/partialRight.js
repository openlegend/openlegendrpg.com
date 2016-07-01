/* */ 
var createWrapper = require('./_createWrapper'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders'),
    rest = require('./rest');
var PARTIAL_RIGHT_FLAG = 64;
var partialRight = rest(function(func, partials) {
  var holders = replaceHolders(partials, getHolder(partialRight));
  return createWrapper(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
});
partialRight.placeholder = {};
module.exports = partialRight;
