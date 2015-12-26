/* */ 
var g = typeof global === "object" ? global : typeof window === "object" ? window : this;
var hasOwn = Object.prototype.hasOwnProperty;
var hadRuntime = hasOwn.call(g, "regeneratorRuntime");
var oldRuntime = hadRuntime && g.regeneratorRuntime;
delete g.regeneratorRuntime;
module.exports = require("./runtime");
if (hadRuntime) {
  g.regeneratorRuntime = oldRuntime;
} else {
  delete g.regeneratorRuntime;
}
