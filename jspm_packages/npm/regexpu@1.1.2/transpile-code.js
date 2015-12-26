/* */ 
var recast = require("recast");
var transform = require("./transform-tree");
module.exports = function(input, options) {
  options || (options = {});
  var sourceFileName = options.sourceFileName || '';
  var sourceMapName = options.sourceMapName || '';
  var createSourceMap = sourceFileName && sourceMapName;
  var tree = recast.parse(input, {'sourceFileName': sourceFileName});
  tree = transform(tree);
  if (createSourceMap) {
    return recast.print(tree, {'sourceMapName': sourceMapName});
  }
  return recast.print(tree).code;
};
