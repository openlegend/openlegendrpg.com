/* */ 
(function(process) {
  'use strict';
  var pkg = require("./package.json!systemjs-json");
  var leven = require("../leven@1.0.1");
  var argv = process.argv.slice(2);
  function help() {
    console.log(['', '  ' + pkg.description, '', '  Example', '    leven cat cow', '    2'].join('\n'));
  }
  if (argv.length !== 2 || argv.indexOf('--help') !== -1) {
    help();
    return ;
  }
  if (argv.indexOf('--version') !== -1) {
    console.log(pkg.version);
    return ;
  }
  console.log(leven(argv[0], argv[1]));
})(require("process"));
