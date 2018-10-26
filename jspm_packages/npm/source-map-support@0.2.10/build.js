/* */ 
var fs = require('fs');
var querystring = require('querystring');
var child_process = require('child_process');
function run(command, callback) {
  console.log(command);
  child_process.exec(command, callback);
}
fs.writeFileSync('.temp.js', 'sourceMapSupport = require("./source-map-support");');
run('node_modules/browserify/bin/cmd.js .temp.js', function(error, stdout) {
  if (error)
    throw error;
  var header = ['/*', ' * Support for source maps in V8 stack traces', ' * https://github.com/evanw/node-source-map-support', ' */'].join('\n');
  var code = ['(this["define"] || function(name, callback) { this["sourceMapSupport"] = callback(); })("browser-source-map-support", function(sourceMapSupport) {', stdout.replace(/\bbyte\b/g, 'bite').replace(new RegExp(__dirname + '/', 'g'), '').replace(/@license/g, 'license'), 'return sourceMapSupport});'].join('\n');
  fs.writeFileSync('.temp.js', querystring.stringify({
    compilation_level: 'SIMPLE_OPTIMIZATIONS',
    output_info: 'compiled_code',
    output_format: 'text',
    js_code: code
  }));
  run('curl -d @.temp.js "http://closure-compiler.appspot.com/compile"', function(error, stdout) {
    if (error)
      throw error;
    var code = header + '\n' + stdout;
    fs.unlinkSync('.temp.js');
    fs.writeFileSync('browser-source-map-support.js', code);
    fs.writeFileSync('amd-test/browser-source-map-support.js', code);
  });
});
run('node_modules/coffee-script/bin/coffee --map --compile amd-test/script.coffee', function(error) {
  if (error)
    throw error;
});
run('node_modules/coffee-script/bin/coffee --map --compile browserify-test/script.coffee', function(error) {
  if (error)
    throw error;
  run('node_modules/browserify/bin/cmd.js --debug browserify-test/script.js > browserify-test/compiled.js', function(error) {
    if (error)
      throw error;
  });
});
run('node_modules/coffee-script/bin/coffee --map --compile browser-test/script.coffee', function(error) {
  if (error)
    throw error;
});
run('node_modules/coffee-script/bin/coffee --map --compile header-test/script.coffee', function(error) {
  if (error)
    throw error;
  var contents = fs.readFileSync('header-test/script.js', 'utf8');
  fs.writeFileSync('header-test/script.js', contents.replace(/\/\/# sourceMappingURL=.*/g, ''));
});
