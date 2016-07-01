/* */ 
var baseIsNative = require('./_baseIsNative'),
    isMaskable = require('./_isMaskable');
function isNative(value) {
  if (isMaskable(value)) {
    throw new Error('This method is not supported with `core-js`. Try https://github.com/es-shims.');
  }
  return baseIsNative(value);
}
module.exports = isNative;
