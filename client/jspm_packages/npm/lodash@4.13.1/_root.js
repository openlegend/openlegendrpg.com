/* */ 
var checkGlobal = require('./_checkGlobal');
var freeGlobal = checkGlobal(typeof global == 'object' && global);
var freeSelf = checkGlobal(typeof self == 'object' && self);
var thisGlobal = checkGlobal(typeof this == 'object' && this);
var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
module.exports = root;
