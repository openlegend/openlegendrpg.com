/* */ 
"format cjs";
(function(process) {
  var NODE = cof(process) == PROCESS,
      core = {},
      path = framework ? global : core,
      old = global.core,
      exportGlobal,
      FORCED = 1,
      GLOBAL = 2,
      STATIC = 4,
      PROTO = 8,
      BIND = 16,
      WRAP = 32;
  function $define(type, name, source) {
    var key,
        own,
        out,
        exp,
        isGlobal = type & GLOBAL,
        target = isGlobal ? global : (type & STATIC) ? global[name] : (global[name] || ObjectProto)[PROTOTYPE],
        exports = isGlobal ? core : core[name] || (core[name] = {});
    if (isGlobal)
      source = name;
    for (key in source) {
      own = !(type & FORCED) && target && key in target && (!isFunction(target[key]) || isNative(target[key]));
      out = (own ? target : source)[key];
      if (!framework && isGlobal && !isFunction(target[key]))
        exp = source[key];
      else if (type & BIND && own)
        exp = ctx(out, global);
      else if (type & WRAP && !framework && target[key] == out) {
        exp = function(param) {
          return this instanceof out ? new out(param) : out(param);
        };
        exp[PROTOTYPE] = out[PROTOTYPE];
      } else
        exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
      if (framework && target && !own) {
        if (isGlobal)
          target[key] = out;
        else
          delete target[key] && hidden(target, key, out);
      }
      if (exports[key] != out)
        hidden(exports, key, exp);
    }
  }
  if (typeof module != 'undefined' && module.exports)
    module.exports = core;
  else if (isFunction(define) && define.amd)
    define(function() {
      return core;
    });
  else
    exportGlobal = true;
  if (exportGlobal || framework) {
    core.noConflict = function() {
      global.core = old;
      return core;
    };
    global.core = core;
  }
})(require("process"));
