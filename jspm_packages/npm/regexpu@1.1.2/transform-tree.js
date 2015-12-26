/* */ 
var recast = require("recast");
var rewritePattern = require("./rewrite-pattern");
var types = recast.types;
var visitor = types.PathVisitor.fromMethodsObject({'visitLiteral': function(path) {
    var node = path.value;
    if (!node.regex) {
      return false;
    }
    var flags = node.regex.flags;
    if (flags.indexOf('u') == -1) {
      return false;
    }
    var newPattern = rewritePattern(node.regex.pattern, flags);
    var newFlags = flags.replace('u', '');
    var result = '/' + newPattern + '/' + newFlags;
    node.regex = {
      'pattern': newPattern,
      'flags': newFlags
    };
    node.raw = result;
    node.value = {'toString': function() {
        return result;
      }};
    return false;
  }});
module.exports = function(node) {
  return types.visit(node, visitor);
};
