/* */ 
(function(Buffer) {
  var root = require('./_root'),
      stubFalse = require('./stubFalse');
  var freeExports = typeof exports == 'object' && exports;
  var freeModule = freeExports && typeof module == 'object' && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root.Buffer : undefined;
  var isBuffer = !Buffer ? stubFalse : function(value) {
    return value instanceof Buffer;
  };
  module.exports = isBuffer;
})(require('@empty').Buffer);
