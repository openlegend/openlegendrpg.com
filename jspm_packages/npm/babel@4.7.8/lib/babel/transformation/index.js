/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
module.exports = transform;
var normalizeAst = _interopRequire(require("../helpers/normalize-ast"));
var Transformer = _interopRequire(require("./transformer"));
var object = _interopRequire(require("../helpers/object"));
var File = _interopRequire(require("./file"));
var each = _interopRequire(require("lodash/collection/each"));
function transform(code, opts) {
  var file = new File(opts);
  return file.parse(code);
}
transform.fromAst = function(ast, code, opts) {
  ast = normalizeAst(ast);
  var file = new File(opts);
  file.addCode(code);
  file.transform(ast);
  return file.generate();
};
transform._ensureTransformerNames = function(type, rawKeys) {
  var keys = [];
  for (var i = 0; i < rawKeys.length; i++) {
    var key = rawKeys[i];
    var deprecatedKey = transform.deprecatedTransformerMap[key];
    var aliasKey = transform.aliasTransformerMap[key];
    if (aliasKey) {
      keys.push(aliasKey);
    } else if (deprecatedKey) {
      console.error("The transformer " + key + " has been renamed to " + deprecatedKey);
      rawKeys.push(deprecatedKey);
    } else if (transform.transformers[key]) {
      keys.push(key);
    } else if (transform.namespaces[key]) {
      keys = keys.concat(transform.namespaces[key]);
    } else {
      throw new ReferenceError("Unknown transformer " + key + " specified in " + type);
    }
  }
  return keys;
};
transform.transformerNamespaces = object();
transform.transformers = object();
transform.namespaces = object();
transform.deprecatedTransformerMap = require("./transformers/deprecated.json!systemjs-json");
transform.aliasTransformerMap = require("./transformers/aliases.json!systemjs-json");
transform.moduleFormatters = require("./modules/index");
var rawTransformers = _interopRequire(require("./transformers/index"));
each(rawTransformers, function(transformer, key) {
  var namespace = key.split(".")[0];
  var _transform$namespaces = transform.namespaces;
  var _namespace = namespace;
  if (!_transform$namespaces[_namespace])
    _transform$namespaces[_namespace] = [];
  transform.namespaces[namespace].push(key);
  transform.transformerNamespaces[key] = namespace;
  transform.transformers[key] = new Transformer(key, transformer);
});
