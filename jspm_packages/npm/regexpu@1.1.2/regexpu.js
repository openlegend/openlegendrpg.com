/* */ 
module.exports = {
  'rewritePattern': require("./rewrite-pattern"),
  'transformTree': require("./transform-tree"),
  'transpileCode': require("./transpile-code"),
  'version': require("./package.json!systemjs-json").version
};
module.exports.transform = module.exports.transformTree;
