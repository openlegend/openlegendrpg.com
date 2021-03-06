/* */ 
"use strict";
var _interopRequire = function(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};
exports.is = is;
exports.shallowEqual = shallowEqual;
exports.appendToMemberExpression = appendToMemberExpression;
exports.prependToMemberExpression = prependToMemberExpression;
exports.ensureBlock = ensureBlock;
exports.clone = clone;
exports.cloneDeep = cloneDeep;
exports.buildMatchMemberExpression = buildMatchMemberExpression;
exports.removeComments = removeComments;
exports.inheritsComments = inheritsComments;
exports.inherits = inherits;
var toFastProperties = _interopRequire(require('to-fast-properties'));
var compact = _interopRequire(require('lodash/array/compact'));
var assign = _interopRequire(require('lodash/object/assign'));
var each = _interopRequire(require('lodash/collection/each'));
var uniq = _interopRequire(require('lodash/array/uniq'));
var t = exports;
function registerType(type, skipAliasCheck) {
  var is = t["is" + type] = function(node, opts) {
    return t.is(type, node, opts, skipAliasCheck);
  };
  t["assert" + type] = function(node, opts) {
    if (!opts)
      opts = {};
    if (!is(node, opts)) {
      throw new Error("Expected type " + JSON.stringify(type) + " with option " + JSON.stringify(opts));
    }
  };
}
var STATEMENT_OR_BLOCK_KEYS = exports.STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
var NATIVE_TYPE_NAMES = exports.NATIVE_TYPE_NAMES = ["Array", "Object", "Number", "Boolean", "Date", "Array", "String"];
var FLATTENABLE_KEYS = exports.FLATTENABLE_KEYS = ["body", "expressions"];
var FOR_INIT_KEYS = exports.FOR_INIT_KEYS = ["left", "init"];
var COMMENT_KEYS = exports.COMMENT_KEYS = ["leadingComments", "trailingComments"];
var VISITOR_KEYS = exports.VISITOR_KEYS = require('./visitor-keys.json!systemjs-json');
var BUILDER_KEYS = exports.BUILDER_KEYS = require('./builder-keys.json!systemjs-json');
var ALIAS_KEYS = exports.ALIAS_KEYS = require('./alias-keys.json!systemjs-json');
t.FLIPPED_ALIAS_KEYS = {};
each(t.VISITOR_KEYS, function(keys, type) {
  registerType(type, true);
});
each(t.ALIAS_KEYS, function(aliases, type) {
  each(aliases, function(alias) {
    var _t$FLIPPED_ALIAS_KEYS,
        _alias;
    var types = (_t$FLIPPED_ALIAS_KEYS = t.FLIPPED_ALIAS_KEYS, _alias = alias, !_t$FLIPPED_ALIAS_KEYS[_alias] && (_t$FLIPPED_ALIAS_KEYS[_alias] = []), _t$FLIPPED_ALIAS_KEYS[_alias]);
    types.push(type);
  });
});
each(t.FLIPPED_ALIAS_KEYS, function(types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type, false);
});
var TYPES = exports.TYPES = Object.keys(t.VISITOR_KEYS).concat(Object.keys(t.FLIPPED_ALIAS_KEYS));
function is(type, node, opts, skipAliasCheck) {
  if (!node)
    return false;
  var typeMatches = type === node.type;
  if (!typeMatches && !skipAliasCheck) {
    var aliases = t.FLIPPED_ALIAS_KEYS[type];
    if (typeof aliases !== "undefined") {
      typeMatches = aliases.indexOf(node.type) > -1;
    }
  }
  if (!typeMatches) {
    return false;
  }
  if (typeof opts !== "undefined") {
    return t.shallowEqual(node, opts);
  }
  return true;
}
each(t.VISITOR_KEYS, function(keys, type) {
  if (t.BUILDER_KEYS[type])
    return;
  var defs = {};
  each(keys, function(key) {
    defs[key] = null;
  });
  t.BUILDER_KEYS[type] = defs;
});
each(t.BUILDER_KEYS, function(keys, type) {
  t[type[0].toLowerCase() + type.slice(1)] = function() {
    var node = {};
    node.start = null;
    node.type = type;
    var i = 0;
    for (var key in keys) {
      var arg = arguments[i++];
      if (arg === undefined)
        arg = keys[key];
      node[key] = arg;
    }
    return node;
  };
});
function shallowEqual(actual, expected) {
  var keys = Object.keys(expected);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (actual[key] !== expected[key]) {
      return false;
    }
  }
  return true;
}
function appendToMemberExpression(member, append, computed) {
  member.object = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}
function prependToMemberExpression(member, append) {
  member.object = t.memberExpression(append, member.object);
  return member;
}
function ensureBlock(node) {
  var key = arguments[1] === undefined ? "body" : arguments[1];
  return node[key] = t.toBlock(node[key], node);
}
function clone(node) {
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_")
      continue;
    newNode[key] = node[key];
  }
  return newNode;
}
function cloneDeep(node) {
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_")
      continue;
    var val = node[key];
    if (val) {
      if (val.type) {
        val = t.cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(t.cloneDeep);
      }
    }
    newNode[key] = val;
  }
  return newNode;
}
function buildMatchMemberExpression(match, allowPartial) {
  var parts = match.split(".");
  return function(member) {
    if (!t.isMemberExpression(member))
      return false;
    var search = [member];
    var i = 0;
    while (search.length) {
      var node = search.shift();
      if (allowPartial && i === parts.length) {
        return true;
      }
      if (t.isIdentifier(node)) {
        if (parts[i] !== node.name)
          return false;
      } else if (t.isLiteral(node)) {
        if (parts[i] !== node.value)
          return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isLiteral(node.property)) {
          return false;
        } else {
          search.push(node.object);
          search.push(node.property);
          continue;
        }
      } else {
        return false;
      }
      if (++i > parts.length) {
        return false;
      }
    }
    return true;
  };
}
function removeComments(child) {
  each(COMMENT_KEYS, function(key) {
    delete child[key];
  });
  return child;
}
function inheritsComments(child, parent) {
  each(COMMENT_KEYS, function(key) {
    child[key] = uniq(compact([].concat(child[key], parent[key])));
  });
  return child;
}
function inherits(child, parent) {
  child._declarations = parent._declarations;
  child._scopeInfo = parent._scopeInfo;
  child.range = parent.range;
  child.start = parent.start;
  child.loc = parent.loc;
  child.end = parent.end;
  child.typeAnnotation = parent.typeAnnotation;
  child.returnType = parent.returnType;
  t.inheritsComments(child, parent);
  return child;
}
toFastProperties(t);
toFastProperties(t.VISITOR_KEYS);
exports.__esModule = true;
assign(t, require('./evaluators'));
assign(t, require('./retrievers'));
assign(t, require('./validators'));
assign(t, require('./converters'));
exports.__esModule = true;
