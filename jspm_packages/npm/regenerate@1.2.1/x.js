/* */ 
var regenerate = require("./regenerate");
var jsesc = require("jsesc");
console.log(jsesc(regenerate().addRange(0x000000, 0x10FFFF).removeRange(0x0041, 0x007A).toString()));
