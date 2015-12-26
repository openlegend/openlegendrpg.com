/* */ 
(function(process) {
  var assert = require("assert");
  var path = require("path");
  var fs = require("fs");
  var through = require("through");
  var transform = require("./lib/visit").transform;
  var utils = require("./lib/util");
  var types = require("ast-types");
  var genOrAsyncFunExp = /\bfunction\s*\*|\basync\b/;
  var blockBindingExp = /\b(let|const)\s+/;
  function exports(file, options) {
    var data = [];
    return through(write, end);
    function write(buf) {
      data.push(buf);
    }
    function end() {
      this.queue(compile(data.join(""), options).code);
      this.queue(null);
    }
  }
  module.exports = exports;
  function runtime() {
    require("./runtime");
  }
  exports.runtime = runtime;
  runtime.path = path.join(__dirname, "runtime.js");
  exports.transform = transform;
})(require("process"));
