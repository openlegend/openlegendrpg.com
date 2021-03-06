/* */ 
"format cjs";
(function(process) {
  (function(window, undefined) {
    'use strict';
    var document = window.document,
        navigator = window.navigator,
        location = window.location;
    var jQuery = (function() {
      var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery);
      },
          _jQuery = window.jQuery,
          _$ = window.$,
          rootjQuery,
          quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
          rnotwhite = /\S/,
          trimLeft = /^\s+/,
          trimRight = /\s+$/,
          rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
          rvalidchars = /^[\],:{}\s]*$/,
          rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
          rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
          rwebkit = /(webkit)[ \/]([\w.]+)/,
          ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
          rmsie = /(msie) ([\w.]+)/,
          rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
          rdashAlpha = /-([a-z]|[0-9])/ig,
          rmsPrefix = /^-ms-/,
          fcamelCase = function(all, letter) {
            return (letter + "").toUpperCase();
          },
          userAgent = navigator.userAgent,
          browserMatch,
          readyList,
          DOMContentLoaded,
          toString = Object.prototype.toString,
          hasOwn = Object.prototype.hasOwnProperty,
          push = Array.prototype.push,
          slice = Array.prototype.slice,
          trim = String.prototype.trim,
          indexOf = Array.prototype.indexOf,
          class2type = {};
      jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
          var match,
              elem,
              ret,
              doc;
          if (!selector) {
            return this;
          }
          if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
          }
          if (selector === "body" && !context && document.body) {
            this.context = document;
            this[0] = document.body;
            this.selector = selector;
            this.length = 1;
            return this;
          }
          if (typeof selector === "string") {
            if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
              match = [null, selector, null];
            } else {
              match = quickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
              if (match[1]) {
                context = context instanceof jQuery ? context[0] : context;
                doc = (context ? context.ownerDocument || context : document);
                ret = rsingleTag.exec(selector);
                if (ret) {
                  if (jQuery.isPlainObject(context)) {
                    selector = [document.createElement(ret[1])];
                    jQuery.fn.attr.call(selector, context, true);
                  } else {
                    selector = [doc.createElement(ret[1])];
                  }
                } else {
                  ret = jQuery.buildFragment([match[1]], [doc]);
                  selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
                }
                return jQuery.merge(this, selector);
              } else {
                elem = document.getElementById(match[2]);
                if (elem && elem.parentNode) {
                  if (elem.id !== match[2]) {
                    return rootjQuery.find(selector);
                  }
                  this.length = 1;
                  this[0] = elem;
                }
                this.context = document;
                this.selector = selector;
                return this;
              }
            } else if (!context || context.jquery) {
              return (context || rootjQuery).find(selector);
            } else {
              return this.constructor(context).find(selector);
            }
          } else if (jQuery.isFunction(selector)) {
            return rootjQuery.ready(selector);
          }
          if (selector.selector !== undefined) {
            this.selector = selector.selector;
            this.context = selector.context;
          }
          return jQuery.makeArray(selector, this);
        },
        selector: "",
        jquery: "1.7.2",
        length: 0,
        size: function() {
          return this.length;
        },
        toArray: function() {
          return slice.call(this, 0);
        },
        get: function(num) {
          return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
        },
        pushStack: function(elems, name, selector) {
          var ret = this.constructor();
          if (jQuery.isArray(elems)) {
            push.apply(ret, elems);
          } else {
            jQuery.merge(ret, elems);
          }
          ret.prevObject = this;
          ret.context = this.context;
          if (name === "find") {
            ret.selector = this.selector + (this.selector ? " " : "") + selector;
          } else if (name) {
            ret.selector = this.selector + "." + name + "(" + selector + ")";
          }
          return ret;
        },
        each: function(callback, args) {
          return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
          jQuery.bindReady();
          readyList.add(fn);
          return this;
        },
        eq: function(i) {
          i = +i;
          return i === -1 ? this.slice(i) : this.slice(i, i + 1);
        },
        first: function() {
          return this.eq(0);
        },
        last: function() {
          return this.eq(-1);
        },
        slice: function() {
          return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","));
        },
        map: function(callback) {
          return this.pushStack(jQuery.map(this, function(elem, i) {
            return callback.call(elem, i, elem);
          }));
        },
        end: function() {
          return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: [].sort,
        splice: [].splice
      };
      jQuery.fn.init.prototype = jQuery.fn;
      jQuery.extend = jQuery.fn.extend = function() {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          i = 2;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
          target = {};
        }
        if (length === i) {
          target = this;
          --i;
        }
        for (; i < length; i++) {
          if ((options = arguments[i]) != null) {
            for (name in options) {
              src = target[name];
              copy = options[name];
              if (target === copy) {
                continue;
              }
              if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && jQuery.isArray(src) ? src : [];
                } else {
                  clone = src && jQuery.isPlainObject(src) ? src : {};
                }
                target[name] = jQuery.extend(deep, clone, copy);
              } else if (copy !== undefined) {
                target[name] = copy;
              }
            }
          }
        }
        return target;
      };
      jQuery.extend({
        noConflict: function(deep) {
          if (window.$ === jQuery) {
            window.$ = _$;
          }
          if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
          }
          return jQuery;
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
          if (hold) {
            jQuery.readyWait++;
          } else {
            jQuery.ready(true);
          }
        },
        ready: function(wait) {
          if ((wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady)) {
            if (!document.body) {
              return setTimeout(jQuery.ready, 1);
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
              return;
            }
            readyList.fireWith(document, [jQuery]);
            if (jQuery.fn.trigger) {
              jQuery(document).trigger("ready").off("ready");
            }
          }
        },
        bindReady: function() {
          if (readyList) {
            return;
          }
          readyList = jQuery.Callbacks("once memory");
          if (document.readyState === "complete") {
            return setTimeout(jQuery.ready, 1);
          }
          if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
            window.addEventListener("load", jQuery.ready, false);
          } else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", DOMContentLoaded);
            window.attachEvent("onload", jQuery.ready);
            var toplevel = false;
            try {
              toplevel = window.frameElement == null;
            } catch (e) {}
            if (document.documentElement.doScroll && toplevel) {
              doScrollCheck();
            }
          }
        },
        isFunction: function(obj) {
          return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function(obj) {
          return jQuery.type(obj) === "array";
        },
        isWindow: function(obj) {
          return obj != null && obj == obj.window;
        },
        isNumeric: function(obj) {
          return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
          return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
        },
        isPlainObject: function(obj) {
          if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
            return false;
          }
          try {
            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
              return false;
            }
          } catch (e) {
            return false;
          }
          var key;
          for (key in obj) {}
          return key === undefined || hasOwn.call(obj, key);
        },
        isEmptyObject: function(obj) {
          for (var name in obj) {
            return false;
          }
          return true;
        },
        error: function(msg) {
          throw new Error(msg);
        },
        parseJSON: function(data) {
          if (typeof data !== "string" || !data) {
            return null;
          }
          data = jQuery.trim(data);
          if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data);
          }
          if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
            return (new Function("return " + data))();
          }
          jQuery.error("Invalid JSON: " + data);
        },
        parseXML: function(data) {
          if (typeof data !== "string" || !data) {
            return null;
          }
          var xml,
              tmp;
          try {
            if (window.DOMParser) {
              tmp = new DOMParser();
              xml = tmp.parseFromString(data, "text/xml");
            } else {
              xml = new ActiveXObject("Microsoft.XMLDOM");
              xml.async = "false";
              xml.loadXML(data);
            }
          } catch (e) {
            xml = undefined;
          }
          if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
          }
          return xml;
        },
        noop: function() {},
        globalEval: function(data) {
          if (data && rnotwhite.test(data)) {
            (window.execScript || function(data) {
              window["eval"].call(window, data);
            })(data);
          }
        },
        camelCase: function(string) {
          return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
          return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
        },
        each: function(object, callback, args) {
          var name,
              i = 0,
              length = object.length,
              isObj = length === undefined || jQuery.isFunction(object);
          if (args) {
            if (isObj) {
              for (name in object) {
                if (callback.apply(object[name], args) === false) {
                  break;
                }
              }
            } else {
              for (; i < length; ) {
                if (callback.apply(object[i++], args) === false) {
                  break;
                }
              }
            }
          } else {
            if (isObj) {
              for (name in object) {
                if (callback.call(object[name], name, object[name]) === false) {
                  break;
                }
              }
            } else {
              for (; i < length; ) {
                if (callback.call(object[i], i, object[i++]) === false) {
                  break;
                }
              }
            }
          }
          return object;
        },
        trim: trim ? function(text) {
          return text == null ? "" : trim.call(text);
        } : function(text) {
          return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
        },
        makeArray: function(array, results) {
          var ret = results || [];
          if (array != null) {
            var type = jQuery.type(array);
            if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
              push.call(ret, array);
            } else {
              jQuery.merge(ret, array);
            }
          }
          return ret;
        },
        inArray: function(elem, array, i) {
          var len;
          if (array) {
            if (indexOf) {
              return indexOf.call(array, elem, i);
            }
            len = array.length;
            i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
            for (; i < len; i++) {
              if (i in array && array[i] === elem) {
                return i;
              }
            }
          }
          return -1;
        },
        merge: function(first, second) {
          var i = first.length,
              j = 0;
          if (typeof second.length === "number") {
            for (var l = second.length; j < l; j++) {
              first[i++] = second[j];
            }
          } else {
            while (second[j] !== undefined) {
              first[i++] = second[j++];
            }
          }
          first.length = i;
          return first;
        },
        grep: function(elems, callback, inv) {
          var ret = [],
              retVal;
          inv = !!inv;
          for (var i = 0,
              length = elems.length; i < length; i++) {
            retVal = !!callback(elems[i], i);
            if (inv !== retVal) {
              ret.push(elems[i]);
            }
          }
          return ret;
        },
        map: function(elems, callback, arg) {
          var value,
              key,
              ret = [],
              i = 0,
              length = elems.length,
              isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
          if (isArray) {
            for (; i < length; i++) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret[ret.length] = value;
              }
            }
          } else {
            for (key in elems) {
              value = callback(elems[key], key, arg);
              if (value != null) {
                ret[ret.length] = value;
              }
            }
          }
          return ret.concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
          if (typeof context === "string") {
            var tmp = fn[context];
            context = fn;
            fn = tmp;
          }
          if (!jQuery.isFunction(fn)) {
            return undefined;
          }
          var args = slice.call(arguments, 2),
              proxy = function() {
                return fn.apply(context, args.concat(slice.call(arguments)));
              };
          proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
          return proxy;
        },
        access: function(elems, fn, key, value, chainable, emptyGet, pass) {
          var exec,
              bulk = key == null,
              i = 0,
              length = elems.length;
          if (key && typeof key === "object") {
            for (i in key) {
              jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
            }
            chainable = 1;
          } else if (value !== undefined) {
            exec = pass === undefined && jQuery.isFunction(value);
            if (bulk) {
              if (exec) {
                exec = fn;
                fn = function(elem, key, value) {
                  return exec.call(jQuery(elem), value);
                };
              } else {
                fn.call(elems, value);
                fn = null;
              }
            }
            if (fn) {
              for (; i < length; i++) {
                fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
              }
            }
            chainable = 1;
          }
          return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: function() {
          return (new Date()).getTime();
        },
        uaMatch: function(ua) {
          ua = ua.toLowerCase();
          var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
          return {
            browser: match[1] || "",
            version: match[2] || "0"
          };
        },
        sub: function() {
          function jQuerySub(selector, context) {
            return new jQuerySub.fn.init(selector, context);
          }
          jQuery.extend(true, jQuerySub, this);
          jQuerySub.superclass = this;
          jQuerySub.fn = jQuerySub.prototype = this();
          jQuerySub.fn.constructor = jQuerySub;
          jQuerySub.sub = this.sub;
          jQuerySub.fn.init = function init(selector, context) {
            if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
              context = jQuerySub(context);
            }
            return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
          };
          jQuerySub.fn.init.prototype = jQuerySub.fn;
          var rootjQuerySub = jQuerySub(document);
          return jQuerySub;
        },
        browser: {}
      });
      jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
      });
      browserMatch = jQuery.uaMatch(userAgent);
      if (browserMatch.browser) {
        jQuery.browser[browserMatch.browser] = true;
        jQuery.browser.version = browserMatch.version;
      }
      if (jQuery.browser.webkit) {
        jQuery.browser.safari = true;
      }
      if (rnotwhite.test("\xA0")) {
        trimLeft = /^[\s\xA0]+/;
        trimRight = /[\s\xA0]+$/;
      }
      rootjQuery = jQuery(document);
      if (document.addEventListener) {
        DOMContentLoaded = function() {
          document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
          jQuery.ready();
        };
      } else if (document.attachEvent) {
        DOMContentLoaded = function() {
          if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", DOMContentLoaded);
            jQuery.ready();
          }
        };
      }
      function doScrollCheck() {
        if (jQuery.isReady) {
          return;
        }
        try {
          document.documentElement.doScroll("left");
        } catch (e) {
          setTimeout(doScrollCheck, 1);
          return;
        }
        jQuery.ready();
      }
      return jQuery;
    })();
    var flagsCache = {};
    function createFlags(flags) {
      var object = flagsCache[flags] = {},
          i,
          length;
      flags = flags.split(/\s+/);
      for (i = 0, length = flags.length; i < length; i++) {
        object[flags[i]] = true;
      }
      return object;
    }
    jQuery.Callbacks = function(flags) {
      flags = flags ? (flagsCache[flags] || createFlags(flags)) : {};
      var list = [],
          stack = [],
          memory,
          fired,
          firing,
          firingStart,
          firingLength,
          firingIndex,
          add = function(args) {
            var i,
                length,
                elem,
                type,
                actual;
            for (i = 0, length = args.length; i < length; i++) {
              elem = args[i];
              type = jQuery.type(elem);
              if (type === "array") {
                add(elem);
              } else if (type === "function") {
                if (!flags.unique || !self.has(elem)) {
                  list.push(elem);
                }
              }
            }
          },
          fire = function(context, args) {
            args = args || [];
            memory = !flags.memory || [context, args];
            fired = true;
            firing = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            for (; list && firingIndex < firingLength; firingIndex++) {
              if (list[firingIndex].apply(context, args) === false && flags.stopOnFalse) {
                memory = true;
                break;
              }
            }
            firing = false;
            if (list) {
              if (!flags.once) {
                if (stack && stack.length) {
                  memory = stack.shift();
                  self.fireWith(memory[0], memory[1]);
                }
              } else if (memory === true) {
                self.disable();
              } else {
                list = [];
              }
            }
          },
          self = {
            add: function() {
              if (list) {
                var length = list.length;
                add(arguments);
                if (firing) {
                  firingLength = list.length;
                } else if (memory && memory !== true) {
                  firingStart = length;
                  fire(memory[0], memory[1]);
                }
              }
              return this;
            },
            remove: function() {
              if (list) {
                var args = arguments,
                    argIndex = 0,
                    argLength = args.length;
                for (; argIndex < argLength; argIndex++) {
                  for (var i = 0; i < list.length; i++) {
                    if (args[argIndex] === list[i]) {
                      if (firing) {
                        if (i <= firingLength) {
                          firingLength--;
                          if (i <= firingIndex) {
                            firingIndex--;
                          }
                        }
                      }
                      list.splice(i--, 1);
                      if (flags.unique) {
                        break;
                      }
                    }
                  }
                }
              }
              return this;
            },
            has: function(fn) {
              if (list) {
                var i = 0,
                    length = list.length;
                for (; i < length; i++) {
                  if (fn === list[i]) {
                    return true;
                  }
                }
              }
              return false;
            },
            empty: function() {
              list = [];
              return this;
            },
            disable: function() {
              list = stack = memory = undefined;
              return this;
            },
            disabled: function() {
              return !list;
            },
            lock: function() {
              stack = undefined;
              if (!memory || memory === true) {
                self.disable();
              }
              return this;
            },
            locked: function() {
              return !stack;
            },
            fireWith: function(context, args) {
              if (stack) {
                if (firing) {
                  if (!flags.once) {
                    stack.push([context, args]);
                  }
                } else if (!(flags.once && memory)) {
                  fire(context, args);
                }
              }
              return this;
            },
            fire: function() {
              self.fireWith(this, arguments);
              return this;
            },
            fired: function() {
              return !!fired;
            }
          };
      return self;
    };
    var sliceDeferred = [].slice;
    jQuery.extend({
      Deferred: function(func) {
        var doneList = jQuery.Callbacks("once memory"),
            failList = jQuery.Callbacks("once memory"),
            progressList = jQuery.Callbacks("memory"),
            state = "pending",
            lists = {
              resolve: doneList,
              reject: failList,
              notify: progressList
            },
            promise = {
              done: doneList.add,
              fail: failList.add,
              progress: progressList.add,
              state: function() {
                return state;
              },
              isResolved: doneList.fired,
              isRejected: failList.fired,
              then: function(doneCallbacks, failCallbacks, progressCallbacks) {
                deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
                return this;
              },
              always: function() {
                deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
                return this;
              },
              pipe: function(fnDone, fnFail, fnProgress) {
                return jQuery.Deferred(function(newDefer) {
                  jQuery.each({
                    done: [fnDone, "resolve"],
                    fail: [fnFail, "reject"],
                    progress: [fnProgress, "notify"]
                  }, function(handler, data) {
                    var fn = data[0],
                        action = data[1],
                        returned;
                    if (jQuery.isFunction(fn)) {
                      deferred[handler](function() {
                        returned = fn.apply(this, arguments);
                        if (returned && jQuery.isFunction(returned.promise)) {
                          returned.promise().then(newDefer.resolve, newDefer.reject, newDefer.notify);
                        } else {
                          newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
                        }
                      });
                    } else {
                      deferred[handler](newDefer[action]);
                    }
                  });
                }).promise();
              },
              promise: function(obj) {
                if (obj == null) {
                  obj = promise;
                } else {
                  for (var key in promise) {
                    obj[key] = promise[key];
                  }
                }
                return obj;
              }
            },
            deferred = promise.promise({}),
            key;
        for (key in lists) {
          deferred[key] = lists[key].fire;
          deferred[key + "With"] = lists[key].fireWith;
        }
        deferred.done(function() {
          state = "resolved";
        }, failList.disable, progressList.lock).fail(function() {
          state = "rejected";
        }, doneList.disable, progressList.lock);
        if (func) {
          func.call(deferred, deferred);
        }
        return deferred;
      },
      when: function(firstParam) {
        var args = sliceDeferred.call(arguments, 0),
            i = 0,
            length = args.length,
            pValues = new Array(length),
            count = length,
            pCount = length,
            deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ? firstParam : jQuery.Deferred(),
            promise = deferred.promise();
        function resolveFunc(i) {
          return function(value) {
            args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
            if (!(--count)) {
              deferred.resolveWith(deferred, args);
            }
          };
        }
        function progressFunc(i) {
          return function(value) {
            pValues[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
            deferred.notifyWith(promise, pValues);
          };
        }
        if (length > 1) {
          for (; i < length; i++) {
            if (args[i] && args[i].promise && jQuery.isFunction(args[i].promise)) {
              args[i].promise().then(resolveFunc(i), deferred.reject, progressFunc(i));
            } else {
              --count;
            }
          }
          if (!count) {
            deferred.resolveWith(deferred, args);
          }
        } else if (deferred !== firstParam) {
          deferred.resolveWith(deferred, length ? [firstParam] : []);
        }
        return promise;
      }
    });
    jQuery.support = (function() {
      var support,
          all,
          a,
          select,
          opt,
          input,
          fragment,
          tds,
          events,
          eventName,
          i,
          isSupported,
          div = document.createElement("div"),
          documentElement = document.documentElement;
      div.setAttribute("className", "t");
      div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
      all = div.getElementsByTagName("*");
      a = div.getElementsByTagName("a")[0];
      if (!all || !all.length || !a) {
        return {};
      }
      select = document.createElement("select");
      opt = select.appendChild(document.createElement("option"));
      input = div.getElementsByTagName("input")[0];
      support = {
        leadingWhitespace: (div.firstChild.nodeType === 3),
        tbody: !div.getElementsByTagName("tbody").length,
        htmlSerialize: !!div.getElementsByTagName("link").length,
        style: /top/.test(a.getAttribute("style")),
        hrefNormalized: (a.getAttribute("href") === "/a"),
        opacity: /^0.55/.test(a.style.opacity),
        cssFloat: !!a.style.cssFloat,
        checkOn: (input.value === "on"),
        optSelected: opt.selected,
        getSetAttribute: div.className !== "t",
        enctype: !!document.createElement("form").enctype,
        html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
        submitBubbles: true,
        changeBubbles: true,
        focusinBubbles: false,
        deleteExpando: true,
        noCloneEvent: true,
        inlineBlockNeedsLayout: false,
        shrinkWrapBlocks: false,
        reliableMarginRight: true,
        pixelMargin: true
      };
      jQuery.boxModel = support.boxModel = (document.compatMode === "CSS1Compat");
      input.checked = true;
      support.noCloneChecked = input.cloneNode(true).checked;
      select.disabled = true;
      support.optDisabled = !opt.disabled;
      try {
        delete div.test;
      } catch (e) {
        support.deleteExpando = false;
      }
      if (!div.addEventListener && div.attachEvent && div.fireEvent) {
        div.attachEvent("onclick", function() {
          support.noCloneEvent = false;
        });
        div.cloneNode(true).fireEvent("onclick");
      }
      input = document.createElement("input");
      input.value = "t";
      input.setAttribute("type", "radio");
      support.radioValue = input.value === "t";
      input.setAttribute("checked", "checked");
      input.setAttribute("name", "t");
      div.appendChild(input);
      fragment = document.createDocumentFragment();
      fragment.appendChild(div.lastChild);
      support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
      support.appendChecked = input.checked;
      fragment.removeChild(input);
      fragment.appendChild(div);
      if (div.attachEvent) {
        for (i in {
          submit: 1,
          change: 1,
          focusin: 1
        }) {
          eventName = "on" + i;
          isSupported = (eventName in div);
          if (!isSupported) {
            div.setAttribute(eventName, "return;");
            isSupported = (typeof div[eventName] === "function");
          }
          support[i + "Bubbles"] = isSupported;
        }
      }
      fragment.removeChild(div);
      fragment = select = opt = div = input = null;
      jQuery(function() {
        var container,
            outer,
            inner,
            table,
            td,
            offsetSupport,
            marginDiv,
            conMarginTop,
            style,
            html,
            positionTopLeftWidthHeight,
            paddingMarginBorderVisibility,
            paddingMarginBorder,
            body = document.getElementsByTagName("body")[0];
        if (!body) {
          return;
        }
        conMarginTop = 1;
        paddingMarginBorder = "padding:0;margin:0;border:";
        positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
        paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
        style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
        html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div>" + "<table " + style + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>";
        container = document.createElement("div");
        container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
        body.insertBefore(container, body.firstChild);
        div = document.createElement("div");
        container.appendChild(div);
        div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
        tds = div.getElementsByTagName("td");
        isSupported = (tds[0].offsetHeight === 0);
        tds[0].style.display = "";
        tds[1].style.display = "none";
        support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
        if (window.getComputedStyle) {
          div.innerHTML = "";
          marginDiv = document.createElement("div");
          marginDiv.style.width = "0";
          marginDiv.style.marginRight = "0";
          div.style.width = "2px";
          div.appendChild(marginDiv);
          support.reliableMarginRight = (parseInt((window.getComputedStyle(marginDiv, null) || {marginRight: 0}).marginRight, 10) || 0) === 0;
        }
        if (typeof div.style.zoom !== "undefined") {
          div.innerHTML = "";
          div.style.width = div.style.padding = "1px";
          div.style.border = 0;
          div.style.overflow = "hidden";
          div.style.display = "inline";
          div.style.zoom = 1;
          support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
          div.style.display = "block";
          div.style.overflow = "visible";
          div.innerHTML = "<div style='width:5px;'></div>";
          support.shrinkWrapBlocks = (div.offsetWidth !== 3);
        }
        div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
        div.innerHTML = html;
        outer = div.firstChild;
        inner = outer.firstChild;
        td = outer.nextSibling.firstChild.firstChild;
        offsetSupport = {
          doesNotAddBorder: (inner.offsetTop !== 5),
          doesAddBorderForTableAndCells: (td.offsetTop === 5)
        };
        inner.style.position = "fixed";
        inner.style.top = "20px";
        offsetSupport.fixedPosition = (inner.offsetTop === 20 || inner.offsetTop === 15);
        inner.style.position = inner.style.top = "";
        outer.style.overflow = "hidden";
        outer.style.position = "relative";
        offsetSupport.subtractsBorderForOverflowNotVisible = (inner.offsetTop === -5);
        offsetSupport.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== conMarginTop);
        if (window.getComputedStyle) {
          div.style.marginTop = "1%";
          support.pixelMargin = (window.getComputedStyle(div, null) || {marginTop: 0}).marginTop !== "1%";
        }
        if (typeof container.style.zoom !== "undefined") {
          container.style.zoom = 1;
        }
        body.removeChild(container);
        marginDiv = div = container = null;
        jQuery.extend(support, offsetSupport);
      });
      return support;
    })();
    var rbrace = /^(?:\{.*\}|\[.*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
      cache: {},
      uuid: 0,
      expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
      noData: {
        "embed": true,
        "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        "applet": true
      },
      hasData: function(elem) {
        elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
        return !!elem && !isEmptyDataObject(elem);
      },
      data: function(elem, name, data, pvt) {
        if (!jQuery.acceptData(elem)) {
          return;
        }
        var privateCache,
            thisCache,
            ret,
            internalKey = jQuery.expando,
            getByName = typeof name === "string",
            isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey,
            isEvents = name === "events";
        if ((!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined) {
          return;
        }
        if (!id) {
          if (isNode) {
            elem[internalKey] = id = ++jQuery.uuid;
          } else {
            id = internalKey;
          }
        }
        if (!cache[id]) {
          cache[id] = {};
          if (!isNode) {
            cache[id].toJSON = jQuery.noop;
          }
        }
        if (typeof name === "object" || typeof name === "function") {
          if (pvt) {
            cache[id] = jQuery.extend(cache[id], name);
          } else {
            cache[id].data = jQuery.extend(cache[id].data, name);
          }
        }
        privateCache = thisCache = cache[id];
        if (!pvt) {
          if (!thisCache.data) {
            thisCache.data = {};
          }
          thisCache = thisCache.data;
        }
        if (data !== undefined) {
          thisCache[jQuery.camelCase(name)] = data;
        }
        if (isEvents && !thisCache[name]) {
          return privateCache.events;
        }
        if (getByName) {
          ret = thisCache[name];
          if (ret == null) {
            ret = thisCache[jQuery.camelCase(name)];
          }
        } else {
          ret = thisCache;
        }
        return ret;
      },
      removeData: function(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
          return;
        }
        var thisCache,
            i,
            l,
            internalKey = jQuery.expando,
            isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[internalKey] : internalKey;
        if (!cache[id]) {
          return;
        }
        if (name) {
          thisCache = pvt ? cache[id] : cache[id].data;
          if (thisCache) {
            if (!jQuery.isArray(name)) {
              if (name in thisCache) {
                name = [name];
              } else {
                name = jQuery.camelCase(name);
                if (name in thisCache) {
                  name = [name];
                } else {
                  name = name.split(" ");
                }
              }
            }
            for (i = 0, l = name.length; i < l; i++) {
              delete thisCache[name[i]];
            }
            if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
              return;
            }
          }
        }
        if (!pvt) {
          delete cache[id].data;
          if (!isEmptyDataObject(cache[id])) {
            return;
          }
        }
        if (jQuery.support.deleteExpando || !cache.setInterval) {
          delete cache[id];
        } else {
          cache[id] = null;
        }
        if (isNode) {
          if (jQuery.support.deleteExpando) {
            delete elem[internalKey];
          } else if (elem.removeAttribute) {
            elem.removeAttribute(internalKey);
          } else {
            elem[internalKey] = null;
          }
        }
      },
      _data: function(elem, name, data) {
        return jQuery.data(elem, name, data, true);
      },
      acceptData: function(elem) {
        if (elem.nodeName) {
          var match = jQuery.noData[elem.nodeName.toLowerCase()];
          if (match) {
            return !(match === true || elem.getAttribute("classid") !== match);
          }
        }
        return true;
      }
    });
    jQuery.fn.extend({
      data: function(key, value) {
        var parts,
            part,
            attr,
            name,
            l,
            elem = this[0],
            i = 0,
            data = null;
        if (key === undefined) {
          if (this.length) {
            data = jQuery.data(elem);
            if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
              attr = elem.attributes;
              for (l = attr.length; i < l; i++) {
                name = attr[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.substring(5));
                  dataAttr(elem, name, data[name]);
                }
              }
              jQuery._data(elem, "parsedAttrs", true);
            }
          }
          return data;
        }
        if (typeof key === "object") {
          return this.each(function() {
            jQuery.data(this, key);
          });
        }
        parts = key.split(".", 2);
        parts[1] = parts[1] ? "." + parts[1] : "";
        part = parts[1] + "!";
        return jQuery.access(this, function(value) {
          if (value === undefined) {
            data = this.triggerHandler("getData" + part, [parts[0]]);
            if (data === undefined && elem) {
              data = jQuery.data(elem, key);
              data = dataAttr(elem, key, data);
            }
            return data === undefined && parts[1] ? this.data(parts[0]) : data;
          }
          parts[1] = value;
          this.each(function() {
            var self = jQuery(this);
            self.triggerHandler("setData" + part, parts);
            jQuery.data(this, key, value);
            self.triggerHandler("changeData" + part, parts);
          });
        }, null, value, arguments.length > 1, null, false);
      },
      removeData: function(key) {
        return this.each(function() {
          jQuery.removeData(this, key);
        });
      }
    });
    function dataAttr(elem, key, data) {
      if (data === undefined && elem.nodeType === 1) {
        var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
        data = elem.getAttribute(name);
        if (typeof data === "string") {
          try {
            data = data === "true" ? true : data === "false" ? false : data === "null" ? null : jQuery.isNumeric(data) ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
          } catch (e) {}
          jQuery.data(elem, key, data);
        } else {
          data = undefined;
        }
      }
      return data;
    }
    function isEmptyDataObject(obj) {
      for (var name in obj) {
        if (name === "data" && jQuery.isEmptyObject(obj[name])) {
          continue;
        }
        if (name !== "toJSON") {
          return false;
        }
      }
      return true;
    }
    function handleQueueMarkDefer(elem, type, src) {
      var deferDataKey = type + "defer",
          queueDataKey = type + "queue",
          markDataKey = type + "mark",
          defer = jQuery._data(elem, deferDataKey);
      if (defer && (src === "queue" || !jQuery._data(elem, queueDataKey)) && (src === "mark" || !jQuery._data(elem, markDataKey))) {
        setTimeout(function() {
          if (!jQuery._data(elem, queueDataKey) && !jQuery._data(elem, markDataKey)) {
            jQuery.removeData(elem, deferDataKey, true);
            defer.fire();
          }
        }, 0);
      }
    }
    jQuery.extend({
      _mark: function(elem, type) {
        if (elem) {
          type = (type || "fx") + "mark";
          jQuery._data(elem, type, (jQuery._data(elem, type) || 0) + 1);
        }
      },
      _unmark: function(force, elem, type) {
        if (force !== true) {
          type = elem;
          elem = force;
          force = false;
        }
        if (elem) {
          type = type || "fx";
          var key = type + "mark",
              count = force ? 0 : ((jQuery._data(elem, key) || 1) - 1);
          if (count) {
            jQuery._data(elem, key, count);
          } else {
            jQuery.removeData(elem, key, true);
            handleQueueMarkDefer(elem, type, "mark");
          }
        }
      },
      queue: function(elem, type, data) {
        var q;
        if (elem) {
          type = (type || "fx") + "queue";
          q = jQuery._data(elem, type);
          if (data) {
            if (!q || jQuery.isArray(data)) {
              q = jQuery._data(elem, type, jQuery.makeArray(data));
            } else {
              q.push(data);
            }
          }
          return q || [];
        }
      },
      dequeue: function(elem, type) {
        type = type || "fx";
        var queue = jQuery.queue(elem, type),
            fn = queue.shift(),
            hooks = {};
        if (fn === "inprogress") {
          fn = queue.shift();
        }
        if (fn) {
          if (type === "fx") {
            queue.unshift("inprogress");
          }
          jQuery._data(elem, type + ".run", hooks);
          fn.call(elem, function() {
            jQuery.dequeue(elem, type);
          }, hooks);
        }
        if (!queue.length) {
          jQuery.removeData(elem, type + "queue " + type + ".run", true);
          handleQueueMarkDefer(elem, type, "queue");
        }
      }
    });
    jQuery.fn.extend({
      queue: function(type, data) {
        var setter = 2;
        if (typeof type !== "string") {
          data = type;
          type = "fx";
          setter--;
        }
        if (arguments.length < setter) {
          return jQuery.queue(this[0], type);
        }
        return data === undefined ? this : this.each(function() {
          var queue = jQuery.queue(this, type, data);
          if (type === "fx" && queue[0] !== "inprogress") {
            jQuery.dequeue(this, type);
          }
        });
      },
      dequeue: function(type) {
        return this.each(function() {
          jQuery.dequeue(this, type);
        });
      },
      delay: function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
          var timeout = setTimeout(next, time);
          hooks.stop = function() {
            clearTimeout(timeout);
          };
        });
      },
      clearQueue: function(type) {
        return this.queue(type || "fx", []);
      },
      promise: function(type, object) {
        if (typeof type !== "string") {
          object = type;
          type = undefined;
        }
        type = type || "fx";
        var defer = jQuery.Deferred(),
            elements = this,
            i = elements.length,
            count = 1,
            deferDataKey = type + "defer",
            queueDataKey = type + "queue",
            markDataKey = type + "mark",
            tmp;
        function resolve() {
          if (!(--count)) {
            defer.resolveWith(elements, [elements]);
          }
        }
        while (i--) {
          if ((tmp = jQuery.data(elements[i], deferDataKey, undefined, true) || (jQuery.data(elements[i], queueDataKey, undefined, true) || jQuery.data(elements[i], markDataKey, undefined, true)) && jQuery.data(elements[i], deferDataKey, jQuery.Callbacks("once memory"), true))) {
            count++;
            tmp.add(resolve);
          }
        }
        resolve();
        return defer.promise(object);
      }
    });
    var rclass = /[\n\t\r]/g,
        rspace = /\s+/,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea)?$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute,
        nodeHook,
        boolHook,
        fixSpecified;
    jQuery.fn.extend({
      attr: function(name, value) {
        return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
      },
      removeAttr: function(name) {
        return this.each(function() {
          jQuery.removeAttr(this, name);
        });
      },
      prop: function(name, value) {
        return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
      },
      removeProp: function(name) {
        name = jQuery.propFix[name] || name;
        return this.each(function() {
          try {
            this[name] = undefined;
            delete this[name];
          } catch (e) {}
        });
      },
      addClass: function(value) {
        var classNames,
            i,
            l,
            elem,
            setClass,
            c,
            cl;
        if (jQuery.isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).addClass(value.call(this, j, this.className));
          });
        }
        if (value && typeof value === "string") {
          classNames = value.split(rspace);
          for (i = 0, l = this.length; i < l; i++) {
            elem = this[i];
            if (elem.nodeType === 1) {
              if (!elem.className && classNames.length === 1) {
                elem.className = value;
              } else {
                setClass = " " + elem.className + " ";
                for (c = 0, cl = classNames.length; c < cl; c++) {
                  if (!~setClass.indexOf(" " + classNames[c] + " ")) {
                    setClass += classNames[c] + " ";
                  }
                }
                elem.className = jQuery.trim(setClass);
              }
            }
          }
        }
        return this;
      },
      removeClass: function(value) {
        var classNames,
            i,
            l,
            elem,
            className,
            c,
            cl;
        if (jQuery.isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).removeClass(value.call(this, j, this.className));
          });
        }
        if ((value && typeof value === "string") || value === undefined) {
          classNames = (value || "").split(rspace);
          for (i = 0, l = this.length; i < l; i++) {
            elem = this[i];
            if (elem.nodeType === 1 && elem.className) {
              if (value) {
                className = (" " + elem.className + " ").replace(rclass, " ");
                for (c = 0, cl = classNames.length; c < cl; c++) {
                  className = className.replace(" " + classNames[c] + " ", " ");
                }
                elem.className = jQuery.trim(className);
              } else {
                elem.className = "";
              }
            }
          }
        }
        return this;
      },
      toggleClass: function(value, stateVal) {
        var type = typeof value,
            isBool = typeof stateVal === "boolean";
        if (jQuery.isFunction(value)) {
          return this.each(function(i) {
            jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
          });
        }
        return this.each(function() {
          if (type === "string") {
            var className,
                i = 0,
                self = jQuery(this),
                state = stateVal,
                classNames = value.split(rspace);
            while ((className = classNames[i++])) {
              state = isBool ? state : !self.hasClass(className);
              self[state ? "addClass" : "removeClass"](className);
            }
          } else if (type === "undefined" || type === "boolean") {
            if (this.className) {
              jQuery._data(this, "__className__", this.className);
            }
            this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
          }
        });
      },
      hasClass: function(selector) {
        var className = " " + selector + " ",
            i = 0,
            l = this.length;
        for (; i < l; i++) {
          if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
            return true;
          }
        }
        return false;
      },
      val: function(value) {
        var hooks,
            ret,
            isFunction,
            elem = this[0];
        if (!arguments.length) {
          if (elem) {
            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
              return ret;
            }
            ret = elem.value;
            return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
          }
          return;
        }
        isFunction = jQuery.isFunction(value);
        return this.each(function(i) {
          var self = jQuery(this),
              val;
          if (this.nodeType !== 1) {
            return;
          }
          if (isFunction) {
            val = value.call(this, i, self.val());
          } else {
            val = value;
          }
          if (val == null) {
            val = "";
          } else if (typeof val === "number") {
            val += "";
          } else if (jQuery.isArray(val)) {
            val = jQuery.map(val, function(value) {
              return value == null ? "" : value + "";
            });
          }
          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
            this.value = val;
          }
        });
      }
    });
    jQuery.extend({
      valHooks: {
        option: {get: function(elem) {
            var val = elem.attributes.value;
            return !val || val.specified ? elem.value : elem.text;
          }},
        select: {
          get: function(elem) {
            var value,
                i,
                max,
                option,
                index = elem.selectedIndex,
                values = [],
                options = elem.options,
                one = elem.type === "select-one";
            if (index < 0) {
              return null;
            }
            i = one ? index : 0;
            max = one ? index + 1 : options.length;
            for (; i < max; i++) {
              option = options[i];
              if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                value = jQuery(option).val();
                if (one) {
                  return value;
                }
                values.push(value);
              }
            }
            if (one && !values.length && options.length) {
              return jQuery(options[index]).val();
            }
            return values;
          },
          set: function(elem, value) {
            var values = jQuery.makeArray(value);
            jQuery(elem).find("option").each(function() {
              this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
            });
            if (!values.length) {
              elem.selectedIndex = -1;
            }
            return values;
          }
        }
      },
      attrFn: {
        val: true,
        css: true,
        html: true,
        text: true,
        data: true,
        width: true,
        height: true,
        offset: true
      },
      attr: function(elem, name, value, pass) {
        var ret,
            hooks,
            notxml,
            nType = elem.nodeType;
        if (!elem || nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (pass && name in jQuery.attrFn) {
          return jQuery(elem)[name](value);
        }
        if (typeof elem.getAttribute === "undefined") {
          return jQuery.prop(elem, name, value);
        }
        notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
        if (notxml) {
          name = name.toLowerCase();
          hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
        }
        if (value !== undefined) {
          if (value === null) {
            jQuery.removeAttr(elem, name);
            return;
          } else if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          } else {
            elem.setAttribute(name, "" + value);
            return value;
          }
        } else if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        } else {
          ret = elem.getAttribute(name);
          return ret === null ? undefined : ret;
        }
      },
      removeAttr: function(elem, value) {
        var propName,
            attrNames,
            name,
            l,
            isBool,
            i = 0;
        if (value && elem.nodeType === 1) {
          attrNames = value.toLowerCase().split(rspace);
          l = attrNames.length;
          for (; i < l; i++) {
            name = attrNames[i];
            if (name) {
              propName = jQuery.propFix[name] || name;
              isBool = rboolean.test(name);
              if (!isBool) {
                jQuery.attr(elem, name, "");
              }
              elem.removeAttribute(getSetAttribute ? name : propName);
              if (isBool && propName in elem) {
                elem[propName] = false;
              }
            }
          }
        }
      },
      attrHooks: {
        type: {set: function(elem, value) {
            if (rtype.test(elem.nodeName) && elem.parentNode) {
              jQuery.error("type property can't be changed");
            } else if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
              var val = elem.value;
              elem.setAttribute("type", value);
              if (val) {
                elem.value = val;
              }
              return value;
            }
          }},
        value: {
          get: function(elem, name) {
            if (nodeHook && jQuery.nodeName(elem, "button")) {
              return nodeHook.get(elem, name);
            }
            return name in elem ? elem.value : null;
          },
          set: function(elem, value, name) {
            if (nodeHook && jQuery.nodeName(elem, "button")) {
              return nodeHook.set(elem, value, name);
            }
            elem.value = value;
          }
        }
      },
      propFix: {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
      },
      prop: function(elem, name, value) {
        var ret,
            hooks,
            notxml,
            nType = elem.nodeType;
        if (!elem || nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
        if (notxml) {
          name = jQuery.propFix[name] || name;
          hooks = jQuery.propHooks[name];
        }
        if (value !== undefined) {
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          } else {
            return (elem[name] = value);
          }
        } else {
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          } else {
            return elem[name];
          }
        }
      },
      propHooks: {tabIndex: {get: function(elem) {
            var attributeNode = elem.getAttributeNode("tabindex");
            return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
          }}}
    });
    jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;
    boolHook = {
      get: function(elem, name) {
        var attrNode,
            property = jQuery.prop(elem, name);
        return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
      },
      set: function(elem, value, name) {
        var propName;
        if (value === false) {
          jQuery.removeAttr(elem, name);
        } else {
          propName = jQuery.propFix[name] || name;
          if (propName in elem) {
            elem[propName] = true;
          }
          elem.setAttribute(name, name.toLowerCase());
        }
        return name;
      }
    };
    if (!getSetAttribute) {
      fixSpecified = {
        name: true,
        id: true,
        coords: true
      };
      nodeHook = jQuery.valHooks.button = {
        get: function(elem, name) {
          var ret;
          ret = elem.getAttributeNode(name);
          return ret && (fixSpecified[name] ? ret.nodeValue !== "" : ret.specified) ? ret.nodeValue : undefined;
        },
        set: function(elem, value, name) {
          var ret = elem.getAttributeNode(name);
          if (!ret) {
            ret = document.createAttribute(name);
            elem.setAttributeNode(ret);
          }
          return (ret.nodeValue = value + "");
        }
      };
      jQuery.attrHooks.tabindex.set = nodeHook.set;
      jQuery.each(["width", "height"], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {set: function(elem, value) {
            if (value === "") {
              elem.setAttribute(name, "auto");
              return value;
            }
          }});
      });
      jQuery.attrHooks.contenteditable = {
        get: nodeHook.get,
        set: function(elem, value, name) {
          if (value === "") {
            value = "false";
          }
          nodeHook.set(elem, value, name);
        }
      };
    }
    if (!jQuery.support.hrefNormalized) {
      jQuery.each(["href", "src", "width", "height"], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {get: function(elem) {
            var ret = elem.getAttribute(name, 2);
            return ret === null ? undefined : ret;
          }});
      });
    }
    if (!jQuery.support.style) {
      jQuery.attrHooks.style = {
        get: function(elem) {
          return elem.style.cssText.toLowerCase() || undefined;
        },
        set: function(elem, value) {
          return (elem.style.cssText = "" + value);
        }
      };
    }
    if (!jQuery.support.optSelected) {
      jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {get: function(elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
          return null;
        }});
    }
    if (!jQuery.support.enctype) {
      jQuery.propFix.enctype = "encoding";
    }
    if (!jQuery.support.checkOn) {
      jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {get: function(elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
          }};
      });
    }
    jQuery.each(["radio", "checkbox"], function() {
      jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {set: function(elem, value) {
          if (jQuery.isArray(value)) {
            return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
          }
        }});
    });
    var rformElems = /^(?:textarea|input|select)$/i,
        rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
        rhoverHack = /(?:^|\s)hover(\.\S+)?\b/,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        quickParse = function(selector) {
          var quick = rquickIs.exec(selector);
          if (quick) {
            quick[1] = (quick[1] || "").toLowerCase();
            quick[3] = quick[3] && new RegExp("(?:^|\\s)" + quick[3] + "(?:\\s|$)");
          }
          return quick;
        },
        quickIs = function(elem, m) {
          var attrs = elem.attributes || {};
          return ((!m[1] || elem.nodeName.toLowerCase() === m[1]) && (!m[2] || (attrs.id || {}).value === m[2]) && (!m[3] || m[3].test((attrs["class"] || {}).value)));
        },
        hoverHack = function(events) {
          return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
        };
    jQuery.event = {
      add: function(elem, types, handler, data, selector) {
        var elemData,
            eventHandle,
            events,
            t,
            tns,
            type,
            namespaces,
            handleObj,
            handleObjIn,
            quick,
            handlers,
            special;
        if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
          return;
        }
        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        if (!handler.guid) {
          handler.guid = jQuery.guid++;
        }
        events = elemData.events;
        if (!events) {
          elemData.events = events = {};
        }
        eventHandle = elemData.handle;
        if (!eventHandle) {
          elemData.handle = eventHandle = function(e) {
            return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
          };
          eventHandle.elem = elem;
        }
        types = jQuery.trim(hoverHack(types)).split(" ");
        for (t = 0; t < types.length; t++) {
          tns = rtypenamespace.exec(types[t]) || [];
          type = tns[1];
          namespaces = (tns[2] || "").split(".").sort();
          special = jQuery.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          special = jQuery.event.special[type] || {};
          handleObj = jQuery.extend({
            type: type,
            origType: tns[1],
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            quick: selector && quickParse(selector),
            namespace: namespaces.join(".")
          }, handleObjIn);
          handlers = events[type];
          if (!handlers) {
            handlers = events[type] = [];
            handlers.delegateCount = 0;
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
              if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle, false);
              } else if (elem.attachEvent) {
                elem.attachEvent("on" + type, eventHandle);
              }
            }
          }
          if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }
          jQuery.event.global[type] = true;
        }
        elem = null;
      },
      global: {},
      remove: function(elem, types, handler, selector, mappedTypes) {
        var elemData = jQuery.hasData(elem) && jQuery._data(elem),
            t,
            tns,
            type,
            origType,
            namespaces,
            origCount,
            j,
            events,
            special,
            handle,
            eventType,
            handleObj;
        if (!elemData || !(events = elemData.events)) {
          return;
        }
        types = jQuery.trim(hoverHack(types || "")).split(" ");
        for (t = 0; t < types.length; t++) {
          tns = rtypenamespace.exec(types[t]) || [];
          type = origType = tns[1];
          namespaces = tns[2];
          if (!type) {
            for (type in events) {
              jQuery.event.remove(elem, type + types[t], handler, selector, true);
            }
            continue;
          }
          special = jQuery.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          eventType = events[type] || [];
          origCount = eventType.length;
          namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
          for (j = 0; j < eventType.length; j++) {
            handleObj = eventType[j];
            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
              eventType.splice(j--, 1);
              if (handleObj.selector) {
                eventType.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }
          if (eventType.length === 0 && origCount !== eventType.length) {
            if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
              jQuery.removeEvent(elem, type, elemData.handle);
            }
            delete events[type];
          }
        }
        if (jQuery.isEmptyObject(events)) {
          handle = elemData.handle;
          if (handle) {
            handle.elem = null;
          }
          jQuery.removeData(elem, ["events", "handle"], true);
        }
      },
      customEvent: {
        "getData": true,
        "setData": true,
        "changeData": true
      },
      trigger: function(event, data, elem, onlyHandlers) {
        if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
          return;
        }
        var type = event.type || event,
            namespaces = [],
            cache,
            exclusive,
            i,
            cur,
            old,
            ontype,
            special,
            handle,
            eventPath,
            bubbleType;
        if (rfocusMorph.test(type + jQuery.event.triggered)) {
          return;
        }
        if (type.indexOf("!") >= 0) {
          type = type.slice(0, -1);
          exclusive = true;
        }
        if (type.indexOf(".") >= 0) {
          namespaces = type.split(".");
          type = namespaces.shift();
          namespaces.sort();
        }
        if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
          return;
        }
        event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
        event.type = type;
        event.isTrigger = true;
        event.exclusive = exclusive;
        event.namespace = namespaces.join(".");
        event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
        ontype = type.indexOf(":") < 0 ? "on" + type : "";
        if (!elem) {
          cache = jQuery.cache;
          for (i in cache) {
            if (cache[i].events && cache[i].events[type]) {
              jQuery.event.trigger(event, data, cache[i].handle.elem, true);
            }
          }
          return;
        }
        event.result = undefined;
        if (!event.target) {
          event.target = elem;
        }
        data = data != null ? jQuery.makeArray(data) : [];
        data.unshift(event);
        special = jQuery.event.special[type] || {};
        if (special.trigger && special.trigger.apply(elem, data) === false) {
          return;
        }
        eventPath = [[elem, special.bindType || type]];
        if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
          bubbleType = special.delegateType || type;
          cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
          old = null;
          for (; cur; cur = cur.parentNode) {
            eventPath.push([cur, bubbleType]);
            old = cur;
          }
          if (old && old === elem.ownerDocument) {
            eventPath.push([old.defaultView || old.parentWindow || window, bubbleType]);
          }
        }
        for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
          cur = eventPath[i][0];
          event.type = eventPath[i][1];
          handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
          if (handle) {
            handle.apply(cur, data);
          }
          handle = ontype && cur[ontype];
          if (handle && jQuery.acceptData(cur) && handle.apply(cur, data) === false) {
            event.preventDefault();
          }
        }
        event.type = type;
        if (!onlyHandlers && !event.isDefaultPrevented()) {
          if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
            if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
              old = elem[ontype];
              if (old) {
                elem[ontype] = null;
              }
              jQuery.event.triggered = type;
              elem[type]();
              jQuery.event.triggered = undefined;
              if (old) {
                elem[ontype] = old;
              }
            }
          }
        }
        return event.result;
      },
      dispatch: function(event) {
        event = jQuery.event.fix(event || window.event);
        var handlers = ((jQuery._data(this, "events") || {})[event.type] || []),
            delegateCount = handlers.delegateCount,
            args = [].slice.call(arguments, 0),
            run_all = !event.exclusive && !event.namespace,
            special = jQuery.event.special[event.type] || {},
            handlerQueue = [],
            i,
            j,
            cur,
            jqcur,
            ret,
            selMatch,
            matched,
            matches,
            handleObj,
            sel,
            related;
        args[0] = event;
        event.delegateTarget = this;
        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
          return;
        }
        if (delegateCount && !(event.button && event.type === "click")) {
          jqcur = jQuery(this);
          jqcur.context = this.ownerDocument || this;
          for (cur = event.target; cur != this; cur = cur.parentNode || this) {
            if (cur.disabled !== true) {
              selMatch = {};
              matches = [];
              jqcur[0] = cur;
              for (i = 0; i < delegateCount; i++) {
                handleObj = handlers[i];
                sel = handleObj.selector;
                if (selMatch[sel] === undefined) {
                  selMatch[sel] = (handleObj.quick ? quickIs(cur, handleObj.quick) : jqcur.is(sel));
                }
                if (selMatch[sel]) {
                  matches.push(handleObj);
                }
              }
              if (matches.length) {
                handlerQueue.push({
                  elem: cur,
                  matches: matches
                });
              }
            }
          }
        }
        if (handlers.length > delegateCount) {
          handlerQueue.push({
            elem: this,
            matches: handlers.slice(delegateCount)
          });
        }
        for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
          matched = handlerQueue[i];
          event.currentTarget = matched.elem;
          for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
            handleObj = matched.matches[j];
            if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
              event.data = handleObj.data;
              event.handleObj = handleObj;
              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (ret !== undefined) {
                event.result = ret;
                if (ret === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }
        if (special.postDispatch) {
          special.postDispatch.call(this, event);
        }
        return event.result;
      },
      props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function(event, original) {
          if (event.which == null) {
            event.which = original.charCode != null ? original.charCode : original.keyCode;
          }
          return event;
        }
      },
      mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function(event, original) {
          var eventDoc,
              doc,
              body,
              button = original.button,
              fromElement = original.fromElement;
          if (event.pageX == null && original.clientX != null) {
            eventDoc = event.target.ownerDocument || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;
            event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
          }
          if (!event.relatedTarget && fromElement) {
            event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
          }
          if (!event.which && button !== undefined) {
            event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
          }
          return event;
        }
      },
      fix: function(event) {
        if (event[jQuery.expando]) {
          return event;
        }
        var i,
            prop,
            originalEvent = event,
            fixHook = jQuery.event.fixHooks[event.type] || {},
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
        event = jQuery.Event(originalEvent);
        for (i = copy.length; i; ) {
          prop = copy[--i];
          event[prop] = originalEvent[prop];
        }
        if (!event.target) {
          event.target = originalEvent.srcElement || document;
        }
        if (event.target.nodeType === 3) {
          event.target = event.target.parentNode;
        }
        if (event.metaKey === undefined) {
          event.metaKey = event.ctrlKey;
        }
        return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
      },
      special: {
        ready: {setup: jQuery.bindReady},
        load: {noBubble: true},
        focus: {delegateType: "focusin"},
        blur: {delegateType: "focusout"},
        beforeunload: {
          setup: function(data, namespaces, eventHandle) {
            if (jQuery.isWindow(this)) {
              this.onbeforeunload = eventHandle;
            }
          },
          teardown: function(namespaces, eventHandle) {
            if (this.onbeforeunload === eventHandle) {
              this.onbeforeunload = null;
            }
          }
        }
      },
      simulate: function(type, elem, event, bubble) {
        var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: true,
          originalEvent: {}
        });
        if (bubble) {
          jQuery.event.trigger(e, null, elem);
        } else {
          jQuery.event.dispatch.call(elem, e);
        }
        if (e.isDefaultPrevented()) {
          event.preventDefault();
        }
      }
    };
    jQuery.event.handle = jQuery.event.dispatch;
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handle, false);
      }
    } : function(elem, type, handle) {
      if (elem.detachEvent) {
        elem.detachEvent("on" + type, handle);
      }
    };
    jQuery.Event = function(src, props) {
      if (!(this instanceof jQuery.Event)) {
        return new jQuery.Event(src, props);
      }
      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;
        this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
      } else {
        this.type = src;
      }
      if (props) {
        jQuery.extend(this, props);
      }
      this.timeStamp = src && src.timeStamp || jQuery.now();
      this[jQuery.expando] = true;
    };
    function returnFalse() {
      return false;
    }
    function returnTrue() {
      return true;
    }
    jQuery.Event.prototype = {
      preventDefault: function() {
        this.isDefaultPrevented = returnTrue;
        var e = this.originalEvent;
        if (!e) {
          return;
        }
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      },
      stopPropagation: function() {
        this.isPropagationStopped = returnTrue;
        var e = this.originalEvent;
        if (!e) {
          return;
        }
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        e.cancelBubble = true;
      },
      stopImmediatePropagation: function() {
        this.isImmediatePropagationStopped = returnTrue;
        this.stopPropagation();
      },
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse
    };
    jQuery.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    }, function(orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function(event) {
          var target = this,
              related = event.relatedTarget,
              handleObj = event.handleObj,
              selector = handleObj.selector,
              ret;
          if (!related || (related !== target && !jQuery.contains(target, related))) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    });
    if (!jQuery.support.submitBubbles) {
      jQuery.event.special.submit = {
        setup: function() {
          if (jQuery.nodeName(this, "form")) {
            return false;
          }
          jQuery.event.add(this, "click._submit keypress._submit", function(e) {
            var elem = e.target,
                form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
            if (form && !form._submit_attached) {
              jQuery.event.add(form, "submit._submit", function(event) {
                event._submit_bubble = true;
              });
              form._submit_attached = true;
            }
          });
        },
        postDispatch: function(event) {
          if (event._submit_bubble) {
            delete event._submit_bubble;
            if (this.parentNode && !event.isTrigger) {
              jQuery.event.simulate("submit", this.parentNode, event, true);
            }
          }
        },
        teardown: function() {
          if (jQuery.nodeName(this, "form")) {
            return false;
          }
          jQuery.event.remove(this, "._submit");
        }
      };
    }
    if (!jQuery.support.changeBubbles) {
      jQuery.event.special.change = {
        setup: function() {
          if (rformElems.test(this.nodeName)) {
            if (this.type === "checkbox" || this.type === "radio") {
              jQuery.event.add(this, "propertychange._change", function(event) {
                if (event.originalEvent.propertyName === "checked") {
                  this._just_changed = true;
                }
              });
              jQuery.event.add(this, "click._change", function(event) {
                if (this._just_changed && !event.isTrigger) {
                  this._just_changed = false;
                  jQuery.event.simulate("change", this, event, true);
                }
              });
            }
            return false;
          }
          jQuery.event.add(this, "beforeactivate._change", function(e) {
            var elem = e.target;
            if (rformElems.test(elem.nodeName) && !elem._change_attached) {
              jQuery.event.add(elem, "change._change", function(event) {
                if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                  jQuery.event.simulate("change", this.parentNode, event, true);
                }
              });
              elem._change_attached = true;
            }
          });
        },
        handle: function(event) {
          var elem = event.target;
          if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
            return event.handleObj.handler.apply(this, arguments);
          }
        },
        teardown: function() {
          jQuery.event.remove(this, "._change");
          return rformElems.test(this.nodeName);
        }
      };
    }
    if (!jQuery.support.focusinBubbles) {
      jQuery.each({
        focus: "focusin",
        blur: "focusout"
      }, function(orig, fix) {
        var attaches = 0,
            handler = function(event) {
              jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };
        jQuery.event.special[fix] = {
          setup: function() {
            if (attaches++ === 0) {
              document.addEventListener(orig, handler, true);
            }
          },
          teardown: function() {
            if (--attaches === 0) {
              document.removeEventListener(orig, handler, true);
            }
          }
        };
      });
    }
    jQuery.fn.extend({
      on: function(types, selector, data, fn, one) {
        var origFn,
            type;
        if (typeof types === "object") {
          if (typeof selector !== "string") {
            data = data || selector;
            selector = undefined;
          }
          for (type in types) {
            this.on(type, selector, data, types[type], one);
          }
          return this;
        }
        if (data == null && fn == null) {
          fn = selector;
          data = selector = undefined;
        } else if (fn == null) {
          if (typeof selector === "string") {
            fn = data;
            data = undefined;
          } else {
            fn = data;
            data = selector;
            selector = undefined;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return this;
        }
        if (one === 1) {
          origFn = fn;
          fn = function(event) {
            jQuery().off(event);
            return origFn.apply(this, arguments);
          };
          fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return this.each(function() {
          jQuery.event.add(this, types, fn, data, selector);
        });
      },
      one: function(types, selector, data, fn) {
        return this.on(types, selector, data, fn, 1);
      },
      off: function(types, selector, fn) {
        if (types && types.preventDefault && types.handleObj) {
          var handleObj = types.handleObj;
          jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
          return this;
        }
        if (typeof types === "object") {
          for (var type in types) {
            this.off(type, selector, types[type]);
          }
          return this;
        }
        if (selector === false || typeof selector === "function") {
          fn = selector;
          selector = undefined;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function() {
          jQuery.event.remove(this, types, fn, selector);
        });
      },
      bind: function(types, data, fn) {
        return this.on(types, null, data, fn);
      },
      unbind: function(types, fn) {
        return this.off(types, null, fn);
      },
      live: function(types, data, fn) {
        jQuery(this.context).on(types, this.selector, data, fn);
        return this;
      },
      die: function(types, fn) {
        jQuery(this.context).off(types, this.selector || "**", fn);
        return this;
      },
      delegate: function(selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      },
      undelegate: function(selector, types, fn) {
        return arguments.length == 1 ? this.off(selector, "**") : this.off(types, selector, fn);
      },
      trigger: function(type, data) {
        return this.each(function() {
          jQuery.event.trigger(type, data, this);
        });
      },
      triggerHandler: function(type, data) {
        if (this[0]) {
          return jQuery.event.trigger(type, data, this[0], true);
        }
      },
      toggle: function(fn) {
        var args = arguments,
            guid = fn.guid || jQuery.guid++,
            i = 0,
            toggler = function(event) {
              var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
              jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
              event.preventDefault();
              return args[lastToggle].apply(this, arguments) || false;
            };
        toggler.guid = guid;
        while (i < args.length) {
          args[i++].guid = guid;
        }
        return this.click(toggler);
      },
      hover: function(fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
      }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
      jQuery.fn[name] = function(data, fn) {
        if (fn == null) {
          fn = data;
          data = null;
        }
        return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
      };
      if (jQuery.attrFn) {
        jQuery.attrFn[name] = true;
      }
      if (rkeyEvent.test(name)) {
        jQuery.event.fixHooks[name] = jQuery.event.keyHooks;
      }
      if (rmouseEvent.test(name)) {
        jQuery.event.fixHooks[name] = jQuery.event.mouseHooks;
      }
    });
    (function() {
      var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
          expando = "sizcache" + (Math.random() + '').replace('.', ''),
          done = 0,
          toString = Object.prototype.toString,
          hasDuplicate = false,
          baseHasDuplicate = true,
          rBackslash = /\\/g,
          rReturn = /\r\n/g,
          rNonWord = /\W/;
      [0, 0].sort(function() {
        baseHasDuplicate = false;
        return 0;
      });
      var Sizzle = function(selector, context, results, seed) {
        results = results || [];
        context = context || document;
        var origContext = context;
        if (context.nodeType !== 1 && context.nodeType !== 9) {
          return [];
        }
        if (!selector || typeof selector !== "string") {
          return results;
        }
        var m,
            set,
            checkSet,
            extra,
            ret,
            cur,
            pop,
            i,
            prune = true,
            contextXML = Sizzle.isXML(context),
            parts = [],
            soFar = selector;
        do {
          chunker.exec("");
          m = chunker.exec(soFar);
          if (m) {
            soFar = m[3];
            parts.push(m[1]);
            if (m[2]) {
              extra = m[3];
              break;
            }
          }
        } while (m);
        if (parts.length > 1 && origPOS.exec(selector)) {
          if (parts.length === 2 && Expr.relative[parts[0]]) {
            set = posProcess(parts[0] + parts[1], context, seed);
          } else {
            set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
            while (parts.length) {
              selector = parts.shift();
              if (Expr.relative[selector]) {
                selector += parts.shift();
              }
              set = posProcess(selector, set, seed);
            }
          }
        } else {
          if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
            ret = Sizzle.find(parts.shift(), context, contextXML);
            context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
          }
          if (context) {
            ret = seed ? {
              expr: parts.pop(),
              set: makeArray(seed)
            } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
            set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
            if (parts.length > 0) {
              checkSet = makeArray(set);
            } else {
              prune = false;
            }
            while (parts.length) {
              cur = parts.pop();
              pop = cur;
              if (!Expr.relative[cur]) {
                cur = "";
              } else {
                pop = parts.pop();
              }
              if (pop == null) {
                pop = context;
              }
              Expr.relative[cur](checkSet, pop, contextXML);
            }
          } else {
            checkSet = parts = [];
          }
        }
        if (!checkSet) {
          checkSet = set;
        }
        if (!checkSet) {
          Sizzle.error(cur || selector);
        }
        if (toString.call(checkSet) === "[object Array]") {
          if (!prune) {
            results.push.apply(results, checkSet);
          } else if (context && context.nodeType === 1) {
            for (i = 0; checkSet[i] != null; i++) {
              if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                results.push(set[i]);
              }
            }
          } else {
            for (i = 0; checkSet[i] != null; i++) {
              if (checkSet[i] && checkSet[i].nodeType === 1) {
                results.push(set[i]);
              }
            }
          }
        } else {
          makeArray(checkSet, results);
        }
        if (extra) {
          Sizzle(extra, origContext, results, seed);
          Sizzle.uniqueSort(results);
        }
        return results;
      };
      Sizzle.uniqueSort = function(results) {
        if (sortOrder) {
          hasDuplicate = baseHasDuplicate;
          results.sort(sortOrder);
          if (hasDuplicate) {
            for (var i = 1; i < results.length; i++) {
              if (results[i] === results[i - 1]) {
                results.splice(i--, 1);
              }
            }
          }
        }
        return results;
      };
      Sizzle.matches = function(expr, set) {
        return Sizzle(expr, null, null, set);
      };
      Sizzle.matchesSelector = function(node, expr) {
        return Sizzle(expr, null, null, [node]).length > 0;
      };
      Sizzle.find = function(expr, context, isXML) {
        var set,
            i,
            len,
            match,
            type,
            left;
        if (!expr) {
          return [];
        }
        for (i = 0, len = Expr.order.length; i < len; i++) {
          type = Expr.order[i];
          if ((match = Expr.leftMatch[type].exec(expr))) {
            left = match[1];
            match.splice(1, 1);
            if (left.substr(left.length - 1) !== "\\") {
              match[1] = (match[1] || "").replace(rBackslash, "");
              set = Expr.find[type](match, context, isXML);
              if (set != null) {
                expr = expr.replace(Expr.match[type], "");
                break;
              }
            }
          }
        }
        if (!set) {
          set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
        }
        return {
          set: set,
          expr: expr
        };
      };
      Sizzle.filter = function(expr, set, inplace, not) {
        var match,
            anyFound,
            type,
            found,
            item,
            filter,
            left,
            i,
            pass,
            old = expr,
            result = [],
            curLoop = set,
            isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
        while (expr && set.length) {
          for (type in Expr.filter) {
            if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
              filter = Expr.filter[type];
              left = match[1];
              anyFound = false;
              match.splice(1, 1);
              if (left.substr(left.length - 1) === "\\") {
                continue;
              }
              if (curLoop === result) {
                result = [];
              }
              if (Expr.preFilter[type]) {
                match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                if (!match) {
                  anyFound = found = true;
                } else if (match === true) {
                  continue;
                }
              }
              if (match) {
                for (i = 0; (item = curLoop[i]) != null; i++) {
                  if (item) {
                    found = filter(item, match, i, curLoop);
                    pass = not ^ found;
                    if (inplace && found != null) {
                      if (pass) {
                        anyFound = true;
                      } else {
                        curLoop[i] = false;
                      }
                    } else if (pass) {
                      result.push(item);
                      anyFound = true;
                    }
                  }
                }
              }
              if (found !== undefined) {
                if (!inplace) {
                  curLoop = result;
                }
                expr = expr.replace(Expr.match[type], "");
                if (!anyFound) {
                  return [];
                }
                break;
              }
            }
          }
          if (expr === old) {
            if (anyFound == null) {
              Sizzle.error(expr);
            } else {
              break;
            }
          }
          old = expr;
        }
        return curLoop;
      };
      Sizzle.error = function(msg) {
        throw new Error("Syntax error, unrecognized expression: " + msg);
      };
      var getText = Sizzle.getText = function(elem) {
        var i,
            node,
            nodeType = elem.nodeType,
            ret = "";
        if (nodeType) {
          if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === 'string') {
              return elem.textContent;
            } else if (typeof elem.innerText === 'string') {
              return elem.innerText.replace(rReturn, '');
            } else {
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                ret += getText(elem);
              }
            }
          } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
          }
        } else {
          for (i = 0; (node = elem[i]); i++) {
            if (node.nodeType !== 8) {
              ret += getText(node);
            }
          }
        }
        return ret;
      };
      var Expr = Sizzle.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
          ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
          CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
          NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
          ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
          TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
          CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
          POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
          PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
          "class": "className",
          "for": "htmlFor"
        },
        attrHandle: {
          href: function(elem) {
            return elem.getAttribute("href");
          },
          type: function(elem) {
            return elem.getAttribute("type");
          }
        },
        relative: {
          "+": function(checkSet, part) {
            var isPartStr = typeof part === "string",
                isTag = isPartStr && !rNonWord.test(part),
                isPartStrNotTag = isPartStr && !isTag;
            if (isTag) {
              part = part.toLowerCase();
            }
            for (var i = 0,
                l = checkSet.length,
                elem; i < l; i++) {
              if ((elem = checkSet[i])) {
                while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
                checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
              }
            }
            if (isPartStrNotTag) {
              Sizzle.filter(part, checkSet, true);
            }
          },
          ">": function(checkSet, part) {
            var elem,
                isPartStr = typeof part === "string",
                i = 0,
                l = checkSet.length;
            if (isPartStr && !rNonWord.test(part)) {
              part = part.toLowerCase();
              for (; i < l; i++) {
                elem = checkSet[i];
                if (elem) {
                  var parent = elem.parentNode;
                  checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                }
              }
            } else {
              for (; i < l; i++) {
                elem = checkSet[i];
                if (elem) {
                  checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                }
              }
              if (isPartStr) {
                Sizzle.filter(part, checkSet, true);
              }
            }
          },
          "": function(checkSet, part, isXML) {
            var nodeCheck,
                doneName = done++,
                checkFn = dirCheck;
            if (typeof part === "string" && !rNonWord.test(part)) {
              part = part.toLowerCase();
              nodeCheck = part;
              checkFn = dirNodeCheck;
            }
            checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
          },
          "~": function(checkSet, part, isXML) {
            var nodeCheck,
                doneName = done++,
                checkFn = dirCheck;
            if (typeof part === "string" && !rNonWord.test(part)) {
              part = part.toLowerCase();
              nodeCheck = part;
              checkFn = dirNodeCheck;
            }
            checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
          }
        },
        find: {
          ID: function(match, context, isXML) {
            if (typeof context.getElementById !== "undefined" && !isXML) {
              var m = context.getElementById(match[1]);
              return m && m.parentNode ? [m] : [];
            }
          },
          NAME: function(match, context) {
            if (typeof context.getElementsByName !== "undefined") {
              var ret = [],
                  results = context.getElementsByName(match[1]);
              for (var i = 0,
                  l = results.length; i < l; i++) {
                if (results[i].getAttribute("name") === match[1]) {
                  ret.push(results[i]);
                }
              }
              return ret.length === 0 ? null : ret;
            }
          },
          TAG: function(match, context) {
            if (typeof context.getElementsByTagName !== "undefined") {
              return context.getElementsByTagName(match[1]);
            }
          }
        },
        preFilter: {
          CLASS: function(match, curLoop, inplace, result, not, isXML) {
            match = " " + match[1].replace(rBackslash, "") + " ";
            if (isXML) {
              return match;
            }
            for (var i = 0,
                elem; (elem = curLoop[i]) != null; i++) {
              if (elem) {
                if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
                  if (!inplace) {
                    result.push(elem);
                  }
                } else if (inplace) {
                  curLoop[i] = false;
                }
              }
            }
            return false;
          },
          ID: function(match) {
            return match[1].replace(rBackslash, "");
          },
          TAG: function(match, curLoop) {
            return match[1].replace(rBackslash, "").toLowerCase();
          },
          CHILD: function(match) {
            if (match[1] === "nth") {
              if (!match[2]) {
                Sizzle.error(match[0]);
              }
              match[2] = match[2].replace(/^\+|\s*/g, '');
              var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
              match[2] = (test[1] + (test[2] || 1)) - 0;
              match[3] = test[3] - 0;
            } else if (match[2]) {
              Sizzle.error(match[0]);
            }
            match[0] = done++;
            return match;
          },
          ATTR: function(match, curLoop, inplace, result, not, isXML) {
            var name = match[1] = match[1].replace(rBackslash, "");
            if (!isXML && Expr.attrMap[name]) {
              match[1] = Expr.attrMap[name];
            }
            match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
            if (match[2] === "~=") {
              match[4] = " " + match[4] + " ";
            }
            return match;
          },
          PSEUDO: function(match, curLoop, inplace, result, not) {
            if (match[1] === "not") {
              if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                match[3] = Sizzle(match[3], null, null, curLoop);
              } else {
                var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                if (!inplace) {
                  result.push.apply(result, ret);
                }
                return false;
              }
            } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
              return true;
            }
            return match;
          },
          POS: function(match) {
            match.unshift(true);
            return match;
          }
        },
        filters: {
          enabled: function(elem) {
            return elem.disabled === false && elem.type !== "hidden";
          },
          disabled: function(elem) {
            return elem.disabled === true;
          },
          checked: function(elem) {
            return elem.checked === true;
          },
          selected: function(elem) {
            if (elem.parentNode) {
              elem.parentNode.selectedIndex;
            }
            return elem.selected === true;
          },
          parent: function(elem) {
            return !!elem.firstChild;
          },
          empty: function(elem) {
            return !elem.firstChild;
          },
          has: function(elem, i, match) {
            return !!Sizzle(match[3], elem).length;
          },
          header: function(elem) {
            return (/h\d/i).test(elem.nodeName);
          },
          text: function(elem) {
            var attr = elem.getAttribute("type"),
                type = elem.type;
            return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === type || attr === null);
          },
          radio: function(elem) {
            return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
          },
          checkbox: function(elem) {
            return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
          },
          file: function(elem) {
            return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
          },
          password: function(elem) {
            return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
          },
          submit: function(elem) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && "submit" === elem.type;
          },
          image: function(elem) {
            return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
          },
          reset: function(elem) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && "reset" === elem.type;
          },
          button: function(elem) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && "button" === elem.type || name === "button";
          },
          input: function(elem) {
            return (/input|select|textarea|button/i).test(elem.nodeName);
          },
          focus: function(elem) {
            return elem === elem.ownerDocument.activeElement;
          }
        },
        setFilters: {
          first: function(elem, i) {
            return i === 0;
          },
          last: function(elem, i, match, array) {
            return i === array.length - 1;
          },
          even: function(elem, i) {
            return i % 2 === 0;
          },
          odd: function(elem, i) {
            return i % 2 === 1;
          },
          lt: function(elem, i, match) {
            return i < match[3] - 0;
          },
          gt: function(elem, i, match) {
            return i > match[3] - 0;
          },
          nth: function(elem, i, match) {
            return match[3] - 0 === i;
          },
          eq: function(elem, i, match) {
            return match[3] - 0 === i;
          }
        },
        filter: {
          PSEUDO: function(elem, match, i, array) {
            var name = match[1],
                filter = Expr.filters[name];
            if (filter) {
              return filter(elem, i, match, array);
            } else if (name === "contains") {
              return (elem.textContent || elem.innerText || getText([elem]) || "").indexOf(match[3]) >= 0;
            } else if (name === "not") {
              var not = match[3];
              for (var j = 0,
                  l = not.length; j < l; j++) {
                if (not[j] === elem) {
                  return false;
                }
              }
              return true;
            } else {
              Sizzle.error(name);
            }
          },
          CHILD: function(elem, match) {
            var first,
                last,
                doneName,
                parent,
                cache,
                count,
                diff,
                type = match[1],
                node = elem;
            switch (type) {
              case "only":
              case "first":
                while ((node = node.previousSibling)) {
                  if (node.nodeType === 1) {
                    return false;
                  }
                }
                if (type === "first") {
                  return true;
                }
                node = elem;
              case "last":
                while ((node = node.nextSibling)) {
                  if (node.nodeType === 1) {
                    return false;
                  }
                }
                return true;
              case "nth":
                first = match[2];
                last = match[3];
                if (first === 1 && last === 0) {
                  return true;
                }
                doneName = match[0];
                parent = elem.parentNode;
                if (parent && (parent[expando] !== doneName || !elem.nodeIndex)) {
                  count = 0;
                  for (node = parent.firstChild; node; node = node.nextSibling) {
                    if (node.nodeType === 1) {
                      node.nodeIndex = ++count;
                    }
                  }
                  parent[expando] = doneName;
                }
                diff = elem.nodeIndex - last;
                if (first === 0) {
                  return diff === 0;
                } else {
                  return (diff % first === 0 && diff / first >= 0);
                }
            }
          },
          ID: function(elem, match) {
            return elem.nodeType === 1 && elem.getAttribute("id") === match;
          },
          TAG: function(elem, match) {
            return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
          },
          CLASS: function(elem, match) {
            return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
          },
          ATTR: function(elem, match) {
            var name = match[1],
                result = Sizzle.attr ? Sizzle.attr(elem, name) : Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
                value = result + "",
                type = match[2],
                check = match[4];
            return result == null ? type === "!=" : !type && Sizzle.attr ? result != null : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
          },
          POS: function(elem, match, i, array) {
            var name = match[2],
                filter = Expr.setFilters[name];
            if (filter) {
              return filter(elem, i, match, array);
            }
          }
        }
      };
      var origPOS = Expr.match.POS,
          fescape = function(all, num) {
            return "\\" + (num - 0 + 1);
          };
      for (var type in Expr.match) {
        Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
        Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
      }
      Expr.match.globalPOS = origPOS;
      var makeArray = function(array, results) {
        array = Array.prototype.slice.call(array, 0);
        if (results) {
          results.push.apply(results, array);
          return results;
        }
        return array;
      };
      try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
      } catch (e) {
        makeArray = function(array, results) {
          var i = 0,
              ret = results || [];
          if (toString.call(array) === "[object Array]") {
            Array.prototype.push.apply(ret, array);
          } else {
            if (typeof array.length === "number") {
              for (var l = array.length; i < l; i++) {
                ret.push(array[i]);
              }
            } else {
              for (; array[i]; i++) {
                ret.push(array[i]);
              }
            }
          }
          return ret;
        };
      }
      var sortOrder,
          siblingCheck;
      if (document.documentElement.compareDocumentPosition) {
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }
          if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
            return a.compareDocumentPosition ? -1 : 1;
          }
          return a.compareDocumentPosition(b) & 4 ? -1 : 1;
        };
      } else {
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
            return 0;
          } else if (a.sourceIndex && b.sourceIndex) {
            return a.sourceIndex - b.sourceIndex;
          }
          var al,
              bl,
              ap = [],
              bp = [],
              aup = a.parentNode,
              bup = b.parentNode,
              cur = aup;
          if (aup === bup) {
            return siblingCheck(a, b);
          } else if (!aup) {
            return -1;
          } else if (!bup) {
            return 1;
          }
          while (cur) {
            ap.unshift(cur);
            cur = cur.parentNode;
          }
          cur = bup;
          while (cur) {
            bp.unshift(cur);
            cur = cur.parentNode;
          }
          al = ap.length;
          bl = bp.length;
          for (var i = 0; i < al && i < bl; i++) {
            if (ap[i] !== bp[i]) {
              return siblingCheck(ap[i], bp[i]);
            }
          }
          return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
        };
        siblingCheck = function(a, b, ret) {
          if (a === b) {
            return ret;
          }
          var cur = a.nextSibling;
          while (cur) {
            if (cur === b) {
              return -1;
            }
            cur = cur.nextSibling;
          }
          return 1;
        };
      }
      (function() {
        var form = document.createElement("div"),
            id = "script" + (new Date()).getTime(),
            root = document.documentElement;
        form.innerHTML = "<a name='" + id + "'/>";
        root.insertBefore(form, root.firstChild);
        if (document.getElementById(id)) {
          Expr.find.ID = function(match, context, isXML) {
            if (typeof context.getElementById !== "undefined" && !isXML) {
              var m = context.getElementById(match[1]);
              return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
            }
          };
          Expr.filter.ID = function(elem, match) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return elem.nodeType === 1 && node && node.nodeValue === match;
          };
        }
        root.removeChild(form);
        root = form = null;
      })();
      (function() {
        var div = document.createElement("div");
        div.appendChild(document.createComment(""));
        if (div.getElementsByTagName("*").length > 0) {
          Expr.find.TAG = function(match, context) {
            var results = context.getElementsByTagName(match[1]);
            if (match[1] === "*") {
              var tmp = [];
              for (var i = 0; results[i]; i++) {
                if (results[i].nodeType === 1) {
                  tmp.push(results[i]);
                }
              }
              results = tmp;
            }
            return results;
          };
        }
        div.innerHTML = "<a href='#'></a>";
        if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
          Expr.attrHandle.href = function(elem) {
            return elem.getAttribute("href", 2);
          };
        }
        div = null;
      })();
      if (document.querySelectorAll) {
        (function() {
          var oldSizzle = Sizzle,
              div = document.createElement("div"),
              id = "__sizzle__";
          div.innerHTML = "<p class='TEST'></p>";
          if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
            return;
          }
          Sizzle = function(query, context, extra, seed) {
            context = context || document;
            if (!seed && !Sizzle.isXML(context)) {
              var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
              if (match && (context.nodeType === 1 || context.nodeType === 9)) {
                if (match[1]) {
                  return makeArray(context.getElementsByTagName(query), extra);
                } else if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                  return makeArray(context.getElementsByClassName(match[2]), extra);
                }
              }
              if (context.nodeType === 9) {
                if (query === "body" && context.body) {
                  return makeArray([context.body], extra);
                } else if (match && match[3]) {
                  var elem = context.getElementById(match[3]);
                  if (elem && elem.parentNode) {
                    if (elem.id === match[3]) {
                      return makeArray([elem], extra);
                    }
                  } else {
                    return makeArray([], extra);
                  }
                }
                try {
                  return makeArray(context.querySelectorAll(query), extra);
                } catch (qsaError) {}
              } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                var oldContext = context,
                    old = context.getAttribute("id"),
                    nid = old || id,
                    hasParent = context.parentNode,
                    relativeHierarchySelector = /^\s*[+~]/.test(query);
                if (!old) {
                  context.setAttribute("id", nid);
                } else {
                  nid = nid.replace(/'/g, "\\$&");
                }
                if (relativeHierarchySelector && hasParent) {
                  context = context.parentNode;
                }
                try {
                  if (!relativeHierarchySelector || hasParent) {
                    return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
                  }
                } catch (pseudoError) {} finally {
                  if (!old) {
                    oldContext.removeAttribute("id");
                  }
                }
              }
            }
            return oldSizzle(query, context, extra, seed);
          };
          for (var prop in oldSizzle) {
            Sizzle[prop] = oldSizzle[prop];
          }
          div = null;
        })();
      }
      (function() {
        var html = document.documentElement,
            matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
        if (matches) {
          var disconnectedMatch = !matches.call(document.createElement("div"), "div"),
              pseudoWorks = false;
          try {
            matches.call(document.documentElement, "[test!='']:sizzle");
          } catch (pseudoError) {
            pseudoWorks = true;
          }
          Sizzle.matchesSelector = function(node, expr) {
            expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
            if (!Sizzle.isXML(node)) {
              try {
                if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                  var ret = matches.call(node, expr);
                  if (ret || !disconnectedMatch || node.document && node.document.nodeType !== 11) {
                    return ret;
                  }
                }
              } catch (e) {}
            }
            return Sizzle(expr, null, null, [node]).length > 0;
          };
        }
      })();
      (function() {
        var div = document.createElement("div");
        div.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
          return;
        }
        div.lastChild.className = "e";
        if (div.getElementsByClassName("e").length === 1) {
          return;
        }
        Expr.order.splice(1, 0, "CLASS");
        Expr.find.CLASS = function(match, context, isXML) {
          if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
            return context.getElementsByClassName(match[1]);
          }
        };
        div = null;
      })();
      function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
        for (var i = 0,
            l = checkSet.length; i < l; i++) {
          var elem = checkSet[i];
          if (elem) {
            var match = false;
            elem = elem[dir];
            while (elem) {
              if (elem[expando] === doneName) {
                match = checkSet[elem.sizset];
                break;
              }
              if (elem.nodeType === 1 && !isXML) {
                elem[expando] = doneName;
                elem.sizset = i;
              }
              if (elem.nodeName.toLowerCase() === cur) {
                match = elem;
                break;
              }
              elem = elem[dir];
            }
            checkSet[i] = match;
          }
        }
      }
      function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
        for (var i = 0,
            l = checkSet.length; i < l; i++) {
          var elem = checkSet[i];
          if (elem) {
            var match = false;
            elem = elem[dir];
            while (elem) {
              if (elem[expando] === doneName) {
                match = checkSet[elem.sizset];
                break;
              }
              if (elem.nodeType === 1) {
                if (!isXML) {
                  elem[expando] = doneName;
                  elem.sizset = i;
                }
                if (typeof cur !== "string") {
                  if (elem === cur) {
                    match = true;
                    break;
                  }
                } else if (Sizzle.filter(cur, [elem]).length > 0) {
                  match = elem;
                  break;
                }
              }
              elem = elem[dir];
            }
            checkSet[i] = match;
          }
        }
      }
      if (document.documentElement.contains) {
        Sizzle.contains = function(a, b) {
          return a !== b && (a.contains ? a.contains(b) : true);
        };
      } else if (document.documentElement.compareDocumentPosition) {
        Sizzle.contains = function(a, b) {
          return !!(a.compareDocumentPosition(b) & 16);
        };
      } else {
        Sizzle.contains = function() {
          return false;
        };
      }
      Sizzle.isXML = function(elem) {
        var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
        return documentElement ? documentElement.nodeName !== "HTML" : false;
      };
      var posProcess = function(selector, context, seed) {
        var match,
            tmpSet = [],
            later = "",
            root = context.nodeType ? [context] : context;
        while ((match = Expr.match.PSEUDO.exec(selector))) {
          later += match[0];
          selector = selector.replace(Expr.match.PSEUDO, "");
        }
        selector = Expr.relative[selector] ? selector + "*" : selector;
        for (var i = 0,
            l = root.length; i < l; i++) {
          Sizzle(selector, root[i], tmpSet, seed);
        }
        return Sizzle.filter(later, tmpSet);
      };
      Sizzle.attr = jQuery.attr;
      Sizzle.selectors.attrMap = {};
      jQuery.find = Sizzle;
      jQuery.expr = Sizzle.selectors;
      jQuery.expr[":"] = jQuery.expr.filters;
      jQuery.unique = Sizzle.uniqueSort;
      jQuery.text = Sizzle.getText;
      jQuery.isXMLDoc = Sizzle.isXML;
      jQuery.contains = Sizzle.contains;
    })();
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prevUntil|prevAll)/,
        rmultiselector = /,/,
        isSimple = /^.[^:#\[\.,]*$/,
        slice = Array.prototype.slice,
        POS = jQuery.expr.match.globalPOS,
        guaranteedUnique = {
          children: true,
          contents: true,
          next: true,
          prev: true
        };
    jQuery.fn.extend({
      find: function(selector) {
        var self = this,
            i,
            l;
        if (typeof selector !== "string") {
          return jQuery(selector).filter(function() {
            for (i = 0, l = self.length; i < l; i++) {
              if (jQuery.contains(self[i], this)) {
                return true;
              }
            }
          });
        }
        var ret = this.pushStack("", "find", selector),
            length,
            n,
            r;
        for (i = 0, l = this.length; i < l; i++) {
          length = ret.length;
          jQuery.find(selector, this[i], ret);
          if (i > 0) {
            for (n = length; n < ret.length; n++) {
              for (r = 0; r < length; r++) {
                if (ret[r] === ret[n]) {
                  ret.splice(n--, 1);
                  break;
                }
              }
            }
          }
        }
        return ret;
      },
      has: function(target) {
        var targets = jQuery(target);
        return this.filter(function() {
          for (var i = 0,
              l = targets.length; i < l; i++) {
            if (jQuery.contains(this, targets[i])) {
              return true;
            }
          }
        });
      },
      not: function(selector) {
        return this.pushStack(winnow(this, selector, false), "not", selector);
      },
      filter: function(selector) {
        return this.pushStack(winnow(this, selector, true), "filter", selector);
      },
      is: function(selector) {
        return !!selector && (typeof selector === "string" ? POS.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
      },
      closest: function(selectors, context) {
        var ret = [],
            i,
            l,
            cur = this[0];
        if (jQuery.isArray(selectors)) {
          var level = 1;
          while (cur && cur.ownerDocument && cur !== context) {
            for (i = 0; i < selectors.length; i++) {
              if (jQuery(cur).is(selectors[i])) {
                ret.push({
                  selector: selectors[i],
                  elem: cur,
                  level: level
                });
              }
            }
            cur = cur.parentNode;
            level++;
          }
          return ret;
        }
        var pos = POS.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
        for (i = 0, l = this.length; i < l; i++) {
          cur = this[i];
          while (cur) {
            if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
              ret.push(cur);
              break;
            } else {
              cur = cur.parentNode;
              if (!cur || !cur.ownerDocument || cur === context || cur.nodeType === 11) {
                break;
              }
            }
          }
        }
        ret = ret.length > 1 ? jQuery.unique(ret) : ret;
        return this.pushStack(ret, "closest", selectors);
      },
      index: function(elem) {
        if (!elem) {
          return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
        }
        if (typeof elem === "string") {
          return jQuery.inArray(this[0], jQuery(elem));
        }
        return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
      },
      add: function(selector, context) {
        var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
            all = jQuery.merge(this.get(), set);
        return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
      },
      andSelf: function() {
        return this.add(this.prevObject);
      }
    });
    function isDisconnected(node) {
      return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }
    jQuery.each({
      parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function(elem) {
        return jQuery.dir(elem, "parentNode");
      },
      parentsUntil: function(elem, i, until) {
        return jQuery.dir(elem, "parentNode", until);
      },
      next: function(elem) {
        return jQuery.nth(elem, 2, "nextSibling");
      },
      prev: function(elem) {
        return jQuery.nth(elem, 2, "previousSibling");
      },
      nextAll: function(elem) {
        return jQuery.dir(elem, "nextSibling");
      },
      prevAll: function(elem) {
        return jQuery.dir(elem, "previousSibling");
      },
      nextUntil: function(elem, i, until) {
        return jQuery.dir(elem, "nextSibling", until);
      },
      prevUntil: function(elem, i, until) {
        return jQuery.dir(elem, "previousSibling", until);
      },
      siblings: function(elem) {
        return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
      },
      children: function(elem) {
        return jQuery.sibling(elem.firstChild);
      },
      contents: function(elem) {
        return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
      }
    }, function(name, fn) {
      jQuery.fn[name] = function(until, selector) {
        var ret = jQuery.map(this, fn, until);
        if (!runtil.test(name)) {
          selector = until;
        }
        if (selector && typeof selector === "string") {
          ret = jQuery.filter(selector, ret);
        }
        ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
        if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
          ret = ret.reverse();
        }
        return this.pushStack(ret, name, slice.call(arguments).join(","));
      };
    });
    jQuery.extend({
      filter: function(expr, elems, not) {
        if (not) {
          expr = ":not(" + expr + ")";
        }
        return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
      },
      dir: function(elem, dir, until) {
        var matched = [],
            cur = elem[dir];
        while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
          if (cur.nodeType === 1) {
            matched.push(cur);
          }
          cur = cur[dir];
        }
        return matched;
      },
      nth: function(cur, result, dir, elem) {
        result = result || 1;
        var num = 0;
        for (; cur; cur = cur[dir]) {
          if (cur.nodeType === 1 && ++num === result) {
            break;
          }
        }
        return cur;
      },
      sibling: function(n, elem) {
        var r = [];
        for (; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n !== elem) {
            r.push(n);
          }
        }
        return r;
      }
    });
    function winnow(elements, qualifier, keep) {
      qualifier = qualifier || 0;
      if (jQuery.isFunction(qualifier)) {
        return jQuery.grep(elements, function(elem, i) {
          var retVal = !!qualifier.call(elem, i, elem);
          return retVal === keep;
        });
      } else if (qualifier.nodeType) {
        return jQuery.grep(elements, function(elem, i) {
          return (elem === qualifier) === keep;
        });
      } else if (typeof qualifier === "string") {
        var filtered = jQuery.grep(elements, function(elem) {
          return elem.nodeType === 1;
        });
        if (isSimple.test(qualifier)) {
          return jQuery.filter(qualifier, filtered, !keep);
        } else {
          qualifier = jQuery.filter(qualifier, filtered);
        }
      }
      return jQuery.grep(elements, function(elem, i) {
        return (jQuery.inArray(elem, qualifier) >= 0) === keep;
      });
    }
    function createSafeFragment(document) {
      var list = nodeNames.split("|"),
          safeFrag = document.createDocumentFragment();
      if (safeFrag.createElement) {
        while (list.length) {
          safeFrag.createElement(list.pop());
        }
      }
      return safeFrag;
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
        wrapMap = {
          option: [1, "<select multiple='multiple'>", "</select>"],
          legend: [1, "<fieldset>", "</fieldset>"],
          thead: [1, "<table>", "</table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
          area: [1, "<map>", "</map>"],
          _default: [0, "", ""]
        },
        safeFragment = createSafeFragment(document);
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
      wrapMap._default = [1, "div<div>", "</div>"];
    }
    jQuery.fn.extend({
      text: function(value) {
        return jQuery.access(this, function(value) {
          return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
        }, null, value, arguments.length);
      },
      wrapAll: function(html) {
        if (jQuery.isFunction(html)) {
          return this.each(function(i) {
            jQuery(this).wrapAll(html.call(this, i));
          });
        }
        if (this[0]) {
          var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
          if (this[0].parentNode) {
            wrap.insertBefore(this[0]);
          }
          wrap.map(function() {
            var elem = this;
            while (elem.firstChild && elem.firstChild.nodeType === 1) {
              elem = elem.firstChild;
            }
            return elem;
          }).append(this);
        }
        return this;
      },
      wrapInner: function(html) {
        if (jQuery.isFunction(html)) {
          return this.each(function(i) {
            jQuery(this).wrapInner(html.call(this, i));
          });
        }
        return this.each(function() {
          var self = jQuery(this),
              contents = self.contents();
          if (contents.length) {
            contents.wrapAll(html);
          } else {
            self.append(html);
          }
        });
      },
      wrap: function(html) {
        var isFunction = jQuery.isFunction(html);
        return this.each(function(i) {
          jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
        });
      },
      unwrap: function() {
        return this.parent().each(function() {
          if (!jQuery.nodeName(this, "body")) {
            jQuery(this).replaceWith(this.childNodes);
          }
        }).end();
      },
      append: function() {
        return this.domManip(arguments, true, function(elem) {
          if (this.nodeType === 1) {
            this.appendChild(elem);
          }
        });
      },
      prepend: function() {
        return this.domManip(arguments, true, function(elem) {
          if (this.nodeType === 1) {
            this.insertBefore(elem, this.firstChild);
          }
        });
      },
      before: function() {
        if (this[0] && this[0].parentNode) {
          return this.domManip(arguments, false, function(elem) {
            this.parentNode.insertBefore(elem, this);
          });
        } else if (arguments.length) {
          var set = jQuery.clean(arguments);
          set.push.apply(set, this.toArray());
          return this.pushStack(set, "before", arguments);
        }
      },
      after: function() {
        if (this[0] && this[0].parentNode) {
          return this.domManip(arguments, false, function(elem) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          });
        } else if (arguments.length) {
          var set = this.pushStack(this, "after", arguments);
          set.push.apply(set, jQuery.clean(arguments));
          return set;
        }
      },
      remove: function(selector, keepData) {
        for (var i = 0,
            elem; (elem = this[i]) != null; i++) {
          if (!selector || jQuery.filter(selector, [elem]).length) {
            if (!keepData && elem.nodeType === 1) {
              jQuery.cleanData(elem.getElementsByTagName("*"));
              jQuery.cleanData([elem]);
            }
            if (elem.parentNode) {
              elem.parentNode.removeChild(elem);
            }
          }
        }
        return this;
      },
      empty: function() {
        for (var i = 0,
            elem; (elem = this[i]) != null; i++) {
          if (elem.nodeType === 1) {
            jQuery.cleanData(elem.getElementsByTagName("*"));
          }
          while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
          }
        }
        return this;
      },
      clone: function(dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
        return this.map(function() {
          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },
      html: function(value) {
        return jQuery.access(this, function(value) {
          var elem = this[0] || {},
              i = 0,
              l = this.length;
          if (value === undefined) {
            return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : null;
          }
          if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
            value = value.replace(rxhtmlTag, "<$1></$2>");
            try {
              for (; i < l; i++) {
                elem = this[i] || {};
                if (elem.nodeType === 1) {
                  jQuery.cleanData(elem.getElementsByTagName("*"));
                  elem.innerHTML = value;
                }
              }
              elem = 0;
            } catch (e) {}
          }
          if (elem) {
            this.empty().append(value);
          }
        }, null, value, arguments.length);
      },
      replaceWith: function(value) {
        if (this[0] && this[0].parentNode) {
          if (jQuery.isFunction(value)) {
            return this.each(function(i) {
              var self = jQuery(this),
                  old = self.html();
              self.replaceWith(value.call(this, i, old));
            });
          }
          if (typeof value !== "string") {
            value = jQuery(value).detach();
          }
          return this.each(function() {
            var next = this.nextSibling,
                parent = this.parentNode;
            jQuery(this).remove();
            if (next) {
              jQuery(next).before(value);
            } else {
              jQuery(parent).append(value);
            }
          });
        } else {
          return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this;
        }
      },
      detach: function(selector) {
        return this.remove(selector, true);
      },
      domManip: function(args, table, callback) {
        var results,
            first,
            fragment,
            parent,
            value = args[0],
            scripts = [];
        if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
          return this.each(function() {
            jQuery(this).domManip(args, table, callback, true);
          });
        }
        if (jQuery.isFunction(value)) {
          return this.each(function(i) {
            var self = jQuery(this);
            args[0] = value.call(this, i, table ? self.html() : undefined);
            self.domManip(args, table, callback);
          });
        }
        if (this[0]) {
          parent = value && value.parentNode;
          if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
            results = {fragment: parent};
          } else {
            results = jQuery.buildFragment(args, this, scripts);
          }
          fragment = results.fragment;
          if (fragment.childNodes.length === 1) {
            first = fragment = fragment.firstChild;
          } else {
            first = fragment.firstChild;
          }
          if (first) {
            table = table && jQuery.nodeName(first, "tr");
            for (var i = 0,
                l = this.length,
                lastIndex = l - 1; i < l; i++) {
              callback.call(table ? root(this[i], first) : this[i], results.cacheable || (l > 1 && i < lastIndex) ? jQuery.clone(fragment, true, true) : fragment);
            }
          }
          if (scripts.length) {
            jQuery.each(scripts, function(i, elem) {
              if (elem.src) {
                jQuery.ajax({
                  type: "GET",
                  global: false,
                  url: elem.src,
                  async: false,
                  dataType: "script"
                });
              } else {
                jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "/*$0*/"));
              }
              if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
              }
            });
          }
        }
        return this;
      }
    });
    function root(elem, cur) {
      return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
    }
    function cloneCopyEvent(src, dest) {
      if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
        return;
      }
      var type,
          i,
          l,
          oldData = jQuery._data(src),
          curData = jQuery._data(dest, oldData),
          events = oldData.events;
      if (events) {
        delete curData.handle;
        curData.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
      if (curData.data) {
        curData.data = jQuery.extend({}, curData.data);
      }
    }
    function cloneFixAttributes(src, dest) {
      var nodeName;
      if (dest.nodeType !== 1) {
        return;
      }
      if (dest.clearAttributes) {
        dest.clearAttributes();
      }
      if (dest.mergeAttributes) {
        dest.mergeAttributes(src);
      }
      nodeName = dest.nodeName.toLowerCase();
      if (nodeName === "object") {
        dest.outerHTML = src.outerHTML;
      } else if (nodeName === "input" && (src.type === "checkbox" || src.type === "radio")) {
        if (src.checked) {
          dest.defaultChecked = dest.checked = src.checked;
        }
        if (dest.value !== src.value) {
          dest.value = src.value;
        }
      } else if (nodeName === "option") {
        dest.selected = src.defaultSelected;
      } else if (nodeName === "input" || nodeName === "textarea") {
        dest.defaultValue = src.defaultValue;
      } else if (nodeName === "script" && dest.text !== src.text) {
        dest.text = src.text;
      }
      dest.removeAttribute(jQuery.expando);
      dest.removeAttribute("_submit_attached");
      dest.removeAttribute("_change_attached");
    }
    jQuery.buildFragment = function(args, nodes, scripts) {
      var fragment,
          cacheable,
          cacheresults,
          doc,
          first = args[0];
      if (nodes && nodes[0]) {
        doc = nodes[0].ownerDocument || nodes[0];
      }
      if (!doc.createDocumentFragment) {
        doc = document;
      }
      if (args.length === 1 && typeof first === "string" && first.length < 512 && doc === document && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
        cacheable = true;
        cacheresults = jQuery.fragments[first];
        if (cacheresults && cacheresults !== 1) {
          fragment = cacheresults;
        }
      }
      if (!fragment) {
        fragment = doc.createDocumentFragment();
        jQuery.clean(args, doc, fragment, scripts);
      }
      if (cacheable) {
        jQuery.fragments[first] = cacheresults ? fragment : 1;
      }
      return {
        fragment: fragment,
        cacheable: cacheable
      };
    };
    jQuery.fragments = {};
    jQuery.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(name, original) {
      jQuery.fn[name] = function(selector) {
        var ret = [],
            insert = jQuery(selector),
            parent = this.length === 1 && this[0].parentNode;
        if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
          insert[original](this[0]);
          return this;
        } else {
          for (var i = 0,
              l = insert.length; i < l; i++) {
            var elems = (i > 0 ? this.clone(true) : this).get();
            jQuery(insert[i])[original](elems);
            ret = ret.concat(elems);
          }
          return this.pushStack(ret, name, insert.selector);
        }
      };
    });
    function getAll(elem) {
      if (typeof elem.getElementsByTagName !== "undefined") {
        return elem.getElementsByTagName("*");
      } else if (typeof elem.querySelectorAll !== "undefined") {
        return elem.querySelectorAll("*");
      } else {
        return [];
      }
    }
    function fixDefaultChecked(elem) {
      if (elem.type === "checkbox" || elem.type === "radio") {
        elem.defaultChecked = elem.checked;
      }
    }
    function findInputs(elem) {
      var nodeName = (elem.nodeName || "").toLowerCase();
      if (nodeName === "input") {
        fixDefaultChecked(elem);
      } else if (nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined") {
        jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
      }
    }
    function shimCloneNode(elem) {
      var div = document.createElement("div");
      safeFragment.appendChild(div);
      div.innerHTML = elem.outerHTML;
      return div.firstChild;
    }
    jQuery.extend({
      clone: function(elem, dataAndEvents, deepDataAndEvents) {
        var srcElements,
            destElements,
            i,
            clone = jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? elem.cloneNode(true) : shimCloneNode(elem);
        if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
          cloneFixAttributes(elem, clone);
          srcElements = getAll(elem);
          destElements = getAll(clone);
          for (i = 0; srcElements[i]; ++i) {
            if (destElements[i]) {
              cloneFixAttributes(srcElements[i], destElements[i]);
            }
          }
        }
        if (dataAndEvents) {
          cloneCopyEvent(elem, clone);
          if (deepDataAndEvents) {
            srcElements = getAll(elem);
            destElements = getAll(clone);
            for (i = 0; srcElements[i]; ++i) {
              cloneCopyEvent(srcElements[i], destElements[i]);
            }
          }
        }
        srcElements = destElements = null;
        return clone;
      },
      clean: function(elems, context, fragment, scripts) {
        var checkScriptType,
            script,
            j,
            ret = [];
        context = context || document;
        if (typeof context.createElement === "undefined") {
          context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
        }
        for (var i = 0,
            elem; (elem = elems[i]) != null; i++) {
          if (typeof elem === "number") {
            elem += "";
          }
          if (!elem) {
            continue;
          }
          if (typeof elem === "string") {
            if (!rhtml.test(elem)) {
              elem = context.createTextNode(elem);
            } else {
              elem = elem.replace(rxhtmlTag, "<$1></$2>");
              var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                  wrap = wrapMap[tag] || wrapMap._default,
                  depth = wrap[0],
                  div = context.createElement("div"),
                  safeChildNodes = safeFragment.childNodes,
                  remove;
              if (context === document) {
                safeFragment.appendChild(div);
              } else {
                createSafeFragment(context).appendChild(div);
              }
              div.innerHTML = wrap[1] + elem + wrap[2];
              while (depth--) {
                div = div.lastChild;
              }
              if (!jQuery.support.tbody) {
                var hasBody = rtbody.test(elem),
                    tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                for (j = tbody.length - 1; j >= 0; --j) {
                  if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                    tbody[j].parentNode.removeChild(tbody[j]);
                  }
                }
              }
              if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
              }
              elem = div.childNodes;
              if (div) {
                div.parentNode.removeChild(div);
                if (safeChildNodes.length > 0) {
                  remove = safeChildNodes[safeChildNodes.length - 1];
                  if (remove && remove.parentNode) {
                    remove.parentNode.removeChild(remove);
                  }
                }
              }
            }
          }
          var len;
          if (!jQuery.support.appendChecked) {
            if (elem[0] && typeof(len = elem.length) === "number") {
              for (j = 0; j < len; j++) {
                findInputs(elem[j]);
              }
            } else {
              findInputs(elem);
            }
          }
          if (elem.nodeType) {
            ret.push(elem);
          } else {
            ret = jQuery.merge(ret, elem);
          }
        }
        if (fragment) {
          checkScriptType = function(elem) {
            return !elem.type || rscriptType.test(elem.type);
          };
          for (i = 0; ret[i]; i++) {
            script = ret[i];
            if (scripts && jQuery.nodeName(script, "script") && (!script.type || rscriptType.test(script.type))) {
              scripts.push(script.parentNode ? script.parentNode.removeChild(script) : script);
            } else {
              if (script.nodeType === 1) {
                var jsTags = jQuery.grep(script.getElementsByTagName("script"), checkScriptType);
                ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
              }
              fragment.appendChild(script);
            }
          }
        }
        return ret;
      },
      cleanData: function(elems) {
        var data,
            id,
            cache = jQuery.cache,
            special = jQuery.event.special,
            deleteExpando = jQuery.support.deleteExpando;
        for (var i = 0,
            elem; (elem = elems[i]) != null; i++) {
          if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
            continue;
          }
          id = elem[jQuery.expando];
          if (id) {
            data = cache[id];
            if (data && data.events) {
              for (var type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
              if (data.handle) {
                data.handle.elem = null;
              }
            }
            if (deleteExpando) {
              delete elem[jQuery.expando];
            } else if (elem.removeAttribute) {
              elem.removeAttribute(jQuery.expando);
            }
            delete cache[id];
          }
        }
      }
    });
    var ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rupper = /([A-Z]|^ms)/g,
        rnum = /^[\-+]?(?:\d*\.)?\d+$/i,
        rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        rrelNum = /^([\-+])=([\-+.\de]+)/,
        rmargin = /^margin/,
        cssShow = {
          position: "absolute",
          visibility: "hidden",
          display: "block"
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        curCSS,
        getComputedStyle,
        currentStyle;
    jQuery.fn.css = function(name, value) {
      return jQuery.access(this, function(elem, name, value) {
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    };
    jQuery.extend({
      cssHooks: {opacity: {get: function(elem, computed) {
            if (computed) {
              var ret = curCSS(elem, "opacity");
              return ret === "" ? "1" : ret;
            } else {
              return elem.style.opacity;
            }
          }}},
      cssNumber: {
        "fillOpacity": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
      },
      cssProps: {"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"},
      style: function(elem, name, value, extra) {
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }
        var ret,
            type,
            origName = jQuery.camelCase(name),
            style = elem.style,
            hooks = jQuery.cssHooks[origName];
        name = jQuery.cssProps[origName] || origName;
        if (value !== undefined) {
          type = typeof value;
          if (type === "string" && (ret = rrelNum.exec(value))) {
            value = (+(ret[1] + 1) * +ret[2]) + parseFloat(jQuery.css(elem, name));
            type = "number";
          }
          if (value == null || type === "number" && isNaN(value)) {
            return;
          }
          if (type === "number" && !jQuery.cssNumber[origName]) {
            value += "px";
          }
          if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
            try {
              style[name] = value;
            } catch (e) {}
          }
        } else {
          if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
            return ret;
          }
          return style[name];
        }
      },
      css: function(elem, name, extra) {
        var ret,
            hooks;
        name = jQuery.camelCase(name);
        hooks = jQuery.cssHooks[name];
        name = jQuery.cssProps[name] || name;
        if (name === "cssFloat") {
          name = "float";
        }
        if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
          return ret;
        } else if (curCSS) {
          return curCSS(elem, name);
        }
      },
      swap: function(elem, options, callback) {
        var old = {},
            ret,
            name;
        for (name in options) {
          old[name] = elem.style[name];
          elem.style[name] = options[name];
        }
        ret = callback.call(elem);
        for (name in options) {
          elem.style[name] = old[name];
        }
        return ret;
      }
    });
    jQuery.curCSS = jQuery.css;
    if (document.defaultView && document.defaultView.getComputedStyle) {
      getComputedStyle = function(elem, name) {
        var ret,
            defaultView,
            computedStyle,
            width,
            style = elem.style;
        name = name.replace(rupper, "-$1").toLowerCase();
        if ((defaultView = elem.ownerDocument.defaultView) && (computedStyle = defaultView.getComputedStyle(elem, null))) {
          ret = computedStyle.getPropertyValue(name);
          if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
            ret = jQuery.style(elem, name);
          }
        }
        if (!jQuery.support.pixelMargin && computedStyle && rmargin.test(name) && rnumnonpx.test(ret)) {
          width = style.width;
          style.width = ret;
          ret = computedStyle.width;
          style.width = width;
        }
        return ret;
      };
    }
    if (document.documentElement.currentStyle) {
      currentStyle = function(elem, name) {
        var left,
            rsLeft,
            uncomputed,
            ret = elem.currentStyle && elem.currentStyle[name],
            style = elem.style;
        if (ret == null && style && (uncomputed = style[name])) {
          ret = uncomputed;
        }
        if (rnumnonpx.test(ret)) {
          left = style.left;
          rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
          if (rsLeft) {
            elem.runtimeStyle.left = elem.currentStyle.left;
          }
          style.left = name === "fontSize" ? "1em" : ret;
          ret = style.pixelLeft + "px";
          style.left = left;
          if (rsLeft) {
            elem.runtimeStyle.left = rsLeft;
          }
        }
        return ret === "" ? "auto" : ret;
      };
    }
    curCSS = getComputedStyle || currentStyle;
    function getWidthOrHeight(elem, name, extra) {
      var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
          i = name === "width" ? 1 : 0,
          len = 4;
      if (val > 0) {
        if (extra !== "border") {
          for (; i < len; i += 2) {
            if (!extra) {
              val -= parseFloat(jQuery.css(elem, "padding" + cssExpand[i])) || 0;
            }
            if (extra === "margin") {
              val += parseFloat(jQuery.css(elem, extra + cssExpand[i])) || 0;
            } else {
              val -= parseFloat(jQuery.css(elem, "border" + cssExpand[i] + "Width")) || 0;
            }
          }
        }
        return val + "px";
      }
      val = curCSS(elem, name);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      val = parseFloat(val) || 0;
      if (extra) {
        for (; i < len; i += 2) {
          val += parseFloat(jQuery.css(elem, "padding" + cssExpand[i])) || 0;
          if (extra !== "padding") {
            val += parseFloat(jQuery.css(elem, "border" + cssExpand[i] + "Width")) || 0;
          }
          if (extra === "margin") {
            val += parseFloat(jQuery.css(elem, extra + cssExpand[i])) || 0;
          }
        }
      }
      return val + "px";
    }
    jQuery.each(["height", "width"], function(i, name) {
      jQuery.cssHooks[name] = {
        get: function(elem, computed, extra) {
          if (computed) {
            if (elem.offsetWidth !== 0) {
              return getWidthOrHeight(elem, name, extra);
            } else {
              return jQuery.swap(elem, cssShow, function() {
                return getWidthOrHeight(elem, name, extra);
              });
            }
          }
        },
        set: function(elem, value) {
          return rnum.test(value) ? value + "px" : value;
        }
      };
    });
    if (!jQuery.support.opacity) {
      jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
          return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
          var style = elem.style,
              currentStyle = elem.currentStyle,
              opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
              filter = currentStyle && currentStyle.filter || style.filter || "";
          style.zoom = 1;
          if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "") {
            style.removeAttribute("filter");
            if (currentStyle && !currentStyle.filter) {
              return;
            }
          }
          style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
        }
      };
    }
    jQuery(function() {
      if (!jQuery.support.reliableMarginRight) {
        jQuery.cssHooks.marginRight = {get: function(elem, computed) {
            return jQuery.swap(elem, {"display": "inline-block"}, function() {
              if (computed) {
                return curCSS(elem, "margin-right");
              } else {
                return elem.style.marginRight;
              }
            });
          }};
      }
    });
    if (jQuery.expr && jQuery.expr.filters) {
      jQuery.expr.filters.hidden = function(elem) {
        var width = elem.offsetWidth,
            height = elem.offsetHeight;
        return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
      };
      jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
      };
    }
    jQuery.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
          var i,
              parts = typeof value === "string" ? value.split(" ") : [value],
              expanded = {};
          for (i = 0; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
          }
          return expanded;
        }};
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rselectTextarea = /^(?:select|textarea)/i,
        rspacesAjax = /\s+/,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        ajaxLocation,
        ajaxLocParts,
        allTypes = ["*/"] + ["*"];
    try {
      ajaxLocation = location.href;
    } catch (e) {
      ajaxLocation = document.createElement("a");
      ajaxLocation.href = "";
      ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
      return function(dataTypeExpression, func) {
        if (typeof dataTypeExpression !== "string") {
          func = dataTypeExpression;
          dataTypeExpression = "*";
        }
        if (jQuery.isFunction(func)) {
          var dataTypes = dataTypeExpression.toLowerCase().split(rspacesAjax),
              i = 0,
              length = dataTypes.length,
              dataType,
              list,
              placeBefore;
          for (; i < length; i++) {
            dataType = dataTypes[i];
            placeBefore = /^\+/.test(dataType);
            if (placeBefore) {
              dataType = dataType.substr(1) || "*";
            }
            list = structure[dataType] = structure[dataType] || [];
            list[placeBefore ? "unshift" : "push"](func);
          }
        }
      };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
      dataType = dataType || options.dataTypes[0];
      inspected = inspected || {};
      inspected[dataType] = true;
      var list = structure[dataType],
          i = 0,
          length = list ? list.length : 0,
          executeOnly = (structure === prefilters),
          selection;
      for (; i < length && (executeOnly || !selection); i++) {
        selection = list[i](options, originalOptions, jqXHR);
        if (typeof selection === "string") {
          if (!executeOnly || inspected[selection]) {
            selection = undefined;
          } else {
            options.dataTypes.unshift(selection);
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
          }
        }
      }
      if ((executeOnly || !selection) && !inspected["*"]) {
        selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected);
      }
      return selection;
    }
    function ajaxExtend(target, src) {
      var key,
          deep,
          flatOptions = jQuery.ajaxSettings.flatOptions || {};
      for (key in src) {
        if (src[key] !== undefined) {
          (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
        }
      }
      if (deep) {
        jQuery.extend(true, target, deep);
      }
    }
    jQuery.fn.extend({
      load: function(url, params, callback) {
        if (typeof url !== "string" && _load) {
          return _load.apply(this, arguments);
        } else if (!this.length) {
          return this;
        }
        var off = url.indexOf(" ");
        if (off >= 0) {
          var selector = url.slice(off, url.length);
          url = url.slice(0, off);
        }
        var type = "GET";
        if (params) {
          if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
          } else if (typeof params === "object") {
            params = jQuery.param(params, jQuery.ajaxSettings.traditional);
            type = "POST";
          }
        }
        var self = this;
        jQuery.ajax({
          url: url,
          type: type,
          dataType: "html",
          data: params,
          complete: function(jqXHR, status, responseText) {
            responseText = jqXHR.responseText;
            if (jqXHR.isResolved()) {
              jqXHR.done(function(r) {
                responseText = r;
              });
              self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText);
            }
            if (callback) {
              self.each(callback, [responseText, status, jqXHR]);
            }
          }
        });
        return this;
      },
      serialize: function() {
        return jQuery.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          return this.elements ? jQuery.makeArray(this.elements) : this;
        }).filter(function() {
          return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
        }).map(function(i, elem) {
          var val = jQuery(this).val();
          return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          }) : {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }).get();
      }
    });
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
      jQuery.fn[o] = function(f) {
        return this.on(o, f);
      };
    });
    jQuery.each(["get", "post"], function(i, method) {
      jQuery[method] = function(url, data, callback, type) {
        if (jQuery.isFunction(data)) {
          type = type || callback;
          callback = data;
          data = undefined;
        }
        return jQuery.ajax({
          type: method,
          url: url,
          data: data,
          success: callback,
          dataType: type
        });
      };
    });
    jQuery.extend({
      getScript: function(url, callback) {
        return jQuery.get(url, undefined, callback, "script");
      },
      getJSON: function(url, data, callback) {
        return jQuery.get(url, data, callback, "json");
      },
      ajaxSetup: function(target, settings) {
        if (settings) {
          ajaxExtend(target, jQuery.ajaxSettings);
        } else {
          settings = target;
          target = jQuery.ajaxSettings;
        }
        ajaxExtend(target, settings);
        return target;
      },
      ajaxSettings: {
        url: ajaxLocation,
        isLocal: rlocalProtocol.test(ajaxLocParts[1]),
        global: true,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        processData: true,
        async: true,
        accepts: {
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          "*": allTypes
        },
        contents: {
          xml: /xml/,
          html: /html/,
          json: /json/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText"
        },
        converters: {
          "* text": window.String,
          "text html": true,
          "text json": jQuery.parseJSON,
          "text xml": jQuery.parseXML
        },
        flatOptions: {
          context: true,
          url: true
        }
      },
      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
      ajaxTransport: addToPrefiltersOrTransports(transports),
      ajax: function(url, options) {
        if (typeof url === "object") {
          options = url;
          url = undefined;
        }
        options = options || {};
        var s = jQuery.ajaxSetup({}, options),
            callbackContext = s.context || s,
            globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks("once memory"),
            statusCode = s.statusCode || {},
            ifModifiedKey,
            requestHeaders = {},
            requestHeadersNames = {},
            responseHeadersString,
            responseHeaders,
            transport,
            timeoutTimer,
            parts,
            state = 0,
            fireGlobals,
            i,
            jqXHR = {
              readyState: 0,
              setRequestHeader: function(name, value) {
                if (!state) {
                  var lname = name.toLowerCase();
                  name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                  requestHeaders[name] = value;
                }
                return this;
              },
              getAllResponseHeaders: function() {
                return state === 2 ? responseHeadersString : null;
              },
              getResponseHeader: function(key) {
                var match;
                if (state === 2) {
                  if (!responseHeaders) {
                    responseHeaders = {};
                    while ((match = rheaders.exec(responseHeadersString))) {
                      responseHeaders[match[1].toLowerCase()] = match[2];
                    }
                  }
                  match = responseHeaders[key.toLowerCase()];
                }
                return match === undefined ? null : match;
              },
              overrideMimeType: function(type) {
                if (!state) {
                  s.mimeType = type;
                }
                return this;
              },
              abort: function(statusText) {
                statusText = statusText || "abort";
                if (transport) {
                  transport.abort(statusText);
                }
                done(0, statusText);
                return this;
              }
            };
        function done(status, nativeStatusText, responses, headers) {
          if (state === 2) {
            return;
          }
          state = 2;
          if (timeoutTimer) {
            clearTimeout(timeoutTimer);
          }
          transport = undefined;
          responseHeadersString = headers || "";
          jqXHR.readyState = status > 0 ? 4 : 0;
          var isSuccess,
              success,
              error,
              statusText = nativeStatusText,
              response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined,
              lastModified,
              etag;
          if (status >= 200 && status < 300 || status === 304) {
            if (s.ifModified) {
              if ((lastModified = jqXHR.getResponseHeader("Last-Modified"))) {
                jQuery.lastModified[ifModifiedKey] = lastModified;
              }
              if ((etag = jqXHR.getResponseHeader("Etag"))) {
                jQuery.etag[ifModifiedKey] = etag;
              }
            }
            if (status === 304) {
              statusText = "notmodified";
              isSuccess = true;
            } else {
              try {
                success = ajaxConvert(s, response);
                statusText = "success";
                isSuccess = true;
              } catch (e) {
                statusText = "parsererror";
                error = e;
              }
            }
          } else {
            error = statusText;
            if (!statusText || status) {
              statusText = "error";
              if (status < 0) {
                status = 0;
              }
            }
          }
          jqXHR.status = status;
          jqXHR.statusText = "" + (nativeStatusText || statusText);
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = undefined;
          if (fireGlobals) {
            globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]);
          }
          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
          if (fireGlobals) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!(--jQuery.active)) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
        deferred.promise(jqXHR);
        jqXHR.success = jqXHR.done;
        jqXHR.error = jqXHR.fail;
        jqXHR.complete = completeDeferred.add;
        jqXHR.statusCode = function(map) {
          if (map) {
            var tmp;
            if (state < 2) {
              for (tmp in map) {
                statusCode[tmp] = [statusCode[tmp], map[tmp]];
              }
            } else {
              tmp = map[jqXHR.status];
              jqXHR.then(tmp, tmp);
            }
          }
          return this;
        };
        s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
        s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(rspacesAjax);
        if (s.crossDomain == null) {
          parts = rurl.exec(s.url.toLowerCase());
          s.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
        }
        if (s.data && s.processData && typeof s.data !== "string") {
          s.data = jQuery.param(s.data, s.traditional);
        }
        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
        if (state === 2) {
          return false;
        }
        fireGlobals = s.global;
        s.type = s.type.toUpperCase();
        s.hasContent = !rnoContent.test(s.type);
        if (fireGlobals && jQuery.active++ === 0) {
          jQuery.event.trigger("ajaxStart");
        }
        if (!s.hasContent) {
          if (s.data) {
            s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
            delete s.data;
          }
          ifModifiedKey = s.url;
          if (s.cache === false) {
            var ts = jQuery.now(),
                ret = s.url.replace(rts, "$1_=" + ts);
            s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
          }
        }
        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
          jqXHR.setRequestHeader("Content-Type", s.contentType);
        }
        if (s.ifModified) {
          ifModifiedKey = ifModifiedKey || s.url;
          if (jQuery.lastModified[ifModifiedKey]) {
            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]);
          }
          if (jQuery.etag[ifModifiedKey]) {
            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey]);
          }
        }
        jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
        for (i in s.headers) {
          jqXHR.setRequestHeader(i, s.headers[i]);
        }
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
          jqXHR.abort();
          return false;
        }
        for (i in {
          success: 1,
          error: 1,
          complete: 1
        }) {
          jqXHR[i](s[i]);
        }
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
        if (!transport) {
          done(-1, "No Transport");
        } else {
          jqXHR.readyState = 1;
          if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
          }
          if (s.async && s.timeout > 0) {
            timeoutTimer = setTimeout(function() {
              jqXHR.abort("timeout");
            }, s.timeout);
          }
          try {
            state = 1;
            transport.send(requestHeaders, done);
          } catch (e) {
            if (state < 2) {
              done(-1, e);
            } else {
              throw e;
            }
          }
        }
        return jqXHR;
      },
      param: function(a, traditional) {
        var s = [],
            add = function(key, value) {
              value = jQuery.isFunction(value) ? value() : value;
              s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
        if (traditional === undefined) {
          traditional = jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
          jQuery.each(a, function() {
            add(this.name, this.value);
          });
        } else {
          for (var prefix in a) {
            buildParams(prefix, a[prefix], traditional, add);
          }
        }
        return s.join("&").replace(r20, "+");
      }
    });
    function buildParams(prefix, obj, traditional, add) {
      if (jQuery.isArray(obj)) {
        jQuery.each(obj, function(i, v) {
          if (traditional || rbracket.test(prefix)) {
            add(prefix, v);
          } else {
            buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
          }
        });
      } else if (!traditional && jQuery.type(obj) === "object") {
        for (var name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }
      } else {
        add(prefix, obj);
      }
    }
    jQuery.extend({
      active: 0,
      lastModified: {},
      etag: {}
    });
    function ajaxHandleResponses(s, jqXHR, responses) {
      var contents = s.contents,
          dataTypes = s.dataTypes,
          responseFields = s.responseFields,
          ct,
          type,
          finalDataType,
          firstDataType;
      for (type in responseFields) {
        if (type in responses) {
          jqXHR[responseFields[type]] = responses[type];
        }
      }
      while (dataTypes[0] === "*") {
        dataTypes.shift();
        if (ct === undefined) {
          ct = s.mimeType || jqXHR.getResponseHeader("content-type");
        }
      }
      if (ct) {
        for (type in contents) {
          if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
          }
        }
      }
      if (dataTypes[0] in responses) {
        finalDataType = dataTypes[0];
      } else {
        for (type in responses) {
          if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
            finalDataType = type;
            break;
          }
          if (!firstDataType) {
            firstDataType = type;
          }
        }
        finalDataType = finalDataType || firstDataType;
      }
      if (finalDataType) {
        if (finalDataType !== dataTypes[0]) {
          dataTypes.unshift(finalDataType);
        }
        return responses[finalDataType];
      }
    }
    function ajaxConvert(s, response) {
      if (s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      var dataTypes = s.dataTypes,
          converters = {},
          i,
          key,
          length = dataTypes.length,
          tmp,
          current = dataTypes[0],
          prev,
          conversion,
          conv,
          conv1,
          conv2;
      for (i = 1; i < length; i++) {
        if (i === 1) {
          for (key in s.converters) {
            if (typeof key === "string") {
              converters[key.toLowerCase()] = s.converters[key];
            }
          }
        }
        prev = current;
        current = dataTypes[i];
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conversion = prev + " " + current;
          conv = converters[conversion] || converters["* " + current];
          if (!conv) {
            conv2 = undefined;
            for (conv1 in converters) {
              tmp = conv1.split(" ");
              if (tmp[0] === prev || tmp[0] === "*") {
                conv2 = converters[tmp[1] + " " + current];
                if (conv2) {
                  conv1 = converters[conv1];
                  if (conv1 === true) {
                    conv = conv2;
                  } else if (conv2 === true) {
                    conv = conv1;
                  }
                  break;
                }
              }
            }
          }
          if (!(conv || conv2)) {
            jQuery.error("No conversion from " + conversion.replace(" ", " to "));
          }
          if (conv !== true) {
            response = conv ? conv(response) : conv2(conv1(response));
          }
        }
      }
      return response;
    }
    var jsc = jQuery.now(),
        jsre = /(\=)\?(&|$)|\?\?/i;
    jQuery.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        return jQuery.expando + "_" + (jsc++);
      }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
      var inspectData = (typeof s.data === "string") && /^application\/x\-www\-form\-urlencoded/.test(s.contentType);
      if (s.dataTypes[0] === "jsonp" || s.jsonp !== false && (jsre.test(s.url) || inspectData && jsre.test(s.data))) {
        var responseContainer,
            jsonpCallback = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
            previous = window[jsonpCallback],
            url = s.url,
            data = s.data,
            replace = "$1" + jsonpCallback + "$2";
        if (s.jsonp !== false) {
          url = url.replace(jsre, replace);
          if (s.url === url) {
            if (inspectData) {
              data = data.replace(jsre, replace);
            }
            if (s.data === data) {
              url += (/\?/.test(url) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
            }
          }
        }
        s.url = url;
        s.data = data;
        window[jsonpCallback] = function(response) {
          responseContainer = [response];
        };
        jqXHR.always(function() {
          window[jsonpCallback] = previous;
          if (responseContainer && jQuery.isFunction(previous)) {
            window[jsonpCallback](responseContainer[0]);
          }
        });
        s.converters["script json"] = function() {
          if (!responseContainer) {
            jQuery.error(jsonpCallback + " was not called");
          }
          return responseContainer[0];
        };
        s.dataTypes[0] = "json";
        return "script";
      }
    });
    jQuery.ajaxSetup({
      accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
      contents: {script: /javascript|ecmascript/},
      converters: {"text script": function(text) {
          jQuery.globalEval(text);
          return text;
        }}
    });
    jQuery.ajaxPrefilter("script", function(s) {
      if (s.cache === undefined) {
        s.cache = false;
      }
      if (s.crossDomain) {
        s.type = "GET";
        s.global = false;
      }
    });
    jQuery.ajaxTransport("script", function(s) {
      if (s.crossDomain) {
        var script,
            head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        return {
          send: function(_, callback) {
            script = document.createElement("script");
            script.async = "async";
            if (s.scriptCharset) {
              script.charset = s.scriptCharset;
            }
            script.src = s.url;
            script.onload = script.onreadystatechange = function(_, isAbort) {
              if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                if (head && script.parentNode) {
                  head.removeChild(script);
                }
                script = undefined;
                if (!isAbort) {
                  callback(200, "success");
                }
              }
            };
            head.insertBefore(script, head.firstChild);
          },
          abort: function() {
            if (script) {
              script.onload(0, 1);
            }
          }
        };
      }
    });
    var xhrOnUnloadAbort = window.ActiveXObject ? function() {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key](0, 1);
      }
    } : false,
        xhrId = 0,
        xhrCallbacks;
    function createStandardXHR() {
      try {
        return new window.XMLHttpRequest();
      } catch (e) {}
    }
    function createActiveXHR() {
      try {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
      return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    (function(xhr) {
      jQuery.extend(jQuery.support, {
        ajax: !!xhr,
        cors: !!xhr && ("withCredentials" in xhr)
      });
    })(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
      jQuery.ajaxTransport(function(s) {
        if (!s.crossDomain || jQuery.support.cors) {
          var callback;
          return {
            send: function(headers, complete) {
              var xhr = s.xhr(),
                  handle,
                  i;
              if (s.username) {
                xhr.open(s.type, s.url, s.async, s.username, s.password);
              } else {
                xhr.open(s.type, s.url, s.async);
              }
              if (s.xhrFields) {
                for (i in s.xhrFields) {
                  xhr[i] = s.xhrFields[i];
                }
              }
              if (s.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(s.mimeType);
              }
              if (!s.crossDomain && !headers["X-Requested-With"]) {
                headers["X-Requested-With"] = "XMLHttpRequest";
              }
              try {
                for (i in headers) {
                  xhr.setRequestHeader(i, headers[i]);
                }
              } catch (_) {}
              xhr.send((s.hasContent && s.data) || null);
              callback = function(_, isAbort) {
                var status,
                    statusText,
                    responseHeaders,
                    responses,
                    xml;
                try {
                  if (callback && (isAbort || xhr.readyState === 4)) {
                    callback = undefined;
                    if (handle) {
                      xhr.onreadystatechange = jQuery.noop;
                      if (xhrOnUnloadAbort) {
                        delete xhrCallbacks[handle];
                      }
                    }
                    if (isAbort) {
                      if (xhr.readyState !== 4) {
                        xhr.abort();
                      }
                    } else {
                      status = xhr.status;
                      responseHeaders = xhr.getAllResponseHeaders();
                      responses = {};
                      xml = xhr.responseXML;
                      if (xml && xml.documentElement) {
                        responses.xml = xml;
                      }
                      try {
                        responses.text = xhr.responseText;
                      } catch (_) {}
                      try {
                        statusText = xhr.statusText;
                      } catch (e) {
                        statusText = "";
                      }
                      if (!status && s.isLocal && !s.crossDomain) {
                        status = responses.text ? 200 : 404;
                      } else if (status === 1223) {
                        status = 204;
                      }
                    }
                  }
                } catch (firefoxAccessException) {
                  if (!isAbort) {
                    complete(-1, firefoxAccessException);
                  }
                }
                if (responses) {
                  complete(status, statusText, responses, responseHeaders);
                }
              };
              if (!s.async || xhr.readyState === 4) {
                callback();
              } else {
                handle = ++xhrId;
                if (xhrOnUnloadAbort) {
                  if (!xhrCallbacks) {
                    xhrCallbacks = {};
                    jQuery(window).unload(xhrOnUnloadAbort);
                  }
                  xhrCallbacks[handle] = callback;
                }
                xhr.onreadystatechange = callback;
              }
            },
            abort: function() {
              if (callback) {
                callback(0, 1);
              }
            }
          };
        }
      });
    }
    var elemdisplay = {},
        iframe,
        iframeDoc,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        timerId,
        fxAttrs = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
        fxNow;
    jQuery.fn.extend({
      show: function(speed, easing, callback) {
        var elem,
            display;
        if (speed || speed === 0) {
          return this.animate(genFx("show", 3), speed, easing, callback);
        } else {
          for (var i = 0,
              j = this.length; i < j; i++) {
            elem = this[i];
            if (elem.style) {
              display = elem.style.display;
              if (!jQuery._data(elem, "olddisplay") && display === "none") {
                display = elem.style.display = "";
              }
              if ((display === "" && jQuery.css(elem, "display") === "none") || !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
              }
            }
          }
          for (i = 0; i < j; i++) {
            elem = this[i];
            if (elem.style) {
              display = elem.style.display;
              if (display === "" || display === "none") {
                elem.style.display = jQuery._data(elem, "olddisplay") || "";
              }
            }
          }
          return this;
        }
      },
      hide: function(speed, easing, callback) {
        if (speed || speed === 0) {
          return this.animate(genFx("hide", 3), speed, easing, callback);
        } else {
          var elem,
              display,
              i = 0,
              j = this.length;
          for (; i < j; i++) {
            elem = this[i];
            if (elem.style) {
              display = jQuery.css(elem, "display");
              if (display !== "none" && !jQuery._data(elem, "olddisplay")) {
                jQuery._data(elem, "olddisplay", display);
              }
            }
          }
          for (i = 0; i < j; i++) {
            if (this[i].style) {
              this[i].style.display = "none";
            }
          }
          return this;
        }
      },
      _toggle: jQuery.fn.toggle,
      toggle: function(fn, fn2, callback) {
        var bool = typeof fn === "boolean";
        if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
          this._toggle.apply(this, arguments);
        } else if (fn == null || bool) {
          this.each(function() {
            var state = bool ? fn : jQuery(this).is(":hidden");
            jQuery(this)[state ? "show" : "hide"]();
          });
        } else {
          this.animate(genFx("toggle", 3), fn, fn2, callback);
        }
        return this;
      },
      fadeTo: function(speed, to, easing, callback) {
        return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
      },
      animate: function(prop, speed, easing, callback) {
        var optall = jQuery.speed(speed, easing, callback);
        if (jQuery.isEmptyObject(prop)) {
          return this.each(optall.complete, [false]);
        }
        prop = jQuery.extend({}, prop);
        function doAnimation() {
          if (optall.queue === false) {
            jQuery._mark(this);
          }
          var opt = jQuery.extend({}, optall),
              isElement = this.nodeType === 1,
              hidden = isElement && jQuery(this).is(":hidden"),
              name,
              val,
              p,
              e,
              hooks,
              replace,
              parts,
              start,
              end,
              unit,
              method;
          opt.animatedProperties = {};
          for (p in prop) {
            name = jQuery.camelCase(p);
            if (p !== name) {
              prop[name] = prop[p];
              delete prop[p];
            }
            if ((hooks = jQuery.cssHooks[name]) && "expand" in hooks) {
              replace = hooks.expand(prop[name]);
              delete prop[name];
              for (p in replace) {
                if (!(p in prop)) {
                  prop[p] = replace[p];
                }
              }
            }
          }
          for (name in prop) {
            val = prop[name];
            if (jQuery.isArray(val)) {
              opt.animatedProperties[name] = val[1];
              val = prop[name] = val[0];
            } else {
              opt.animatedProperties[name] = opt.specialEasing && opt.specialEasing[name] || opt.easing || 'swing';
            }
            if (val === "hide" && hidden || val === "show" && !hidden) {
              return opt.complete.call(this);
            }
            if (isElement && (name === "height" || name === "width")) {
              opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
              if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") {
                if (!jQuery.support.inlineBlockNeedsLayout || defaultDisplay(this.nodeName) === "inline") {
                  this.style.display = "inline-block";
                } else {
                  this.style.zoom = 1;
                }
              }
            }
          }
          if (opt.overflow != null) {
            this.style.overflow = "hidden";
          }
          for (p in prop) {
            e = new jQuery.fx(this, opt, p);
            val = prop[p];
            if (rfxtypes.test(val)) {
              method = jQuery._data(this, "toggle" + p) || (val === "toggle" ? hidden ? "show" : "hide" : 0);
              if (method) {
                jQuery._data(this, "toggle" + p, method === "show" ? "hide" : "show");
                e[method]();
              } else {
                e[val]();
              }
            } else {
              parts = rfxnum.exec(val);
              start = e.cur();
              if (parts) {
                end = parseFloat(parts[2]);
                unit = parts[3] || (jQuery.cssNumber[p] ? "" : "px");
                if (unit !== "px") {
                  jQuery.style(this, p, (end || 1) + unit);
                  start = ((end || 1) / e.cur()) * start;
                  jQuery.style(this, p, start + unit);
                }
                if (parts[1]) {
                  end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                }
                e.custom(start, end, unit);
              } else {
                e.custom(start, val, "");
              }
            }
          }
          return true;
        }
        return optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
      },
      stop: function(type, clearQueue, gotoEnd) {
        if (typeof type !== "string") {
          gotoEnd = clearQueue;
          clearQueue = type;
          type = undefined;
        }
        if (clearQueue && type !== false) {
          this.queue(type || "fx", []);
        }
        return this.each(function() {
          var index,
              hadTimers = false,
              timers = jQuery.timers,
              data = jQuery._data(this);
          if (!gotoEnd) {
            jQuery._unmark(true, this);
          }
          function stopQueue(elem, data, index) {
            var hooks = data[index];
            jQuery.removeData(elem, index, true);
            hooks.stop(gotoEnd);
          }
          if (type == null) {
            for (index in data) {
              if (data[index] && data[index].stop && index.indexOf(".run") === index.length - 4) {
                stopQueue(this, data, index);
              }
            }
          } else if (data[index = type + ".run"] && data[index].stop) {
            stopQueue(this, data, index);
          }
          for (index = timers.length; index--; ) {
            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
              if (gotoEnd) {
                timers[index](true);
              } else {
                timers[index].saveState();
              }
              hadTimers = true;
              timers.splice(index, 1);
            }
          }
          if (!(gotoEnd && hadTimers)) {
            jQuery.dequeue(this, type);
          }
        });
      }
    });
    function createFxNow() {
      setTimeout(clearFxNow, 0);
      return (fxNow = jQuery.now());
    }
    function clearFxNow() {
      fxNow = undefined;
    }
    function genFx(type, num) {
      var obj = {};
      jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function() {
        obj[this] = type;
      });
      return obj;
    }
    jQuery.each({
      slideDown: genFx("show", 1),
      slideUp: genFx("hide", 1),
      slideToggle: genFx("toggle", 1),
      fadeIn: {opacity: "show"},
      fadeOut: {opacity: "hide"},
      fadeToggle: {opacity: "toggle"}
    }, function(name, props) {
      jQuery.fn[name] = function(speed, easing, callback) {
        return this.animate(props, speed, easing, callback);
      };
    });
    jQuery.extend({
      speed: function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
          complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
          duration: speed,
          easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
          opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function(noUnmark) {
          if (jQuery.isFunction(opt.old)) {
            opt.old.call(this);
          }
          if (opt.queue) {
            jQuery.dequeue(this, opt.queue);
          } else if (noUnmark !== false) {
            jQuery._unmark(this);
          }
        };
        return opt;
      },
      easing: {
        linear: function(p) {
          return p;
        },
        swing: function(p) {
          return (-Math.cos(p * Math.PI) / 2) + 0.5;
        }
      },
      timers: [],
      fx: function(elem, options, prop) {
        this.options = options;
        this.elem = elem;
        this.prop = prop;
        options.orig = options.orig || {};
      }
    });
    jQuery.fx.prototype = {
      update: function() {
        if (this.options.step) {
          this.options.step.call(this.elem, this.now, this);
        }
        (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
      },
      cur: function() {
        if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
          return this.elem[this.prop];
        }
        var parsed,
            r = jQuery.css(this.elem, this.prop);
        return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed;
      },
      custom: function(from, to, unit) {
        var self = this,
            fx = jQuery.fx;
        this.startTime = fxNow || createFxNow();
        this.end = to;
        this.now = this.start = from;
        this.pos = this.state = 0;
        this.unit = unit || this.unit || (jQuery.cssNumber[this.prop] ? "" : "px");
        function t(gotoEnd) {
          return self.step(gotoEnd);
        }
        t.queue = this.options.queue;
        t.elem = this.elem;
        t.saveState = function() {
          if (jQuery._data(self.elem, "fxshow" + self.prop) === undefined) {
            if (self.options.hide) {
              jQuery._data(self.elem, "fxshow" + self.prop, self.start);
            } else if (self.options.show) {
              jQuery._data(self.elem, "fxshow" + self.prop, self.end);
            }
          }
        };
        if (t() && jQuery.timers.push(t) && !timerId) {
          timerId = setInterval(fx.tick, fx.interval);
        }
      },
      show: function() {
        var dataShow = jQuery._data(this.elem, "fxshow" + this.prop);
        this.options.orig[this.prop] = dataShow || jQuery.style(this.elem, this.prop);
        this.options.show = true;
        if (dataShow !== undefined) {
          this.custom(this.cur(), dataShow);
        } else {
          this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
        }
        jQuery(this.elem).show();
      },
      hide: function() {
        this.options.orig[this.prop] = jQuery._data(this.elem, "fxshow" + this.prop) || jQuery.style(this.elem, this.prop);
        this.options.hide = true;
        this.custom(this.cur(), 0);
      },
      step: function(gotoEnd) {
        var p,
            n,
            complete,
            t = fxNow || createFxNow(),
            done = true,
            elem = this.elem,
            options = this.options;
        if (gotoEnd || t >= options.duration + this.startTime) {
          this.now = this.end;
          this.pos = this.state = 1;
          this.update();
          options.animatedProperties[this.prop] = true;
          for (p in options.animatedProperties) {
            if (options.animatedProperties[p] !== true) {
              done = false;
            }
          }
          if (done) {
            if (options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
              jQuery.each(["", "X", "Y"], function(index, value) {
                elem.style["overflow" + value] = options.overflow[index];
              });
            }
            if (options.hide) {
              jQuery(elem).hide();
            }
            if (options.hide || options.show) {
              for (p in options.animatedProperties) {
                jQuery.style(elem, p, options.orig[p]);
                jQuery.removeData(elem, "fxshow" + p, true);
                jQuery.removeData(elem, "toggle" + p, true);
              }
            }
            complete = options.complete;
            if (complete) {
              options.complete = false;
              complete.call(elem);
            }
          }
          return false;
        } else {
          if (options.duration == Infinity) {
            this.now = t;
          } else {
            n = t - this.startTime;
            this.state = n / options.duration;
            this.pos = jQuery.easing[options.animatedProperties[this.prop]](this.state, n, 0, 1, options.duration);
            this.now = this.start + ((this.end - this.start) * this.pos);
          }
          this.update();
        }
        return true;
      }
    };
    jQuery.extend(jQuery.fx, {
      tick: function() {
        var timer,
            timers = jQuery.timers,
            i = 0;
        for (; i < timers.length; i++) {
          timer = timers[i];
          if (!timer() && timers[i] === timer) {
            timers.splice(i--, 1);
          }
        }
        if (!timers.length) {
          jQuery.fx.stop();
        }
      },
      interval: 13,
      stop: function() {
        clearInterval(timerId);
        timerId = null;
      },
      speeds: {
        slow: 600,
        fast: 200,
        _default: 400
      },
      step: {
        opacity: function(fx) {
          jQuery.style(fx.elem, "opacity", fx.now);
        },
        _default: function(fx) {
          if (fx.elem.style && fx.elem.style[fx.prop] != null) {
            fx.elem.style[fx.prop] = fx.now + fx.unit;
          } else {
            fx.elem[fx.prop] = fx.now;
          }
        }
      }
    });
    jQuery.each(fxAttrs.concat.apply([], fxAttrs), function(i, prop) {
      if (prop.indexOf("margin")) {
        jQuery.fx.step[prop] = function(fx) {
          jQuery.style(fx.elem, prop, Math.max(0, fx.now) + fx.unit);
        };
      }
    });
    if (jQuery.expr && jQuery.expr.filters) {
      jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
          return elem === fn.elem;
        }).length;
      };
    }
    function defaultDisplay(nodeName) {
      if (!elemdisplay[nodeName]) {
        var body = document.body,
            elem = jQuery("<" + nodeName + ">").appendTo(body),
            display = elem.css("display");
        elem.remove();
        if (display === "none" || display === "") {
          if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.frameBorder = iframe.width = iframe.height = 0;
          }
          body.appendChild(iframe);
          if (!iframeDoc || !iframe.createElement) {
            iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
            iframeDoc.write((jQuery.support.boxModel ? "<!doctype html>" : "") + "<html><body>");
            iframeDoc.close();
          }
          elem = iframeDoc.createElement(nodeName);
          iframeDoc.body.appendChild(elem);
          display = jQuery.css(elem, "display");
          body.removeChild(iframe);
        }
        elemdisplay[nodeName] = display;
      }
      return elemdisplay[nodeName];
    }
    var getOffset,
        rtable = /^t(?:able|d|h)$/i,
        rroot = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in document.documentElement) {
      getOffset = function(elem, doc, docElem, box) {
        try {
          box = elem.getBoundingClientRect();
        } catch (e) {}
        if (!box || !jQuery.contains(docElem, elem)) {
          return box ? {
            top: box.top,
            left: box.left
          } : {
            top: 0,
            left: 0
          };
        }
        var body = doc.body,
            win = getWindow(doc),
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop,
            scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
            top = box.top + scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;
        return {
          top: top,
          left: left
        };
      };
    } else {
      getOffset = function(elem, doc, docElem) {
        var computedStyle,
            offsetParent = elem.offsetParent,
            prevOffsetParent = elem,
            body = doc.body,
            defaultView = doc.defaultView,
            prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle,
            top = elem.offsetTop,
            left = elem.offsetLeft;
        while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
          if (jQuery.support.fixedPosition && prevComputedStyle.position === "fixed") {
            break;
          }
          computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
          top -= elem.scrollTop;
          left -= elem.scrollLeft;
          if (elem === offsetParent) {
            top += elem.offsetTop;
            left += elem.offsetLeft;
            if (jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
              top += parseFloat(computedStyle.borderTopWidth) || 0;
              left += parseFloat(computedStyle.borderLeftWidth) || 0;
            }
            prevOffsetParent = offsetParent;
            offsetParent = elem.offsetParent;
          }
          if (jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
            top += parseFloat(computedStyle.borderTopWidth) || 0;
            left += parseFloat(computedStyle.borderLeftWidth) || 0;
          }
          prevComputedStyle = computedStyle;
        }
        if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
          top += body.offsetTop;
          left += body.offsetLeft;
        }
        if (jQuery.support.fixedPosition && prevComputedStyle.position === "fixed") {
          top += Math.max(docElem.scrollTop, body.scrollTop);
          left += Math.max(docElem.scrollLeft, body.scrollLeft);
        }
        return {
          top: top,
          left: left
        };
      };
    }
    jQuery.fn.offset = function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var elem = this[0],
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return null;
      }
      if (elem === doc.body) {
        return jQuery.offset.bodyOffset(elem);
      }
      return getOffset(elem, doc, doc.documentElement);
    };
    jQuery.offset = {
      bodyOffset: function(body) {
        var top = body.offsetTop,
            left = body.offsetLeft;
        if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
          top += parseFloat(jQuery.css(body, "marginTop")) || 0;
          left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
        }
        return {
          top: top,
          left: left
        };
      },
      setOffset: function(elem, options, i) {
        var position = jQuery.css(elem, "position");
        if (position === "static") {
          elem.style.position = "relative";
        }
        var curElem = jQuery(elem),
            curOffset = curElem.offset(),
            curCSSTop = jQuery.css(elem, "top"),
            curCSSLeft = jQuery.css(elem, "left"),
            calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
            props = {},
            curPosition = {},
            curTop,
            curLeft;
        if (calculatePosition) {
          curPosition = curElem.position();
          curTop = curPosition.top;
          curLeft = curPosition.left;
        } else {
          curTop = parseFloat(curCSSTop) || 0;
          curLeft = parseFloat(curCSSLeft) || 0;
        }
        if (jQuery.isFunction(options)) {
          options = options.call(elem, i, curOffset);
        }
        if (options.top != null) {
          props.top = (options.top - curOffset.top) + curTop;
        }
        if (options.left != null) {
          props.left = (options.left - curOffset.left) + curLeft;
        }
        if ("using" in options) {
          options.using.call(elem, props);
        } else {
          curElem.css(props);
        }
      }
    };
    jQuery.fn.extend({
      position: function() {
        if (!this[0]) {
          return null;
        }
        var elem = this[0],
            offsetParent = this.offsetParent(),
            offset = this.offset(),
            parentOffset = rroot.test(offsetParent[0].nodeName) ? {
              top: 0,
              left: 0
            } : offsetParent.offset();
        offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
        offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
        parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
        parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
        return {
          top: offset.top - parentOffset.top,
          left: offset.left - parentOffset.left
        };
      },
      offsetParent: function() {
        return this.map(function() {
          var offsetParent = this.offsetParent || document.body;
          while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
            offsetParent = offsetParent.offsetParent;
          }
          return offsetParent;
        });
      }
    });
    jQuery.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function(method, prop) {
      var top = /Y/.test(prop);
      jQuery.fn[method] = function(val) {
        return jQuery.access(this, function(elem, method, val) {
          var win = getWindow(elem);
          if (val === undefined) {
            return win ? (prop in win) ? win[prop] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
          }
          if (win) {
            win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
          } else {
            elem[method] = val;
          }
        }, method, val, arguments.length, null);
      };
    });
    function getWindow(elem) {
      return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each({
      Height: "height",
      Width: "width"
    }, function(name, type) {
      var clientProp = "client" + name,
          scrollProp = "scroll" + name,
          offsetProp = "offset" + name;
      jQuery.fn["inner" + name] = function() {
        var elem = this[0];
        return elem ? elem.style ? parseFloat(jQuery.css(elem, type, "padding")) : this[type]() : null;
      };
      jQuery.fn["outer" + name] = function(margin) {
        var elem = this[0];
        return elem ? elem.style ? parseFloat(jQuery.css(elem, type, margin ? "margin" : "border")) : this[type]() : null;
      };
      jQuery.fn[type] = function(value) {
        return jQuery.access(this, function(elem, type, value) {
          var doc,
              docElemProp,
              orig,
              ret;
          if (jQuery.isWindow(elem)) {
            doc = elem.document;
            docElemProp = doc.documentElement[clientProp];
            return jQuery.support.boxModel && docElemProp || doc.body && doc.body[clientProp] || docElemProp;
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            if (doc[clientProp] >= doc[scrollProp]) {
              return doc[clientProp];
            }
            return Math.max(elem.body[scrollProp], doc[scrollProp], elem.body[offsetProp], doc[offsetProp]);
          }
          if (value === undefined) {
            orig = jQuery.css(elem, type);
            ret = parseFloat(orig);
            return jQuery.isNumeric(ret) ? ret : orig;
          }
          jQuery(elem).css(type, value);
        }, type, value, arguments.length, null);
      };
    });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
      define("jquery", [], function() {
        return jQuery;
      });
    }
  })(window);
  (function(window, document) {
    var _jQuery = window.jQuery.noConflict(true);
    var lowercase = function(string) {
      return isString(string) ? string.toLowerCase() : string;
    };
    var uppercase = function(string) {
      return isString(string) ? string.toUpperCase() : string;
    };
    var manualLowercase = function(s) {
      return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
        return String.fromCharCode(ch.charCodeAt(0) | 32);
      }) : s;
    };
    var manualUppercase = function(s) {
      return isString(s) ? s.replace(/[a-z]/g, function(ch) {
        return String.fromCharCode(ch.charCodeAt(0) & ~32);
      }) : s;
    };
    if ('i' !== 'I'.toLowerCase()) {
      lowercase = manualLowercase;
      uppercase = manualUppercase;
    }
    var msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]),
        jqLite,
        jQuery,
        slice = [].slice,
        push = [].push,
        toString = Object.prototype.toString,
        angular = window.angular || (window.angular = {}),
        angularModule,
        nodeName_,
        uid = ['0', '0', '0'];
    function isArrayLike(obj) {
      if (!obj || (typeof obj.length !== 'number'))
        return false;
      if (typeof obj.hasOwnProperty != 'function' && typeof obj.constructor != 'function') {
        return true;
      } else {
        return obj instanceof JQLite || (jQuery && obj instanceof jQuery) || toString.call(obj) !== '[object Object]' || typeof obj.callee === 'function';
      }
    }
    function forEach(obj, iterator, context) {
      var key;
      if (obj) {
        if (isFunction(obj)) {
          for (key in obj) {
            if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
              iterator.call(context, obj[key], key);
            }
          }
        } else if (obj.forEach && obj.forEach !== forEach) {
          obj.forEach(iterator, context);
        } else if (isArrayLike(obj)) {
          for (key = 0; key < obj.length; key++)
            iterator.call(context, obj[key], key);
        } else {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              iterator.call(context, obj[key], key);
            }
          }
        }
      }
      return obj;
    }
    function sortedKeys(obj) {
      var keys = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys.sort();
    }
    function forEachSorted(obj, iterator, context) {
      var keys = sortedKeys(obj);
      for (var i = 0; i < keys.length; i++) {
        iterator.call(context, obj[keys[i]], keys[i]);
      }
      return keys;
    }
    function reverseParams(iteratorFn) {
      return function(value, key) {
        iteratorFn(key, value);
      };
    }
    function nextUid() {
      var index = uid.length;
      var digit;
      while (index) {
        index--;
        digit = uid[index].charCodeAt(0);
        if (digit == 57) {
          uid[index] = 'A';
          return uid.join('');
        }
        if (digit == 90) {
          uid[index] = '0';
        } else {
          uid[index] = String.fromCharCode(digit + 1);
          return uid.join('');
        }
      }
      uid.unshift('0');
      return uid.join('');
    }
    function setHashKey(obj, h) {
      if (h) {
        obj.$$hashKey = h;
      } else {
        delete obj.$$hashKey;
      }
    }
    function extend(dst) {
      var h = dst.$$hashKey;
      forEach(arguments, function(obj) {
        if (obj !== dst) {
          forEach(obj, function(value, key) {
            dst[key] = value;
          });
        }
      });
      setHashKey(dst, h);
      return dst;
    }
    function int(str) {
      return parseInt(str, 10);
    }
    function inherit(parent, extra) {
      return extend(new (extend(function() {}, {prototype: parent}))(), extra);
    }
    function noop() {}
    noop.$inject = [];
    function identity($) {
      return $;
    }
    identity.$inject = [];
    function valueFn(value) {
      return function() {
        return value;
      };
    }
    function isUndefined(value) {
      return typeof value == 'undefined';
    }
    function isDefined(value) {
      return typeof value != 'undefined';
    }
    function isObject(value) {
      return value != null && typeof value == 'object';
    }
    function isString(value) {
      return typeof value == 'string';
    }
    function isNumber(value) {
      return typeof value == 'number';
    }
    function isDate(value) {
      return toString.apply(value) == '[object Date]';
    }
    function isArray(value) {
      return toString.apply(value) == '[object Array]';
    }
    function isFunction(value) {
      return typeof value == 'function';
    }
    function isRegExp(value) {
      return toString.apply(value) == '[object RegExp]';
    }
    function isWindow(obj) {
      return obj && obj.document && obj.location && obj.alert && obj.setInterval;
    }
    function isScope(obj) {
      return obj && obj.$evalAsync && obj.$watch;
    }
    function isFile(obj) {
      return toString.apply(obj) === '[object File]';
    }
    function isBoolean(value) {
      return typeof value == 'boolean';
    }
    var trim = (function() {
      if (!String.prototype.trim) {
        return function(value) {
          return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
        };
      }
      return function(value) {
        return isString(value) ? value.trim() : value;
      };
    })();
    function isElement(node) {
      return node && (node.nodeName || (node.bind && node.find));
    }
    function makeMap(str) {
      var obj = {},
          items = str.split(","),
          i;
      for (i = 0; i < items.length; i++)
        obj[items[i]] = true;
      return obj;
    }
    if (msie < 9) {
      nodeName_ = function(element) {
        element = element.nodeName ? element : element[0];
        return (element.scopeName && element.scopeName != 'HTML') ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
      };
    } else {
      nodeName_ = function(element) {
        return element.nodeName ? element.nodeName : element[0].nodeName;
      };
    }
    function map(obj, iterator, context) {
      var results = [];
      forEach(obj, function(value, index, list) {
        results.push(iterator.call(context, value, index, list));
      });
      return results;
    }
    function size(obj, ownPropsOnly) {
      var size = 0,
          key;
      if (isArray(obj) || isString(obj)) {
        return obj.length;
      } else if (isObject(obj)) {
        for (key in obj)
          if (!ownPropsOnly || obj.hasOwnProperty(key))
            size++;
      }
      return size;
    }
    function includes(array, obj) {
      return indexOf(array, obj) != -1;
    }
    function indexOf(array, obj) {
      if (array.indexOf)
        return array.indexOf(obj);
      for (var i = 0; i < array.length; i++) {
        if (obj === array[i])
          return i;
      }
      return -1;
    }
    function arrayRemove(array, value) {
      var index = indexOf(array, value);
      if (index >= 0)
        array.splice(index, 1);
      return value;
    }
    function isLeafNode(node) {
      if (node) {
        switch (node.nodeName) {
          case "OPTION":
          case "PRE":
          case "TITLE":
            return true;
        }
      }
      return false;
    }
    function copy(source, destination) {
      if (isWindow(source) || isScope(source))
        throw Error("Can't copy Window or Scope");
      if (!destination) {
        destination = source;
        if (source) {
          if (isArray(source)) {
            destination = copy(source, []);
          } else if (isDate(source)) {
            destination = new Date(source.getTime());
          } else if (isRegExp(source)) {
            destination = new RegExp(source.source);
          } else if (isObject(source)) {
            destination = copy(source, {});
          }
        }
      } else {
        if (source === destination)
          throw Error("Can't copy equivalent objects or arrays");
        if (isArray(source)) {
          destination.length = 0;
          for (var i = 0; i < source.length; i++) {
            destination.push(copy(source[i]));
          }
        } else {
          var h = destination.$$hashKey;
          forEach(destination, function(value, key) {
            delete destination[key];
          });
          for (var key in source) {
            destination[key] = copy(source[key]);
          }
          setHashKey(destination, h);
        }
      }
      return destination;
    }
    function shallowCopy(src, dst) {
      dst = dst || {};
      for (var key in src) {
        if (src.hasOwnProperty(key) && key.substr(0, 2) !== '$$') {
          dst[key] = src[key];
        }
      }
      return dst;
    }
    function equals(o1, o2) {
      if (o1 === o2)
        return true;
      if (o1 === null || o2 === null)
        return false;
      if (o1 !== o1 && o2 !== o2)
        return true;
      var t1 = typeof o1,
          t2 = typeof o2,
          length,
          key,
          keySet;
      if (t1 == t2) {
        if (t1 == 'object') {
          if (isArray(o1)) {
            if (!isArray(o2))
              return false;
            if ((length = o1.length) == o2.length) {
              for (key = 0; key < length; key++) {
                if (!equals(o1[key], o2[key]))
                  return false;
              }
              return true;
            }
          } else if (isDate(o1)) {
            return isDate(o2) && o1.getTime() == o2.getTime();
          } else if (isRegExp(o1) && isRegExp(o2)) {
            return o1.toString() == o2.toString();
          } else {
            if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2))
              return false;
            keySet = {};
            for (key in o1) {
              if (key.charAt(0) === '$' || isFunction(o1[key]))
                continue;
              if (!equals(o1[key], o2[key]))
                return false;
              keySet[key] = true;
            }
            for (key in o2) {
              if (!keySet[key] && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key]))
                return false;
            }
            return true;
          }
        }
      }
      return false;
    }
    function concat(array1, array2, index) {
      return array1.concat(slice.call(array2, index));
    }
    function sliceArgs(args, startIndex) {
      return slice.call(args, startIndex || 0);
    }
    function bind(self, fn) {
      var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
      if (isFunction(fn) && !(fn instanceof RegExp)) {
        return curryArgs.length ? function() {
          return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
        } : function() {
          return arguments.length ? fn.apply(self, arguments) : fn.call(self);
        };
      } else {
        return fn;
      }
    }
    function toJsonReplacer(key, value) {
      var val = value;
      if (/^\$+/.test(key)) {
        val = undefined;
      } else if (isWindow(value)) {
        val = '$WINDOW';
      } else if (value && document === value) {
        val = '$DOCUMENT';
      } else if (isScope(value)) {
        val = '$SCOPE';
      }
      return val;
    }
    function toJson(obj, pretty) {
      if (typeof obj === 'undefined')
        return undefined;
      return JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
    }
    function fromJson(json) {
      return isString(json) ? JSON.parse(json) : json;
    }
    function toBoolean(value) {
      if (value && value.length !== 0) {
        var v = lowercase("" + value);
        value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
      } else {
        value = false;
      }
      return value;
    }
    function startingTag(element) {
      element = jqLite(element).clone();
      try {
        element.html('');
      } catch (e) {}
      var TEXT_NODE = 3;
      var elemHtml = jqLite('<div>').append(element).html();
      try {
        return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(match, nodeName) {
          return '<' + lowercase(nodeName);
        });
      } catch (e) {
        return lowercase(elemHtml);
      }
    }
    function tryDecodeURIComponent(value) {
      try {
        return decodeURIComponent(value);
      } catch (e) {}
    }
    function parseKeyValue(keyValue) {
      var obj = {},
          key_value,
          key;
      forEach((keyValue || "").split('&'), function(keyValue) {
        if (keyValue) {
          key_value = keyValue.split('=');
          key = tryDecodeURIComponent(key_value[0]);
          if (isDefined(key)) {
            obj[key] = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
          }
        }
      });
      return obj;
    }
    function toKeyValue(obj) {
      var parts = [];
      forEach(obj, function(value, key) {
        parts.push(encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)));
      });
      return parts.length ? parts.join('&') : '';
    }
    function encodeUriSegment(val) {
      return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
    }
    function encodeUriQuery(val, pctEncodeSpaces) {
      return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
    }
    function angularInit(element, bootstrap) {
      var elements = [element],
          appElement,
          module,
          names = ['ng:app', 'ng-app', 'x-ng-app', 'data-ng-app'],
          NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
      function append(element) {
        element && elements.push(element);
      }
      forEach(names, function(name) {
        names[name] = true;
        append(document.getElementById(name));
        name = name.replace(':', '\\:');
        if (element.querySelectorAll) {
          forEach(element.querySelectorAll('.' + name), append);
          forEach(element.querySelectorAll('.' + name + '\\:'), append);
          forEach(element.querySelectorAll('[' + name + ']'), append);
        }
      });
      forEach(elements, function(element) {
        if (!appElement) {
          var className = ' ' + element.className + ' ';
          var match = NG_APP_CLASS_REGEXP.exec(className);
          if (match) {
            appElement = element;
            module = (match[2] || '').replace(/\s+/g, ',');
          } else {
            forEach(element.attributes, function(attr) {
              if (!appElement && names[attr.name]) {
                appElement = element;
                module = attr.value;
              }
            });
          }
        }
      });
      if (appElement) {
        bootstrap(appElement, module ? [module] : []);
      }
    }
    function bootstrap(element, modules) {
      var doBootstrap = function() {
        element = jqLite(element);
        modules = modules || [];
        modules.unshift(['$provide', function($provide) {
          $provide.value('$rootElement', element);
        }]);
        modules.unshift('ng');
        var injector = createInjector(modules);
        injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector', function(scope, element, compile, injector) {
          scope.$apply(function() {
            element.data('$injector', injector);
            compile(element)(scope);
          });
        }]);
        return injector;
      };
      var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
      if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
        return doBootstrap();
      }
      window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
      angular.resumeBootstrap = function(extraModules) {
        forEach(extraModules, function(module) {
          modules.push(module);
        });
        doBootstrap();
      };
    }
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
      separator = separator || '_';
      return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
      });
    }
    function bindJQuery() {
      jQuery = window.jQuery;
      if (jQuery) {
        jqLite = jQuery;
        extend(jQuery.fn, {
          scope: JQLitePrototype.scope,
          controller: JQLitePrototype.controller,
          injector: JQLitePrototype.injector,
          inheritedData: JQLitePrototype.inheritedData
        });
        JQLitePatchJQueryRemove('remove', true, true, false);
        JQLitePatchJQueryRemove('empty', false, false, false);
        JQLitePatchJQueryRemove('html', false, false, true);
      } else {
        jqLite = JQLite;
      }
      angular.element = jqLite;
    }
    function assertArg(arg, name, reason) {
      if (!arg) {
        throw new Error("Argument '" + (name || '?') + "' is " + (reason || "required"));
      }
      return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
      if (acceptArrayAnnotation && isArray(arg)) {
        arg = arg[arg.length - 1];
      }
      assertArg(isFunction(arg), name, 'not a function, got ' + (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
      return arg;
    }
    function getter(obj, path, bindFnToScope) {
      if (!path)
        return obj;
      var keys = path.split('.');
      var key;
      var lastInstance = obj;
      var len = keys.length;
      for (var i = 0; i < len; i++) {
        key = keys[i];
        if (obj) {
          obj = (lastInstance = obj)[key];
        }
      }
      if (!bindFnToScope && isFunction(obj)) {
        return bind(lastInstance, obj);
      }
      return obj;
    }
    function setupModuleLoader(window) {
      function ensure(obj, name, factory) {
        return obj[name] || (obj[name] = factory());
      }
      return ensure(ensure(window, 'angular', Object), 'module', function() {
        var modules = {};
        return function module(name, requires, configFn) {
          if (requires && modules.hasOwnProperty(name)) {
            modules[name] = null;
          }
          return ensure(modules, name, function() {
            if (!requires) {
              throw Error('No module: ' + name);
            }
            var invokeQueue = [];
            var runBlocks = [];
            var config = invokeLater('$injector', 'invoke');
            var moduleInstance = {
              _invokeQueue: invokeQueue,
              _runBlocks: runBlocks,
              requires: requires,
              name: name,
              provider: invokeLater('$provide', 'provider'),
              factory: invokeLater('$provide', 'factory'),
              service: invokeLater('$provide', 'service'),
              value: invokeLater('$provide', 'value'),
              constant: invokeLater('$provide', 'constant', 'unshift'),
              filter: invokeLater('$filterProvider', 'register'),
              controller: invokeLater('$controllerProvider', 'register'),
              directive: invokeLater('$compileProvider', 'directive'),
              config: config,
              run: function(block) {
                runBlocks.push(block);
                return this;
              }
            };
            if (configFn) {
              config(configFn);
            }
            return moduleInstance;
            function invokeLater(provider, method, insertMethod) {
              return function() {
                invokeQueue[insertMethod || 'push']([provider, method, arguments]);
                return moduleInstance;
              };
            }
          });
        };
      });
    }
    var version = {
      full: '1.0.8',
      major: 1,
      minor: 0,
      dot: 8,
      codeName: 'bubble-burst'
    };
    function publishExternalAPI(angular) {
      extend(angular, {
        'bootstrap': bootstrap,
        'copy': copy,
        'extend': extend,
        'equals': equals,
        'element': jqLite,
        'forEach': forEach,
        'injector': createInjector,
        'noop': noop,
        'bind': bind,
        'toJson': toJson,
        'fromJson': fromJson,
        'identity': identity,
        'isUndefined': isUndefined,
        'isDefined': isDefined,
        'isString': isString,
        'isFunction': isFunction,
        'isObject': isObject,
        'isNumber': isNumber,
        'isElement': isElement,
        'isArray': isArray,
        'version': version,
        'isDate': isDate,
        'lowercase': lowercase,
        'uppercase': uppercase,
        'callbacks': {counter: 0}
      });
      angularModule = setupModuleLoader(window);
      try {
        angularModule('ngLocale');
      } catch (e) {
        angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
      }
      angularModule('ng', ['ngLocale'], ['$provide', function ngModule($provide) {
        $provide.provider('$compile', $CompileProvider).directive({
          a: htmlAnchorDirective,
          input: inputDirective,
          textarea: inputDirective,
          form: formDirective,
          script: scriptDirective,
          select: selectDirective,
          style: styleDirective,
          option: optionDirective,
          ngBind: ngBindDirective,
          ngBindHtmlUnsafe: ngBindHtmlUnsafeDirective,
          ngBindTemplate: ngBindTemplateDirective,
          ngClass: ngClassDirective,
          ngClassEven: ngClassEvenDirective,
          ngClassOdd: ngClassOddDirective,
          ngCsp: ngCspDirective,
          ngCloak: ngCloakDirective,
          ngController: ngControllerDirective,
          ngForm: ngFormDirective,
          ngHide: ngHideDirective,
          ngInclude: ngIncludeDirective,
          ngInit: ngInitDirective,
          ngNonBindable: ngNonBindableDirective,
          ngPluralize: ngPluralizeDirective,
          ngRepeat: ngRepeatDirective,
          ngShow: ngShowDirective,
          ngStyle: ngStyleDirective,
          ngSwitch: ngSwitchDirective,
          ngSwitchWhen: ngSwitchWhenDirective,
          ngSwitchDefault: ngSwitchDefaultDirective,
          ngOptions: ngOptionsDirective,
          ngView: ngViewDirective,
          ngTransclude: ngTranscludeDirective,
          ngModel: ngModelDirective,
          ngList: ngListDirective,
          ngChange: ngChangeDirective,
          required: requiredDirective,
          ngRequired: requiredDirective,
          ngValue: ngValueDirective
        }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
        $provide.provider({
          $anchorScroll: $AnchorScrollProvider,
          $browser: $BrowserProvider,
          $cacheFactory: $CacheFactoryProvider,
          $controller: $ControllerProvider,
          $document: $DocumentProvider,
          $exceptionHandler: $ExceptionHandlerProvider,
          $filter: $FilterProvider,
          $interpolate: $InterpolateProvider,
          $http: $HttpProvider,
          $httpBackend: $HttpBackendProvider,
          $location: $LocationProvider,
          $log: $LogProvider,
          $parse: $ParseProvider,
          $route: $RouteProvider,
          $routeParams: $RouteParamsProvider,
          $rootScope: $RootScopeProvider,
          $q: $QProvider,
          $sniffer: $SnifferProvider,
          $templateCache: $TemplateCacheProvider,
          $timeout: $TimeoutProvider,
          $window: $WindowProvider
        });
      }]);
    }
    var jqCache = JQLite.cache = {},
        jqName = JQLite.expando = 'ng-' + new Date().getTime(),
        jqId = 1,
        addEventListenerFn = (window.document.addEventListener ? function(element, type, fn) {
          element.addEventListener(type, fn, false);
        } : function(element, type, fn) {
          element.attachEvent('on' + type, fn);
        }),
        removeEventListenerFn = (window.document.removeEventListener ? function(element, type, fn) {
          element.removeEventListener(type, fn, false);
        } : function(element, type, fn) {
          element.detachEvent('on' + type, fn);
        });
    function jqNextId() {
      return ++jqId;
    }
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    function camelCase(name) {
      return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    function JQLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments) {
      var originalJqFn = jQuery.fn[name];
      originalJqFn = originalJqFn.$original || originalJqFn;
      removePatch.$original = originalJqFn;
      jQuery.fn[name] = removePatch;
      function removePatch(param) {
        var list = filterElems && param ? [this.filter(param)] : [this],
            fireEvent = dispatchThis,
            set,
            setIndex,
            setLength,
            element,
            childIndex,
            childLength,
            children;
        if (!getterIfNoArguments || param != null) {
          while (list.length) {
            set = list.shift();
            for (setIndex = 0, setLength = set.length; setIndex < setLength; setIndex++) {
              element = jqLite(set[setIndex]);
              if (fireEvent) {
                element.triggerHandler('$destroy');
              } else {
                fireEvent = !fireEvent;
              }
              for (childIndex = 0, childLength = (children = element.children()).length; childIndex < childLength; childIndex++) {
                list.push(jQuery(children[childIndex]));
              }
            }
          }
        }
        return originalJqFn.apply(this, arguments);
      }
    }
    function JQLite(element) {
      if (element instanceof JQLite) {
        return element;
      }
      if (!(this instanceof JQLite)) {
        if (isString(element) && element.charAt(0) != '<') {
          throw Error('selectors not implemented');
        }
        return new JQLite(element);
      }
      if (isString(element)) {
        var div = document.createElement('div');
        div.innerHTML = '<div>&#160;</div>' + element;
        div.removeChild(div.firstChild);
        JQLiteAddNodes(this, div.childNodes);
        this.remove();
      } else {
        JQLiteAddNodes(this, element);
      }
    }
    function JQLiteClone(element) {
      return element.cloneNode(true);
    }
    function JQLiteDealoc(element) {
      JQLiteRemoveData(element);
      for (var i = 0,
          children = element.childNodes || []; i < children.length; i++) {
        JQLiteDealoc(children[i]);
      }
    }
    function JQLiteUnbind(element, type, fn) {
      var events = JQLiteExpandoStore(element, 'events'),
          handle = JQLiteExpandoStore(element, 'handle');
      if (!handle)
        return;
      if (isUndefined(type)) {
        forEach(events, function(eventHandler, type) {
          removeEventListenerFn(element, type, eventHandler);
          delete events[type];
        });
      } else {
        if (isUndefined(fn)) {
          removeEventListenerFn(element, type, events[type]);
          delete events[type];
        } else {
          arrayRemove(events[type] || [], fn);
        }
      }
    }
    function JQLiteRemoveData(element) {
      var expandoId = element[jqName],
          expandoStore = jqCache[expandoId];
      if (expandoStore) {
        if (expandoStore.handle) {
          expandoStore.events.$destroy && expandoStore.handle({}, '$destroy');
          JQLiteUnbind(element);
        }
        delete jqCache[expandoId];
        element[jqName] = undefined;
      }
    }
    function JQLiteExpandoStore(element, key, value) {
      var expandoId = element[jqName],
          expandoStore = jqCache[expandoId || -1];
      if (isDefined(value)) {
        if (!expandoStore) {
          element[jqName] = expandoId = jqNextId();
          expandoStore = jqCache[expandoId] = {};
        }
        expandoStore[key] = value;
      } else {
        return expandoStore && expandoStore[key];
      }
    }
    function JQLiteData(element, key, value) {
      var data = JQLiteExpandoStore(element, 'data'),
          isSetter = isDefined(value),
          keyDefined = !isSetter && isDefined(key),
          isSimpleGetter = keyDefined && !isObject(key);
      if (!data && !isSimpleGetter) {
        JQLiteExpandoStore(element, 'data', data = {});
      }
      if (isSetter) {
        data[key] = value;
      } else {
        if (keyDefined) {
          if (isSimpleGetter) {
            return data && data[key];
          } else {
            extend(data, key);
          }
        } else {
          return data;
        }
      }
    }
    function JQLiteHasClass(element, selector) {
      return ((" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1);
    }
    function JQLiteRemoveClass(element, cssClasses) {
      if (cssClasses) {
        forEach(cssClasses.split(' '), function(cssClass) {
          element.className = trim((" " + element.className + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " "));
        });
      }
    }
    function JQLiteAddClass(element, cssClasses) {
      if (cssClasses) {
        forEach(cssClasses.split(' '), function(cssClass) {
          if (!JQLiteHasClass(element, cssClass)) {
            element.className = trim(element.className + ' ' + trim(cssClass));
          }
        });
      }
    }
    function JQLiteAddNodes(root, elements) {
      if (elements) {
        elements = (!elements.nodeName && isDefined(elements.length) && !isWindow(elements)) ? elements : [elements];
        for (var i = 0; i < elements.length; i++) {
          root.push(elements[i]);
        }
      }
    }
    function JQLiteController(element, name) {
      return JQLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
    }
    function JQLiteInheritedData(element, name, value) {
      element = jqLite(element);
      if (element[0].nodeType == 9) {
        element = element.find('html');
      }
      while (element.length) {
        if (value = element.data(name))
          return value;
        element = element.parent();
      }
    }
    var JQLitePrototype = JQLite.prototype = {
      ready: function(fn) {
        var fired = false;
        function trigger() {
          if (fired)
            return;
          fired = true;
          fn();
        }
        this.bind('DOMContentLoaded', trigger);
        JQLite(window).bind('load', trigger);
      },
      toString: function() {
        var value = [];
        forEach(this, function(e) {
          value.push('' + e);
        });
        return '[' + value.join(', ') + ']';
      },
      eq: function(index) {
        return (index >= 0) ? jqLite(this[index]) : jqLite(this[this.length + index]);
      },
      length: 0,
      push: push,
      sort: [].sort,
      splice: [].splice
    };
    var BOOLEAN_ATTR = {};
    forEach('multiple,selected,checked,disabled,readOnly,required'.split(','), function(value) {
      BOOLEAN_ATTR[lowercase(value)] = value;
    });
    var BOOLEAN_ELEMENTS = {};
    forEach('input,select,option,textarea,button,form'.split(','), function(value) {
      BOOLEAN_ELEMENTS[uppercase(value)] = true;
    });
    function getBooleanAttrName(element, name) {
      var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
      return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
    }
    forEach({
      data: JQLiteData,
      inheritedData: JQLiteInheritedData,
      scope: function(element) {
        return JQLiteInheritedData(element, '$scope');
      },
      controller: JQLiteController,
      injector: function(element) {
        return JQLiteInheritedData(element, '$injector');
      },
      removeAttr: function(element, name) {
        element.removeAttribute(name);
      },
      hasClass: JQLiteHasClass,
      css: function(element, name, value) {
        name = camelCase(name);
        if (isDefined(value)) {
          element.style[name] = value;
        } else {
          var val;
          if (msie <= 8) {
            val = element.currentStyle && element.currentStyle[name];
            if (val === '')
              val = 'auto';
          }
          val = val || element.style[name];
          if (msie <= 8) {
            val = (val === '') ? undefined : val;
          }
          return val;
        }
      },
      attr: function(element, name, value) {
        var lowercasedName = lowercase(name);
        if (BOOLEAN_ATTR[lowercasedName]) {
          if (isDefined(value)) {
            if (!!value) {
              element[name] = true;
              element.setAttribute(name, lowercasedName);
            } else {
              element[name] = false;
              element.removeAttribute(lowercasedName);
            }
          } else {
            return (element[name] || (element.attributes.getNamedItem(name) || noop).specified) ? lowercasedName : undefined;
          }
        } else if (isDefined(value)) {
          element.setAttribute(name, value);
        } else if (element.getAttribute) {
          var ret = element.getAttribute(name, 2);
          return ret === null ? undefined : ret;
        }
      },
      prop: function(element, name, value) {
        if (isDefined(value)) {
          element[name] = value;
        } else {
          return element[name];
        }
      },
      text: extend((msie < 9) ? function(element, value) {
        if (element.nodeType == 1) {
          if (isUndefined(value))
            return element.innerText;
          element.innerText = value;
        } else {
          if (isUndefined(value))
            return element.nodeValue;
          element.nodeValue = value;
        }
      } : function(element, value) {
        if (isUndefined(value)) {
          return element.textContent;
        }
        element.textContent = value;
      }, {$dv: ''}),
      val: function(element, value) {
        if (isUndefined(value)) {
          if (nodeName_(element) === 'SELECT' && element.multiple) {
            var result = [];
            forEach(element.options, function(option) {
              if (option.selected) {
                result.push(option.value || option.text);
              }
            });
            return result.length === 0 ? null : result;
          }
          return element.value;
        }
        element.value = value;
      },
      html: function(element, value) {
        if (isUndefined(value)) {
          return element.innerHTML;
        }
        for (var i = 0,
            childNodes = element.childNodes; i < childNodes.length; i++) {
          JQLiteDealoc(childNodes[i]);
        }
        element.innerHTML = value;
      }
    }, function(fn, name) {
      JQLite.prototype[name] = function(arg1, arg2) {
        var i,
            key;
        if (((fn.length == 2 && (fn !== JQLiteHasClass && fn !== JQLiteController)) ? arg1 : arg2) === undefined) {
          if (isObject(arg1)) {
            for (i = 0; i < this.length; i++) {
              if (fn === JQLiteData) {
                fn(this[i], arg1);
              } else {
                for (key in arg1) {
                  fn(this[i], key, arg1[key]);
                }
              }
            }
            return this;
          } else {
            if (this.length)
              return fn(this[0], arg1, arg2);
          }
        } else {
          for (i = 0; i < this.length; i++) {
            fn(this[i], arg1, arg2);
          }
          return this;
        }
        return fn.$dv;
      };
    });
    function createEventHandler(element, events) {
      var eventHandler = function(event, type) {
        if (!event.preventDefault) {
          event.preventDefault = function() {
            event.returnValue = false;
          };
        }
        if (!event.stopPropagation) {
          event.stopPropagation = function() {
            event.cancelBubble = true;
          };
        }
        if (!event.target) {
          event.target = event.srcElement || document;
        }
        if (isUndefined(event.defaultPrevented)) {
          var prevent = event.preventDefault;
          event.preventDefault = function() {
            event.defaultPrevented = true;
            prevent.call(event);
          };
          event.defaultPrevented = false;
        }
        event.isDefaultPrevented = function() {
          return event.defaultPrevented;
        };
        forEach(events[type || event.type], function(fn) {
          fn.call(element, event);
        });
        if (msie <= 8) {
          event.preventDefault = null;
          event.stopPropagation = null;
          event.isDefaultPrevented = null;
        } else {
          delete event.preventDefault;
          delete event.stopPropagation;
          delete event.isDefaultPrevented;
        }
      };
      eventHandler.elem = element;
      return eventHandler;
    }
    forEach({
      removeData: JQLiteRemoveData,
      dealoc: JQLiteDealoc,
      bind: function bindFn(element, type, fn) {
        var events = JQLiteExpandoStore(element, 'events'),
            handle = JQLiteExpandoStore(element, 'handle');
        if (!events)
          JQLiteExpandoStore(element, 'events', events = {});
        if (!handle)
          JQLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events));
        forEach(type.split(' '), function(type) {
          var eventFns = events[type];
          if (!eventFns) {
            if (type == 'mouseenter' || type == 'mouseleave') {
              var contains = document.body.contains || document.body.compareDocumentPosition ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
              } : function(a, b) {
                if (b) {
                  while ((b = b.parentNode)) {
                    if (b === a) {
                      return true;
                    }
                  }
                }
                return false;
              };
              events[type] = [];
              var eventmap = {
                mouseleave: "mouseout",
                mouseenter: "mouseover"
              };
              bindFn(element, eventmap[type], function(event) {
                var ret,
                    target = this,
                    related = event.relatedTarget;
                if (!related || (related !== target && !contains(target, related))) {
                  handle(event, type);
                }
              });
            } else {
              addEventListenerFn(element, type, handle);
              events[type] = [];
            }
            eventFns = events[type];
          }
          eventFns.push(fn);
        });
      },
      unbind: JQLiteUnbind,
      replaceWith: function(element, replaceNode) {
        var index,
            parent = element.parentNode;
        JQLiteDealoc(element);
        forEach(new JQLite(replaceNode), function(node) {
          if (index) {
            parent.insertBefore(node, index.nextSibling);
          } else {
            parent.replaceChild(node, element);
          }
          index = node;
        });
      },
      children: function(element) {
        var children = [];
        forEach(element.childNodes, function(element) {
          if (element.nodeType === 1)
            children.push(element);
        });
        return children;
      },
      contents: function(element) {
        return element.childNodes || [];
      },
      append: function(element, node) {
        forEach(new JQLite(node), function(child) {
          if (element.nodeType === 1)
            element.appendChild(child);
        });
      },
      prepend: function(element, node) {
        if (element.nodeType === 1) {
          var index = element.firstChild;
          forEach(new JQLite(node), function(child) {
            element.insertBefore(child, index);
          });
        }
      },
      wrap: function(element, wrapNode) {
        wrapNode = jqLite(wrapNode)[0];
        var parent = element.parentNode;
        if (parent) {
          parent.replaceChild(wrapNode, element);
        }
        wrapNode.appendChild(element);
      },
      remove: function(element) {
        JQLiteDealoc(element);
        var parent = element.parentNode;
        if (parent)
          parent.removeChild(element);
      },
      after: function(element, newElement) {
        var index = element,
            parent = element.parentNode;
        forEach(new JQLite(newElement), function(node) {
          parent.insertBefore(node, index.nextSibling);
          index = node;
        });
      },
      addClass: JQLiteAddClass,
      removeClass: JQLiteRemoveClass,
      toggleClass: function(element, selector, condition) {
        if (isUndefined(condition)) {
          condition = !JQLiteHasClass(element, selector);
        }
        (condition ? JQLiteAddClass : JQLiteRemoveClass)(element, selector);
      },
      parent: function(element) {
        var parent = element.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      next: function(element) {
        if (element.nextElementSibling) {
          return element.nextElementSibling;
        }
        var elm = element.nextSibling;
        while (elm != null && elm.nodeType !== 1) {
          elm = elm.nextSibling;
        }
        return elm;
      },
      find: function(element, selector) {
        return element.getElementsByTagName(selector);
      },
      clone: JQLiteClone,
      triggerHandler: function(element, eventName) {
        var eventFns = (JQLiteExpandoStore(element, 'events') || {})[eventName];
        forEach(eventFns, function(fn) {
          fn.call(element, null);
        });
      }
    }, function(fn, name) {
      JQLite.prototype[name] = function(arg1, arg2) {
        var value;
        for (var i = 0; i < this.length; i++) {
          if (value == undefined) {
            value = fn(this[i], arg1, arg2);
            if (value !== undefined) {
              value = jqLite(value);
            }
          } else {
            JQLiteAddNodes(value, fn(this[i], arg1, arg2));
          }
        }
        return value == undefined ? this : value;
      };
    });
    function hashKey(obj) {
      var objType = typeof obj,
          key;
      if (objType == 'object' && obj !== null) {
        if (typeof(key = obj.$$hashKey) == 'function') {
          key = obj.$$hashKey();
        } else if (key === undefined) {
          key = obj.$$hashKey = nextUid();
        }
      } else {
        key = obj;
      }
      return objType + ':' + key;
    }
    function HashMap(array) {
      forEach(array, this.put, this);
    }
    HashMap.prototype = {
      put: function(key, value) {
        this[hashKey(key)] = value;
      },
      get: function(key) {
        return this[hashKey(key)];
      },
      remove: function(key) {
        var value = this[key = hashKey(key)];
        delete this[key];
        return value;
      }
    };
    function HashQueueMap() {}
    HashQueueMap.prototype = {
      push: function(key, value) {
        var array = this[key = hashKey(key)];
        if (!array) {
          this[key] = [value];
        } else {
          array.push(value);
        }
      },
      shift: function(key) {
        var array = this[key = hashKey(key)];
        if (array) {
          if (array.length == 1) {
            delete this[key];
            return array[0];
          } else {
            return array.shift();
          }
        }
      },
      peek: function(key) {
        var array = this[hashKey(key)];
        if (array) {
          return array[0];
        }
      }
    };
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    function annotate(fn) {
      var $inject,
          fnText,
          argDecl,
          last;
      if (typeof fn == 'function') {
        if (!($inject = fn.$inject)) {
          $inject = [];
          fnText = fn.toString().replace(STRIP_COMMENTS, '');
          argDecl = fnText.match(FN_ARGS);
          forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
            arg.replace(FN_ARG, function(all, underscore, name) {
              $inject.push(name);
            });
          });
          fn.$inject = $inject;
        }
      } else if (isArray(fn)) {
        last = fn.length - 1;
        assertArgFn(fn[last], 'fn');
        $inject = fn.slice(0, last);
      } else {
        assertArgFn(fn, 'fn', true);
      }
      return $inject;
    }
    function createInjector(modulesToLoad) {
      var INSTANTIATING = {},
          providerSuffix = 'Provider',
          path = [],
          loadedModules = new HashMap(),
          providerCache = {$provide: {
              provider: supportObject(provider),
              factory: supportObject(factory),
              service: supportObject(service),
              value: supportObject(value),
              constant: supportObject(constant),
              decorator: decorator
            }},
          providerInjector = createInternalInjector(providerCache, function() {
            throw Error("Unknown provider: " + path.join(' <- '));
          }),
          instanceCache = {},
          instanceInjector = (instanceCache.$injector = createInternalInjector(instanceCache, function(servicename) {
            var provider = providerInjector.get(servicename + providerSuffix);
            return instanceInjector.invoke(provider.$get, provider);
          }));
      forEach(loadModules(modulesToLoad), function(fn) {
        instanceInjector.invoke(fn || noop);
      });
      return instanceInjector;
      function supportObject(delegate) {
        return function(key, value) {
          if (isObject(key)) {
            forEach(key, reverseParams(delegate));
          } else {
            return delegate(key, value);
          }
        };
      }
      function provider(name, provider_) {
        if (isFunction(provider_) || isArray(provider_)) {
          provider_ = providerInjector.instantiate(provider_);
        }
        if (!provider_.$get) {
          throw Error('Provider ' + name + ' must define $get factory method.');
        }
        return providerCache[name + providerSuffix] = provider_;
      }
      function factory(name, factoryFn) {
        return provider(name, {$get: factoryFn});
      }
      function service(name, constructor) {
        return factory(name, ['$injector', function($injector) {
          return $injector.instantiate(constructor);
        }]);
      }
      function value(name, value) {
        return factory(name, valueFn(value));
      }
      function constant(name, value) {
        providerCache[name] = value;
        instanceCache[name] = value;
      }
      function decorator(serviceName, decorFn) {
        var origProvider = providerInjector.get(serviceName + providerSuffix),
            orig$get = origProvider.$get;
        origProvider.$get = function() {
          var origInstance = instanceInjector.invoke(orig$get, origProvider);
          return instanceInjector.invoke(decorFn, null, {$delegate: origInstance});
        };
      }
      function loadModules(modulesToLoad) {
        var runBlocks = [];
        forEach(modulesToLoad, function(module) {
          if (loadedModules.get(module))
            return;
          loadedModules.put(module, true);
          if (isString(module)) {
            var moduleFn = angularModule(module);
            runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
            try {
              for (var invokeQueue = moduleFn._invokeQueue,
                  i = 0,
                  ii = invokeQueue.length; i < ii; i++) {
                var invokeArgs = invokeQueue[i],
                    provider = invokeArgs[0] == '$injector' ? providerInjector : providerInjector.get(invokeArgs[0]);
                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
              }
            } catch (e) {
              if (e.message)
                e.message += ' from ' + module;
              throw e;
            }
          } else if (isFunction(module)) {
            try {
              runBlocks.push(providerInjector.invoke(module));
            } catch (e) {
              if (e.message)
                e.message += ' from ' + module;
              throw e;
            }
          } else if (isArray(module)) {
            try {
              runBlocks.push(providerInjector.invoke(module));
            } catch (e) {
              if (e.message)
                e.message += ' from ' + String(module[module.length - 1]);
              throw e;
            }
          } else {
            assertArgFn(module, 'module');
          }
        });
        return runBlocks;
      }
      function createInternalInjector(cache, factory) {
        function getService(serviceName) {
          if (typeof serviceName !== 'string') {
            throw Error('Service name expected');
          }
          if (cache.hasOwnProperty(serviceName)) {
            if (cache[serviceName] === INSTANTIATING) {
              throw Error('Circular dependency: ' + path.join(' <- '));
            }
            return cache[serviceName];
          } else {
            try {
              path.unshift(serviceName);
              cache[serviceName] = INSTANTIATING;
              return cache[serviceName] = factory(serviceName);
            } finally {
              path.shift();
            }
          }
        }
        function invoke(fn, self, locals) {
          var args = [],
              $inject = annotate(fn),
              length,
              i,
              key;
          for (i = 0, length = $inject.length; i < length; i++) {
            key = $inject[i];
            args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
          }
          if (!fn.$inject) {
            fn = fn[length];
          }
          switch (self ? -1 : args.length) {
            case 0:
              return fn();
            case 1:
              return fn(args[0]);
            case 2:
              return fn(args[0], args[1]);
            case 3:
              return fn(args[0], args[1], args[2]);
            case 4:
              return fn(args[0], args[1], args[2], args[3]);
            case 5:
              return fn(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return fn(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            case 8:
              return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            case 9:
              return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
            case 10:
              return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
            default:
              return fn.apply(self, args);
          }
        }
        function instantiate(Type, locals) {
          var Constructor = function() {},
              instance,
              returnedValue;
          Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
          instance = new Constructor();
          returnedValue = invoke(Type, instance, locals);
          return isObject(returnedValue) ? returnedValue : instance;
        }
        return {
          invoke: invoke,
          instantiate: instantiate,
          get: getService,
          annotate: annotate
        };
      }
    }
    function $AnchorScrollProvider() {
      var autoScrollingEnabled = true;
      this.disableAutoScrolling = function() {
        autoScrollingEnabled = false;
      };
      this.$get = ['$window', '$location', '$rootScope', function($window, $location, $rootScope) {
        var document = $window.document;
        function getFirstAnchor(list) {
          var result = null;
          forEach(list, function(element) {
            if (!result && lowercase(element.nodeName) === 'a')
              result = element;
          });
          return result;
        }
        function scroll() {
          var hash = $location.hash(),
              elm;
          if (!hash)
            $window.scrollTo(0, 0);
          else if ((elm = document.getElementById(hash)))
            elm.scrollIntoView();
          else if ((elm = getFirstAnchor(document.getElementsByName(hash))))
            elm.scrollIntoView();
          else if (hash === 'top')
            $window.scrollTo(0, 0);
        }
        if (autoScrollingEnabled) {
          $rootScope.$watch(function autoScrollWatch() {
            return $location.hash();
          }, function autoScrollWatchAction() {
            $rootScope.$evalAsync(scroll);
          });
        }
        return scroll;
      }];
    }
    function Browser(window, document, $log, $sniffer) {
      var self = this,
          rawDocument = document[0],
          location = window.location,
          history = window.history,
          setTimeout = window.setTimeout,
          clearTimeout = window.clearTimeout,
          pendingDeferIds = {};
      self.isMock = false;
      var outstandingRequestCount = 0;
      var outstandingRequestCallbacks = [];
      self.$$completeOutstandingRequest = completeOutstandingRequest;
      self.$$incOutstandingRequestCount = function() {
        outstandingRequestCount++;
      };
      function completeOutstandingRequest(fn) {
        try {
          fn.apply(null, sliceArgs(arguments, 1));
        } finally {
          outstandingRequestCount--;
          if (outstandingRequestCount === 0) {
            while (outstandingRequestCallbacks.length) {
              try {
                outstandingRequestCallbacks.pop()();
              } catch (e) {
                $log.error(e);
              }
            }
          }
        }
      }
      self.notifyWhenNoOutstandingRequests = function(callback) {
        forEach(pollFns, function(pollFn) {
          pollFn();
        });
        if (outstandingRequestCount === 0) {
          callback();
        } else {
          outstandingRequestCallbacks.push(callback);
        }
      };
      var pollFns = [],
          pollTimeout;
      self.addPollFn = function(fn) {
        if (isUndefined(pollTimeout))
          startPoller(100, setTimeout);
        pollFns.push(fn);
        return fn;
      };
      function startPoller(interval, setTimeout) {
        (function check() {
          forEach(pollFns, function(pollFn) {
            pollFn();
          });
          pollTimeout = setTimeout(check, interval);
        })();
      }
      var lastBrowserUrl = location.href,
          baseElement = document.find('base'),
          replacedUrl = null;
      self.url = function(url, replace) {
        if (url) {
          if (lastBrowserUrl == url)
            return;
          lastBrowserUrl = url;
          if ($sniffer.history) {
            if (replace)
              history.replaceState(null, '', url);
            else {
              history.pushState(null, '', url);
              baseElement.attr('href', baseElement.attr('href'));
            }
          } else {
            if (replace) {
              location.replace(url);
              replacedUrl = url;
            } else {
              location.href = url;
              replacedUrl = null;
            }
          }
          return self;
        } else {
          return replacedUrl || location.href.replace(/%27/g, "'");
        }
      };
      var urlChangeListeners = [],
          urlChangeInit = false;
      function fireUrlChange() {
        if (lastBrowserUrl == self.url())
          return;
        lastBrowserUrl = self.url();
        forEach(urlChangeListeners, function(listener) {
          listener(self.url());
        });
      }
      self.onUrlChange = function(callback) {
        if (!urlChangeInit) {
          if ($sniffer.history)
            jqLite(window).bind('popstate', fireUrlChange);
          if ($sniffer.hashchange)
            jqLite(window).bind('hashchange', fireUrlChange);
          else
            self.addPollFn(fireUrlChange);
          urlChangeInit = true;
        }
        urlChangeListeners.push(callback);
        return callback;
      };
      self.baseHref = function() {
        var href = baseElement.attr('href');
        return href ? href.replace(/^https?\:\/\/[^\/]*/, '') : '';
      };
      var lastCookies = {};
      var lastCookieString = '';
      var cookiePath = self.baseHref();
      self.cookies = function(name, value) {
        var cookieLength,
            cookieArray,
            cookie,
            i,
            index;
        if (name) {
          if (value === undefined) {
            rawDocument.cookie = escape(name) + "=;path=" + cookiePath + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
          } else {
            if (isString(value)) {
              cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1;
              if (cookieLength > 4096) {
                $log.warn("Cookie '" + name + "' possibly not set or overflowed because it was too large (" + cookieLength + " > 4096 bytes)!");
              }
            }
          }
        } else {
          if (rawDocument.cookie !== lastCookieString) {
            lastCookieString = rawDocument.cookie;
            cookieArray = lastCookieString.split("; ");
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
              cookie = cookieArray[i];
              index = cookie.indexOf('=');
              if (index > 0) {
                var name = unescape(cookie.substring(0, index));
                if (lastCookies[name] === undefined) {
                  lastCookies[name] = unescape(cookie.substring(index + 1));
                }
              }
            }
          }
          return lastCookies;
        }
      };
      self.defer = function(fn, delay) {
        var timeoutId;
        outstandingRequestCount++;
        timeoutId = setTimeout(function() {
          delete pendingDeferIds[timeoutId];
          completeOutstandingRequest(fn);
        }, delay || 0);
        pendingDeferIds[timeoutId] = true;
        return timeoutId;
      };
      self.defer.cancel = function(deferId) {
        if (pendingDeferIds[deferId]) {
          delete pendingDeferIds[deferId];
          clearTimeout(deferId);
          completeOutstandingRequest(noop);
          return true;
        }
        return false;
      };
    }
    function $BrowserProvider() {
      this.$get = ['$window', '$log', '$sniffer', '$document', function($window, $log, $sniffer, $document) {
        return new Browser($window, $document, $log, $sniffer);
      }];
    }
    function $CacheFactoryProvider() {
      this.$get = function() {
        var caches = {};
        function cacheFactory(cacheId, options) {
          if (cacheId in caches) {
            throw Error('cacheId ' + cacheId + ' taken');
          }
          var size = 0,
              stats = extend({}, options, {id: cacheId}),
              data = {},
              capacity = (options && options.capacity) || Number.MAX_VALUE,
              lruHash = {},
              freshEnd = null,
              staleEnd = null;
          return caches[cacheId] = {
            put: function(key, value) {
              var lruEntry = lruHash[key] || (lruHash[key] = {key: key});
              refresh(lruEntry);
              if (isUndefined(value))
                return;
              if (!(key in data))
                size++;
              data[key] = value;
              if (size > capacity) {
                this.remove(staleEnd.key);
              }
            },
            get: function(key) {
              var lruEntry = lruHash[key];
              if (!lruEntry)
                return;
              refresh(lruEntry);
              return data[key];
            },
            remove: function(key) {
              var lruEntry = lruHash[key];
              if (!lruEntry)
                return;
              if (lruEntry == freshEnd)
                freshEnd = lruEntry.p;
              if (lruEntry == staleEnd)
                staleEnd = lruEntry.n;
              link(lruEntry.n, lruEntry.p);
              delete lruHash[key];
              delete data[key];
              size--;
            },
            removeAll: function() {
              data = {};
              size = 0;
              lruHash = {};
              freshEnd = staleEnd = null;
            },
            destroy: function() {
              data = null;
              stats = null;
              lruHash = null;
              delete caches[cacheId];
            },
            info: function() {
              return extend({}, stats, {size: size});
            }
          };
          function refresh(entry) {
            if (entry != freshEnd) {
              if (!staleEnd) {
                staleEnd = entry;
              } else if (staleEnd == entry) {
                staleEnd = entry.n;
              }
              link(entry.n, entry.p);
              link(entry, freshEnd);
              freshEnd = entry;
              freshEnd.n = null;
            }
          }
          function link(nextEntry, prevEntry) {
            if (nextEntry != prevEntry) {
              if (nextEntry)
                nextEntry.p = prevEntry;
              if (prevEntry)
                prevEntry.n = nextEntry;
            }
          }
        }
        cacheFactory.info = function() {
          var info = {};
          forEach(caches, function(cache, cacheId) {
            info[cacheId] = cache.info();
          });
          return info;
        };
        cacheFactory.get = function(cacheId) {
          return caches[cacheId];
        };
        return cacheFactory;
      };
    }
    function $TemplateCacheProvider() {
      this.$get = ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('templates');
      }];
    }
    var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
    $CompileProvider.$inject = ['$provide'];
    function $CompileProvider($provide) {
      var hasDirectives = {},
          Suffix = 'Directive',
          COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
          CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
          MULTI_ROOT_TEMPLATE_ERROR = 'Template must have exactly one root element. was: ',
          urlSanitizationWhitelist = /^\s*(https?|ftp|mailto|file):/;
      this.directive = function registerDirective(name, directiveFactory) {
        if (isString(name)) {
          assertArg(directiveFactory, 'directive');
          if (!hasDirectives.hasOwnProperty(name)) {
            hasDirectives[name] = [];
            $provide.factory(name + Suffix, ['$injector', '$exceptionHandler', function($injector, $exceptionHandler) {
              var directives = [];
              forEach(hasDirectives[name], function(directiveFactory) {
                try {
                  var directive = $injector.invoke(directiveFactory);
                  if (isFunction(directive)) {
                    directive = {compile: valueFn(directive)};
                  } else if (!directive.compile && directive.link) {
                    directive.compile = valueFn(directive.link);
                  }
                  directive.priority = directive.priority || 0;
                  directive.name = directive.name || name;
                  directive.require = directive.require || (directive.controller && directive.name);
                  directive.restrict = directive.restrict || 'A';
                  directives.push(directive);
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
              return directives;
            }]);
          }
          hasDirectives[name].push(directiveFactory);
        } else {
          forEach(name, reverseParams(registerDirective));
        }
        return this;
      };
      this.urlSanitizationWhitelist = function(regexp) {
        if (isDefined(regexp)) {
          urlSanitizationWhitelist = regexp;
          return this;
        }
        return urlSanitizationWhitelist;
      };
      this.$get = ['$injector', '$interpolate', '$exceptionHandler', '$http', '$templateCache', '$parse', '$controller', '$rootScope', '$document', function($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document) {
        var Attributes = function(element, attr) {
          this.$$element = element;
          this.$attr = attr || {};
        };
        Attributes.prototype = {
          $normalize: directiveNormalize,
          $set: function(key, value, writeAttr, attrName) {
            var booleanKey = getBooleanAttrName(this.$$element[0], key),
                $$observers = this.$$observers,
                normalizedVal;
            if (booleanKey) {
              this.$$element.prop(key, value);
              attrName = booleanKey;
            }
            this[key] = value;
            if (attrName) {
              this.$attr[key] = attrName;
            } else {
              attrName = this.$attr[key];
              if (!attrName) {
                this.$attr[key] = attrName = snake_case(key, '-');
              }
            }
            if (nodeName_(this.$$element[0]) === 'A' && key === 'href') {
              urlSanitizationNode.setAttribute('href', value);
              normalizedVal = urlSanitizationNode.href;
              if (normalizedVal !== '' && !normalizedVal.match(urlSanitizationWhitelist)) {
                this[key] = value = 'unsafe:' + normalizedVal;
              }
            }
            if (writeAttr !== false) {
              if (value === null || value === undefined) {
                this.$$element.removeAttr(attrName);
              } else {
                this.$$element.attr(attrName, value);
              }
            }
            $$observers && forEach($$observers[key], function(fn) {
              try {
                fn(value);
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          },
          $observe: function(key, fn) {
            var attrs = this,
                $$observers = (attrs.$$observers || (attrs.$$observers = {})),
                listeners = ($$observers[key] || ($$observers[key] = []));
            listeners.push(fn);
            $rootScope.$evalAsync(function() {
              if (!listeners.$$inter) {
                fn(attrs[key]);
              }
            });
            return fn;
          }
        };
        var urlSanitizationNode = $document[0].createElement('a'),
            startSymbol = $interpolate.startSymbol(),
            endSymbol = $interpolate.endSymbol(),
            denormalizeTemplate = (startSymbol == '{{' || endSymbol == '}}') ? identity : function denormalizeTemplate(template) {
              return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
            };
        return compile;
        function compile($compileNodes, transcludeFn, maxPriority) {
          if (!($compileNodes instanceof jqLite)) {
            $compileNodes = jqLite($compileNodes);
          }
          forEach($compileNodes, function(node, index) {
            if (node.nodeType == 3 && node.nodeValue.match(/\S+/)) {
              $compileNodes[index] = jqLite(node).wrap('<span></span>').parent()[0];
            }
          });
          var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority);
          return function publicLinkFn(scope, cloneConnectFn) {
            assertArg(scope, 'scope');
            var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
            for (var i = 0,
                ii = $linkNode.length; i < ii; i++) {
              var node = $linkNode[i];
              if (node.nodeType == 1 || node.nodeType == 9) {
                $linkNode.eq(i).data('$scope', scope);
              }
            }
            safeAddClass($linkNode, 'ng-scope');
            if (cloneConnectFn)
              cloneConnectFn($linkNode, scope);
            if (compositeLinkFn)
              compositeLinkFn(scope, $linkNode, $linkNode);
            return $linkNode;
          };
        }
        function wrongMode(localName, mode) {
          throw Error("Unsupported '" + mode + "' for '" + localName + "'.");
        }
        function safeAddClass($element, className) {
          try {
            $element.addClass(className);
          } catch (e) {}
        }
        function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority) {
          var linkFns = [],
              nodeLinkFn,
              childLinkFn,
              directives,
              attrs,
              linkFnFound;
          for (var i = 0; i < nodeList.length; i++) {
            attrs = new Attributes();
            directives = collectDirectives(nodeList[i], [], attrs, maxPriority);
            nodeLinkFn = (directives.length) ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement) : null;
            childLinkFn = (nodeLinkFn && nodeLinkFn.terminal || !nodeList[i].childNodes || !nodeList[i].childNodes.length) ? null : compileNodes(nodeList[i].childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn);
            linkFns.push(nodeLinkFn);
            linkFns.push(childLinkFn);
            linkFnFound = (linkFnFound || nodeLinkFn || childLinkFn);
          }
          return linkFnFound ? compositeLinkFn : null;
          function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
            var nodeLinkFn,
                childLinkFn,
                node,
                childScope,
                childTranscludeFn,
                i,
                ii,
                n;
            var stableNodeList = [];
            for (i = 0, ii = nodeList.length; i < ii; i++) {
              stableNodeList.push(nodeList[i]);
            }
            for (i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
              node = stableNodeList[n];
              nodeLinkFn = linkFns[i++];
              childLinkFn = linkFns[i++];
              if (nodeLinkFn) {
                if (nodeLinkFn.scope) {
                  childScope = scope.$new(isObject(nodeLinkFn.scope));
                  jqLite(node).data('$scope', childScope);
                } else {
                  childScope = scope;
                }
                childTranscludeFn = nodeLinkFn.transclude;
                if (childTranscludeFn || (!boundTranscludeFn && transcludeFn)) {
                  nodeLinkFn(childLinkFn, childScope, node, $rootElement, (function(transcludeFn) {
                    return function(cloneFn) {
                      var transcludeScope = scope.$new();
                      transcludeScope.$$transcluded = true;
                      return transcludeFn(transcludeScope, cloneFn).bind('$destroy', bind(transcludeScope, transcludeScope.$destroy));
                    };
                  })(childTranscludeFn || transcludeFn));
                } else {
                  nodeLinkFn(childLinkFn, childScope, node, undefined, boundTranscludeFn);
                }
              } else if (childLinkFn) {
                childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
              }
            }
          }
        }
        function collectDirectives(node, directives, attrs, maxPriority) {
          var nodeType = node.nodeType,
              attrsMap = attrs.$attr,
              match,
              className;
          switch (nodeType) {
            case 1:
              addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority);
              for (var attr,
                  name,
                  nName,
                  value,
                  nAttrs = node.attributes,
                  j = 0,
                  jj = nAttrs && nAttrs.length; j < jj; j++) {
                attr = nAttrs[j];
                if (!msie || msie >= 8 || attr.specified) {
                  name = attr.name;
                  nName = directiveNormalize(name.toLowerCase());
                  attrsMap[nName] = name;
                  attrs[nName] = value = trim((msie && name == 'href') ? decodeURIComponent(node.getAttribute(name, 2)) : attr.value);
                  if (getBooleanAttrName(node, nName)) {
                    attrs[nName] = true;
                  }
                  addAttrInterpolateDirective(node, directives, value, nName);
                  addDirective(directives, nName, 'A', maxPriority);
                }
              }
              className = node.className;
              if (isString(className) && className !== '') {
                while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                  nName = directiveNormalize(match[2]);
                  if (addDirective(directives, nName, 'C', maxPriority)) {
                    attrs[nName] = trim(match[3]);
                  }
                  className = className.substr(match.index + match[0].length);
                }
              }
              break;
            case 3:
              addTextInterpolateDirective(directives, node.nodeValue);
              break;
            case 8:
              try {
                match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                if (match) {
                  nName = directiveNormalize(match[1]);
                  if (addDirective(directives, nName, 'M', maxPriority)) {
                    attrs[nName] = trim(match[2]);
                  }
                }
              } catch (e) {}
              break;
          }
          directives.sort(byPriority);
          return directives;
        }
        function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection) {
          var terminalPriority = -Number.MAX_VALUE,
              preLinkFns = [],
              postLinkFns = [],
              newScopeDirective = null,
              newIsolateScopeDirective = null,
              templateDirective = null,
              $compileNode = templateAttrs.$$element = jqLite(compileNode),
              directive,
              directiveName,
              $template,
              transcludeDirective,
              childTranscludeFn = transcludeFn,
              controllerDirectives,
              linkFn,
              directiveValue;
          for (var i = 0,
              ii = directives.length; i < ii; i++) {
            directive = directives[i];
            $template = undefined;
            if (terminalPriority > directive.priority) {
              break;
            }
            if (directiveValue = directive.scope) {
              assertNoDuplicate('isolated scope', newIsolateScopeDirective, directive, $compileNode);
              if (isObject(directiveValue)) {
                safeAddClass($compileNode, 'ng-isolate-scope');
                newIsolateScopeDirective = directive;
              }
              safeAddClass($compileNode, 'ng-scope');
              newScopeDirective = newScopeDirective || directive;
            }
            directiveName = directive.name;
            if (directiveValue = directive.controller) {
              controllerDirectives = controllerDirectives || {};
              assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode);
              controllerDirectives[directiveName] = directive;
            }
            if (directiveValue = directive.transclude) {
              assertNoDuplicate('transclusion', transcludeDirective, directive, $compileNode);
              transcludeDirective = directive;
              terminalPriority = directive.priority;
              if (directiveValue == 'element') {
                $template = jqLite(compileNode);
                $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' '));
                compileNode = $compileNode[0];
                replaceWith(jqCollection, jqLite($template[0]), compileNode);
                childTranscludeFn = compile($template, transcludeFn, terminalPriority);
              } else {
                $template = jqLite(JQLiteClone(compileNode)).contents();
                $compileNode.html('');
                childTranscludeFn = compile($template, transcludeFn);
              }
            }
            if ((directiveValue = directive.template)) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              directiveValue = denormalizeTemplate(directiveValue);
              if (directive.replace) {
                $template = jqLite('<div>' + trim(directiveValue) + '</div>').contents();
                compileNode = $template[0];
                if ($template.length != 1 || compileNode.nodeType !== 1) {
                  throw new Error(MULTI_ROOT_TEMPLATE_ERROR + directiveValue);
                }
                replaceWith(jqCollection, $compileNode, compileNode);
                var newTemplateAttrs = {$attr: {}};
                directives = directives.concat(collectDirectives(compileNode, directives.splice(i + 1, directives.length - (i + 1)), newTemplateAttrs));
                mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                ii = directives.length;
              } else {
                $compileNode.html(directiveValue);
              }
            }
            if (directive.templateUrl) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), nodeLinkFn, $compileNode, templateAttrs, jqCollection, directive.replace, childTranscludeFn);
              ii = directives.length;
            } else if (directive.compile) {
              try {
                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                if (isFunction(linkFn)) {
                  addLinkFns(null, linkFn);
                } else if (linkFn) {
                  addLinkFns(linkFn.pre, linkFn.post);
                }
              } catch (e) {
                $exceptionHandler(e, startingTag($compileNode));
              }
            }
            if (directive.terminal) {
              nodeLinkFn.terminal = true;
              terminalPriority = Math.max(terminalPriority, directive.priority);
            }
          }
          nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope;
          nodeLinkFn.transclude = transcludeDirective && childTranscludeFn;
          return nodeLinkFn;
          function addLinkFns(pre, post) {
            if (pre) {
              pre.require = directive.require;
              preLinkFns.push(pre);
            }
            if (post) {
              post.require = directive.require;
              postLinkFns.push(post);
            }
          }
          function getControllers(require, $element) {
            var value,
                retrievalMethod = 'data',
                optional = false;
            if (isString(require)) {
              while ((value = require.charAt(0)) == '^' || value == '?') {
                require = require.substr(1);
                if (value == '^') {
                  retrievalMethod = 'inheritedData';
                }
                optional = optional || value == '?';
              }
              value = $element[retrievalMethod]('$' + require + 'Controller');
              if (!value && !optional) {
                throw Error("No controller: " + require);
              }
              return value;
            } else if (isArray(require)) {
              value = [];
              forEach(require, function(require) {
                value.push(getControllers(require, $element));
              });
            }
            return value;
          }
          function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
            var attrs,
                $element,
                i,
                ii,
                linkFn,
                controller;
            if (compileNode === linkNode) {
              attrs = templateAttrs;
            } else {
              attrs = shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
            }
            $element = attrs.$$element;
            if (newIsolateScopeDirective) {
              var LOCAL_REGEXP = /^\s*([@=&])\s*(\w*)\s*$/;
              var parentScope = scope.$parent || scope;
              forEach(newIsolateScopeDirective.scope, function(definiton, scopeName) {
                var match = definiton.match(LOCAL_REGEXP) || [],
                    attrName = match[2] || scopeName,
                    mode = match[1],
                    lastValue,
                    parentGet,
                    parentSet;
                scope.$$isolateBindings[scopeName] = mode + attrName;
                switch (mode) {
                  case '@':
                    {
                      attrs.$observe(attrName, function(value) {
                        scope[scopeName] = value;
                      });
                      attrs.$$observers[attrName].$$scope = parentScope;
                      break;
                    }
                  case '=':
                    {
                      parentGet = $parse(attrs[attrName]);
                      parentSet = parentGet.assign || function() {
                        lastValue = scope[scopeName] = parentGet(parentScope);
                        throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + attrs[attrName] + ' (directive: ' + newIsolateScopeDirective.name + ')');
                      };
                      lastValue = scope[scopeName] = parentGet(parentScope);
                      scope.$watch(function parentValueWatch() {
                        var parentValue = parentGet(parentScope);
                        if (parentValue !== scope[scopeName]) {
                          if (parentValue !== lastValue) {
                            lastValue = scope[scopeName] = parentValue;
                          } else {
                            parentSet(parentScope, parentValue = lastValue = scope[scopeName]);
                          }
                        }
                        return parentValue;
                      });
                      break;
                    }
                  case '&':
                    {
                      parentGet = $parse(attrs[attrName]);
                      scope[scopeName] = function(locals) {
                        return parentGet(parentScope, locals);
                      };
                      break;
                    }
                  default:
                    {
                      throw Error('Invalid isolate scope definition for directive ' + newIsolateScopeDirective.name + ': ' + definiton);
                    }
                }
              });
            }
            if (controllerDirectives) {
              forEach(controllerDirectives, function(directive) {
                var locals = {
                  $scope: scope,
                  $element: $element,
                  $attrs: attrs,
                  $transclude: boundTranscludeFn
                };
                controller = directive.controller;
                if (controller == '@') {
                  controller = attrs[directive.name];
                }
                $element.data('$' + directive.name + 'Controller', $controller(controller, locals));
              });
            }
            for (i = 0, ii = preLinkFns.length; i < ii; i++) {
              try {
                linkFn = preLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
            childLinkFn && childLinkFn(scope, linkNode.childNodes, undefined, boundTranscludeFn);
            for (i = 0, ii = postLinkFns.length; i < ii; i++) {
              try {
                linkFn = postLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
          }
        }
        function addDirective(tDirectives, name, location, maxPriority) {
          var match = false;
          if (hasDirectives.hasOwnProperty(name)) {
            for (var directive,
                directives = $injector.get(name + Suffix),
                i = 0,
                ii = directives.length; i < ii; i++) {
              try {
                directive = directives[i];
                if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                  tDirectives.push(directive);
                  match = true;
                }
              } catch (e) {
                $exceptionHandler(e);
              }
            }
          }
          return match;
        }
        function mergeTemplateAttributes(dst, src) {
          var srcAttr = src.$attr,
              dstAttr = dst.$attr,
              $element = dst.$$element;
          forEach(dst, function(value, key) {
            if (key.charAt(0) != '$') {
              if (src[key]) {
                value += (key === 'style' ? ';' : ' ') + src[key];
              }
              dst.$set(key, value, true, srcAttr[key]);
            }
          });
          forEach(src, function(value, key) {
            if (key == 'class') {
              safeAddClass($element, value);
              dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
            } else if (key == 'style') {
              $element.attr('style', $element.attr('style') + ';' + value);
            } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
              dst[key] = value;
              dstAttr[key] = srcAttr[key];
            }
          });
        }
        function compileTemplateUrl(directives, beforeTemplateNodeLinkFn, $compileNode, tAttrs, $rootElement, replace, childTranscludeFn) {
          var linkQueue = [],
              afterTemplateNodeLinkFn,
              afterTemplateChildLinkFn,
              beforeTemplateCompileNode = $compileNode[0],
              origAsyncDirective = directives.shift(),
              derivedSyncDirective = extend({}, origAsyncDirective, {
                controller: null,
                templateUrl: null,
                transclude: null,
                scope: null
              });
          $compileNode.html('');
          $http.get(origAsyncDirective.templateUrl, {cache: $templateCache}).success(function(content) {
            var compileNode,
                tempTemplateAttrs,
                $template;
            content = denormalizeTemplate(content);
            if (replace) {
              $template = jqLite('<div>' + trim(content) + '</div>').contents();
              compileNode = $template[0];
              if ($template.length != 1 || compileNode.nodeType !== 1) {
                throw new Error(MULTI_ROOT_TEMPLATE_ERROR + content);
              }
              tempTemplateAttrs = {$attr: {}};
              replaceWith($rootElement, $compileNode, compileNode);
              collectDirectives(compileNode, directives, tempTemplateAttrs);
              mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
            } else {
              compileNode = beforeTemplateCompileNode;
              $compileNode.html(content);
            }
            directives.unshift(derivedSyncDirective);
            afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn);
            afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
            while (linkQueue.length) {
              var controller = linkQueue.pop(),
                  linkRootElement = linkQueue.pop(),
                  beforeTemplateLinkNode = linkQueue.pop(),
                  scope = linkQueue.pop(),
                  linkNode = compileNode;
              if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                linkNode = JQLiteClone(compileNode);
                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
              }
              afterTemplateNodeLinkFn(function() {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, controller);
              }, scope, linkNode, $rootElement, controller);
            }
            linkQueue = null;
          }).error(function(response, code, headers, config) {
            throw Error('Failed to load template: ' + config.url);
          });
          return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, controller) {
            if (linkQueue) {
              linkQueue.push(scope);
              linkQueue.push(node);
              linkQueue.push(rootElement);
              linkQueue.push(controller);
            } else {
              afterTemplateNodeLinkFn(function() {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, controller);
              }, scope, node, rootElement, controller);
            }
          };
        }
        function byPriority(a, b) {
          return b.priority - a.priority;
        }
        function assertNoDuplicate(what, previousDirective, directive, element) {
          if (previousDirective) {
            throw Error('Multiple directives [' + previousDirective.name + ', ' + directive.name + '] asking for ' + what + ' on: ' + startingTag(element));
          }
        }
        function addTextInterpolateDirective(directives, text) {
          var interpolateFn = $interpolate(text, true);
          if (interpolateFn) {
            directives.push({
              priority: 0,
              compile: valueFn(function textInterpolateLinkFn(scope, node) {
                var parent = node.parent(),
                    bindings = parent.data('$binding') || [];
                bindings.push(interpolateFn);
                safeAddClass(parent.data('$binding', bindings), 'ng-binding');
                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                  node[0].nodeValue = value;
                });
              })
            });
          }
        }
        function addAttrInterpolateDirective(node, directives, value, name) {
          var interpolateFn = $interpolate(value, true);
          if (!interpolateFn)
            return;
          directives.push({
            priority: 100,
            compile: valueFn(function attrInterpolateLinkFn(scope, element, attr) {
              var $$observers = (attr.$$observers || (attr.$$observers = {}));
              if (name === 'class') {
                interpolateFn = $interpolate(attr[name], true);
              }
              attr[name] = undefined;
              ($$observers[name] || ($$observers[name] = [])).$$inter = true;
              (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(value) {
                attr.$set(name, value);
              });
            })
          });
        }
        function replaceWith($rootElement, $element, newNode) {
          var oldNode = $element[0],
              parent = oldNode.parentNode,
              i,
              ii;
          if ($rootElement) {
            for (i = 0, ii = $rootElement.length; i < ii; i++) {
              if ($rootElement[i] == oldNode) {
                $rootElement[i] = newNode;
                break;
              }
            }
          }
          if (parent) {
            parent.replaceChild(newNode, oldNode);
          }
          newNode[jqLite.expando] = oldNode[jqLite.expando];
          $element[0] = newNode;
        }
      }];
    }
    var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
    function directiveNormalize(name) {
      return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
    function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {}
    function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {}
    function $ControllerProvider() {
      var controllers = {};
      this.register = function(name, constructor) {
        if (isObject(name)) {
          extend(controllers, name);
        } else {
          controllers[name] = constructor;
        }
      };
      this.$get = ['$injector', '$window', function($injector, $window) {
        return function(constructor, locals) {
          if (isString(constructor)) {
            var name = constructor;
            constructor = controllers.hasOwnProperty(name) ? controllers[name] : getter(locals.$scope, name, true) || getter($window, name, true);
            assertArgFn(constructor, name, true);
          }
          return $injector.instantiate(constructor, locals);
        };
      }];
    }
    function $DocumentProvider() {
      this.$get = ['$window', function(window) {
        return jqLite(window.document);
      }];
    }
    function $ExceptionHandlerProvider() {
      this.$get = ['$log', function($log) {
        return function(exception, cause) {
          $log.error.apply($log, arguments);
        };
      }];
    }
    function $InterpolateProvider() {
      var startSymbol = '{{';
      var endSymbol = '}}';
      this.startSymbol = function(value) {
        if (value) {
          startSymbol = value;
          return this;
        } else {
          return startSymbol;
        }
      };
      this.endSymbol = function(value) {
        if (value) {
          endSymbol = value;
          return this;
        } else {
          return endSymbol;
        }
      };
      this.$get = ['$parse', function($parse) {
        var startSymbolLength = startSymbol.length,
            endSymbolLength = endSymbol.length;
        function $interpolate(text, mustHaveExpression) {
          var startIndex,
              endIndex,
              index = 0,
              parts = [],
              length = text.length,
              hasInterpolation = false,
              fn,
              exp,
              concat = [];
          while (index < length) {
            if (((startIndex = text.indexOf(startSymbol, index)) != -1) && ((endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1)) {
              (index != startIndex) && parts.push(text.substring(index, startIndex));
              parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex)));
              fn.exp = exp;
              index = endIndex + endSymbolLength;
              hasInterpolation = true;
            } else {
              (index != length) && parts.push(text.substring(index));
              index = length;
            }
          }
          if (!(length = parts.length)) {
            parts.push('');
            length = 1;
          }
          if (!mustHaveExpression || hasInterpolation) {
            concat.length = length;
            fn = function(context) {
              for (var i = 0,
                  ii = length,
                  part; i < ii; i++) {
                if (typeof(part = parts[i]) == 'function') {
                  part = part(context);
                  if (part == null || part == undefined) {
                    part = '';
                  } else if (typeof part != 'string') {
                    part = toJson(part);
                  }
                }
                concat[i] = part;
              }
              return concat.join('');
            };
            fn.exp = text;
            fn.parts = parts;
            return fn;
          }
        }
        $interpolate.startSymbol = function() {
          return startSymbol;
        };
        $interpolate.endSymbol = function() {
          return endSymbol;
        };
        return $interpolate;
      }];
    }
    var URL_MATCH = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/,
        PATH_MATCH = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/,
        HASH_MATCH = PATH_MATCH,
        DEFAULT_PORTS = {
          'http': 80,
          'https': 443,
          'ftp': 21
        };
    function encodePath(path) {
      var segments = path.split('/'),
          i = segments.length;
      while (i--) {
        segments[i] = encodeUriSegment(segments[i]);
      }
      return segments.join('/');
    }
    function stripHash(url) {
      return url.split('#')[0];
    }
    function matchUrl(url, obj) {
      var match = URL_MATCH.exec(url);
      match = {
        protocol: match[1],
        host: match[3],
        port: int(match[5]) || DEFAULT_PORTS[match[1]] || null,
        path: match[6] || '/',
        search: match[8],
        hash: match[10]
      };
      if (obj) {
        obj.$$protocol = match.protocol;
        obj.$$host = match.host;
        obj.$$port = match.port;
      }
      return match;
    }
    function composeProtocolHostPort(protocol, host, port) {
      return protocol + '://' + host + (port == DEFAULT_PORTS[protocol] ? '' : ':' + port);
    }
    function pathPrefixFromBase(basePath) {
      return basePath.substr(0, basePath.lastIndexOf('/'));
    }
    function convertToHtml5Url(url, basePath, hashPrefix) {
      var match = matchUrl(url);
      if (decodeURIComponent(match.path) != basePath || isUndefined(match.hash) || match.hash.indexOf(hashPrefix) !== 0) {
        return url;
      } else {
        return composeProtocolHostPort(match.protocol, match.host, match.port) + pathPrefixFromBase(basePath) + match.hash.substr(hashPrefix.length);
      }
    }
    function convertToHashbangUrl(url, basePath, hashPrefix) {
      var match = matchUrl(url);
      if (decodeURIComponent(match.path) == basePath && !isUndefined(match.hash) && match.hash.indexOf(hashPrefix) === 0) {
        return url;
      } else {
        var search = match.search && '?' + match.search || '',
            hash = match.hash && '#' + match.hash || '',
            pathPrefix = pathPrefixFromBase(basePath),
            path = match.path.substr(pathPrefix.length);
        if (match.path.indexOf(pathPrefix) !== 0) {
          throw Error('Invalid url "' + url + '", missing path prefix "' + pathPrefix + '" !');
        }
        return composeProtocolHostPort(match.protocol, match.host, match.port) + basePath + '#' + hashPrefix + path + search + hash;
      }
    }
    function LocationUrl(url, pathPrefix, appBaseUrl) {
      pathPrefix = pathPrefix || '';
      this.$$parse = function(newAbsoluteUrl) {
        var match = matchUrl(newAbsoluteUrl, this);
        if (match.path.indexOf(pathPrefix) !== 0) {
          throw Error('Invalid url "' + newAbsoluteUrl + '", missing path prefix "' + pathPrefix + '" !');
        }
        this.$$path = decodeURIComponent(match.path.substr(pathPrefix.length));
        this.$$search = parseKeyValue(match.search);
        this.$$hash = match.hash && decodeURIComponent(match.hash) || '';
        this.$$compose();
      };
      this.$$compose = function() {
        var search = toKeyValue(this.$$search),
            hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
        this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
        this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + pathPrefix + this.$$url;
      };
      this.$$rewriteAppUrl = function(absoluteLinkUrl) {
        if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
          return absoluteLinkUrl;
        }
      };
      this.$$parse(url);
    }
    function LocationHashbangUrl(url, hashPrefix, appBaseUrl) {
      var basePath;
      this.$$parse = function(url) {
        var match = matchUrl(url, this);
        if (match.hash && match.hash.indexOf(hashPrefix) !== 0) {
          throw Error('Invalid url "' + url + '", missing hash prefix "' + hashPrefix + '" !');
        }
        basePath = match.path + (match.search ? '?' + match.search : '');
        match = HASH_MATCH.exec((match.hash || '').substr(hashPrefix.length));
        if (match[1]) {
          this.$$path = (match[1].charAt(0) == '/' ? '' : '/') + decodeURIComponent(match[1]);
        } else {
          this.$$path = '';
        }
        this.$$search = parseKeyValue(match[3]);
        this.$$hash = match[5] && decodeURIComponent(match[5]) || '';
        this.$$compose();
      };
      this.$$compose = function() {
        var search = toKeyValue(this.$$search),
            hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
        this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
        this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + basePath + (this.$$url ? '#' + hashPrefix + this.$$url : '');
      };
      this.$$rewriteAppUrl = function(absoluteLinkUrl) {
        if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
          return absoluteLinkUrl;
        }
      };
      this.$$parse(url);
    }
    LocationUrl.prototype = {
      $$replace: false,
      absUrl: locationGetter('$$absUrl'),
      url: function(url, replace) {
        if (isUndefined(url))
          return this.$$url;
        var match = PATH_MATCH.exec(url);
        if (match[1])
          this.path(decodeURIComponent(match[1]));
        if (match[2] || match[1])
          this.search(match[3] || '');
        this.hash(match[5] || '', replace);
        return this;
      },
      protocol: locationGetter('$$protocol'),
      host: locationGetter('$$host'),
      port: locationGetter('$$port'),
      path: locationGetterSetter('$$path', function(path) {
        return path.charAt(0) == '/' ? path : '/' + path;
      }),
      search: function(search, paramValue) {
        if (isUndefined(search))
          return this.$$search;
        if (isDefined(paramValue)) {
          if (paramValue === null) {
            delete this.$$search[search];
          } else {
            this.$$search[search] = paramValue;
          }
        } else {
          this.$$search = isString(search) ? parseKeyValue(search) : search;
        }
        this.$$compose();
        return this;
      },
      hash: locationGetterSetter('$$hash', identity),
      replace: function() {
        this.$$replace = true;
        return this;
      }
    };
    LocationHashbangUrl.prototype = inherit(LocationUrl.prototype);
    function LocationHashbangInHtml5Url(url, hashPrefix, appBaseUrl, baseExtra) {
      LocationHashbangUrl.apply(this, arguments);
      this.$$rewriteAppUrl = function(absoluteLinkUrl) {
        if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
          return appBaseUrl + baseExtra + '#' + hashPrefix + absoluteLinkUrl.substr(appBaseUrl.length);
        }
      };
    }
    LocationHashbangInHtml5Url.prototype = inherit(LocationHashbangUrl.prototype);
    function locationGetter(property) {
      return function() {
        return this[property];
      };
    }
    function locationGetterSetter(property, preprocess) {
      return function(value) {
        if (isUndefined(value))
          return this[property];
        this[property] = preprocess(value);
        this.$$compose();
        return this;
      };
    }
    function $LocationProvider() {
      var hashPrefix = '',
          html5Mode = false;
      this.hashPrefix = function(prefix) {
        if (isDefined(prefix)) {
          hashPrefix = prefix;
          return this;
        } else {
          return hashPrefix;
        }
      };
      this.html5Mode = function(mode) {
        if (isDefined(mode)) {
          html5Mode = mode;
          return this;
        } else {
          return html5Mode;
        }
      };
      this.$get = ['$rootScope', '$browser', '$sniffer', '$rootElement', function($rootScope, $browser, $sniffer, $rootElement) {
        var $location,
            basePath,
            pathPrefix,
            initUrl = $browser.url(),
            initUrlParts = matchUrl(initUrl),
            appBaseUrl;
        if (html5Mode) {
          basePath = $browser.baseHref() || '/';
          pathPrefix = pathPrefixFromBase(basePath);
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + pathPrefix + '/';
          if ($sniffer.history) {
            $location = new LocationUrl(convertToHtml5Url(initUrl, basePath, hashPrefix), pathPrefix, appBaseUrl);
          } else {
            $location = new LocationHashbangInHtml5Url(convertToHashbangUrl(initUrl, basePath, hashPrefix), hashPrefix, appBaseUrl, basePath.substr(pathPrefix.length + 1));
          }
        } else {
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + (initUrlParts.path || '') + (initUrlParts.search ? ('?' + initUrlParts.search) : '') + '#' + hashPrefix + '/';
          $location = new LocationHashbangUrl(initUrl, hashPrefix, appBaseUrl);
        }
        $rootElement.bind('click', function(event) {
          if (event.ctrlKey || event.metaKey || event.which == 2)
            return;
          var elm = jqLite(event.target);
          while (lowercase(elm[0].nodeName) !== 'a') {
            if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
              return;
          }
          var absHref = elm.prop('href'),
              rewrittenUrl = $location.$$rewriteAppUrl(absHref);
          if (absHref && !elm.attr('target') && rewrittenUrl) {
            $location.$$parse(rewrittenUrl);
            $rootScope.$apply();
            event.preventDefault();
            window.angular['ff-684208-preventDefault'] = true;
          }
        });
        if ($location.absUrl() != initUrl) {
          $browser.url($location.absUrl(), true);
        }
        $browser.onUrlChange(function(newUrl) {
          if ($location.absUrl() != newUrl) {
            if ($rootScope.$broadcast('$locationChangeStart', newUrl, $location.absUrl()).defaultPrevented) {
              $browser.url($location.absUrl());
              return;
            }
            $rootScope.$evalAsync(function() {
              var oldUrl = $location.absUrl();
              $location.$$parse(newUrl);
              afterLocationChange(oldUrl);
            });
            if (!$rootScope.$$phase)
              $rootScope.$digest();
          }
        });
        var changeCounter = 0;
        $rootScope.$watch(function $locationWatch() {
          var oldUrl = $browser.url();
          var currentReplace = $location.$$replace;
          if (!changeCounter || oldUrl != $location.absUrl()) {
            changeCounter++;
            $rootScope.$evalAsync(function() {
              if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
                $location.$$parse(oldUrl);
              } else {
                $browser.url($location.absUrl(), currentReplace);
                afterLocationChange(oldUrl);
              }
            });
          }
          $location.$$replace = false;
          return changeCounter;
        });
        return $location;
        function afterLocationChange(oldUrl) {
          $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
        }
      }];
    }
    function $LogProvider() {
      this.$get = ['$window', function($window) {
        return {
          log: consoleLog('log'),
          warn: consoleLog('warn'),
          info: consoleLog('info'),
          error: consoleLog('error')
        };
        function formatError(arg) {
          if (arg instanceof Error) {
            if (arg.stack) {
              arg = (arg.message && arg.stack.indexOf(arg.message) === -1) ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
            } else if (arg.sourceURL) {
              arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
          }
          return arg;
        }
        function consoleLog(type) {
          var console = $window.console || {},
              logFn = console[type] || console.log || noop;
          if (logFn.apply) {
            return function() {
              var args = [];
              forEach(arguments, function(arg) {
                args.push(formatError(arg));
              });
              return logFn.apply(console, args);
            };
          }
          return function(arg1, arg2) {
            logFn(arg1, arg2);
          };
        }
      }];
    }
    var OPERATORS = {
      'null': function() {
        return null;
      },
      'true': function() {
        return true;
      },
      'false': function() {
        return false;
      },
      undefined: noop,
      '+': function(self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        if (isDefined(a)) {
          if (isDefined(b)) {
            return a + b;
          }
          return a;
        }
        return isDefined(b) ? b : undefined;
      },
      '-': function(self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
      },
      '*': function(self, locals, a, b) {
        return a(self, locals) * b(self, locals);
      },
      '/': function(self, locals, a, b) {
        return a(self, locals) / b(self, locals);
      },
      '%': function(self, locals, a, b) {
        return a(self, locals) % b(self, locals);
      },
      '^': function(self, locals, a, b) {
        return a(self, locals) ^ b(self, locals);
      },
      '=': noop,
      '==': function(self, locals, a, b) {
        return a(self, locals) == b(self, locals);
      },
      '!=': function(self, locals, a, b) {
        return a(self, locals) != b(self, locals);
      },
      '<': function(self, locals, a, b) {
        return a(self, locals) < b(self, locals);
      },
      '>': function(self, locals, a, b) {
        return a(self, locals) > b(self, locals);
      },
      '<=': function(self, locals, a, b) {
        return a(self, locals) <= b(self, locals);
      },
      '>=': function(self, locals, a, b) {
        return a(self, locals) >= b(self, locals);
      },
      '&&': function(self, locals, a, b) {
        return a(self, locals) && b(self, locals);
      },
      '||': function(self, locals, a, b) {
        return a(self, locals) || b(self, locals);
      },
      '&': function(self, locals, a, b) {
        return a(self, locals) & b(self, locals);
      },
      '|': function(self, locals, a, b) {
        return b(self, locals)(self, locals, a(self, locals));
      },
      '!': function(self, locals, a) {
        return !a(self, locals);
      }
    };
    var ESCAPE = {
      "n": "\n",
      "f": "\f",
      "r": "\r",
      "t": "\t",
      "v": "\v",
      "'": "'",
      '"': '"'
    };
    function lex(text, csp) {
      var tokens = [],
          token,
          index = 0,
          json = [],
          ch,
          lastCh = ':';
      while (index < text.length) {
        ch = text.charAt(index);
        if (is('"\'')) {
          readString(ch);
        } else if (isNumber(ch) || is('.') && isNumber(peek())) {
          readNumber();
        } else if (isIdent(ch)) {
          readIdent();
          if (was('{,') && json[0] == '{' && (token = tokens[tokens.length - 1])) {
            token.json = token.text.indexOf('.') == -1;
          }
        } else if (is('(){}[].,;:')) {
          tokens.push({
            index: index,
            text: ch,
            json: (was(':[,') && is('{[')) || is('}]:,')
          });
          if (is('{['))
            json.unshift(ch);
          if (is('}]'))
            json.shift();
          index++;
        } else if (isWhitespace(ch)) {
          index++;
          continue;
        } else {
          var ch2 = ch + peek(),
              fn = OPERATORS[ch],
              fn2 = OPERATORS[ch2];
          if (fn2) {
            tokens.push({
              index: index,
              text: ch2,
              fn: fn2
            });
            index += 2;
          } else if (fn) {
            tokens.push({
              index: index,
              text: ch,
              fn: fn,
              json: was('[,:') && is('+-')
            });
            index += 1;
          } else {
            throwError("Unexpected next character ", index, index + 1);
          }
        }
        lastCh = ch;
      }
      return tokens;
      function is(chars) {
        return chars.indexOf(ch) != -1;
      }
      function was(chars) {
        return chars.indexOf(lastCh) != -1;
      }
      function peek() {
        return index + 1 < text.length ? text.charAt(index + 1) : false;
      }
      function isNumber(ch) {
        return '0' <= ch && ch <= '9';
      }
      function isWhitespace(ch) {
        return ch == ' ' || ch == '\r' || ch == '\t' || ch == '\n' || ch == '\v' || ch == '\u00A0';
      }
      function isIdent(ch) {
        return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || '_' == ch || ch == '$';
      }
      function isExpOperator(ch) {
        return ch == '-' || ch == '+' || isNumber(ch);
      }
      function throwError(error, start, end) {
        end = end || index;
        throw Error("Lexer Error: " + error + " at column" + (isDefined(start) ? "s " + start + "-" + index + " [" + text.substring(start, end) + "]" : " " + end) + " in expression [" + text + "].");
      }
      function readNumber() {
        var number = "";
        var start = index;
        while (index < text.length) {
          var ch = lowercase(text.charAt(index));
          if (ch == '.' || isNumber(ch)) {
            number += ch;
          } else {
            var peekCh = peek();
            if (ch == 'e' && isExpOperator(peekCh)) {
              number += ch;
            } else if (isExpOperator(ch) && peekCh && isNumber(peekCh) && number.charAt(number.length - 1) == 'e') {
              number += ch;
            } else if (isExpOperator(ch) && (!peekCh || !isNumber(peekCh)) && number.charAt(number.length - 1) == 'e') {
              throwError('Invalid exponent');
            } else {
              break;
            }
          }
          index++;
        }
        number = 1 * number;
        tokens.push({
          index: start,
          text: number,
          json: true,
          fn: function() {
            return number;
          }
        });
      }
      function readIdent() {
        var ident = "",
            start = index,
            lastDot,
            peekIndex,
            methodName,
            ch;
        while (index < text.length) {
          ch = text.charAt(index);
          if (ch == '.' || isIdent(ch) || isNumber(ch)) {
            if (ch == '.')
              lastDot = index;
            ident += ch;
          } else {
            break;
          }
          index++;
        }
        if (lastDot) {
          peekIndex = index;
          while (peekIndex < text.length) {
            ch = text.charAt(peekIndex);
            if (ch == '(') {
              methodName = ident.substr(lastDot - start + 1);
              ident = ident.substr(0, lastDot - start);
              index = peekIndex;
              break;
            }
            if (isWhitespace(ch)) {
              peekIndex++;
            } else {
              break;
            }
          }
        }
        var token = {
          index: start,
          text: ident
        };
        if (OPERATORS.hasOwnProperty(ident)) {
          token.fn = token.json = OPERATORS[ident];
        } else {
          var getter = getterFn(ident, csp);
          token.fn = extend(function(self, locals) {
            return (getter(self, locals));
          }, {assign: function(self, value) {
              return setter(self, ident, value);
            }});
        }
        tokens.push(token);
        if (methodName) {
          tokens.push({
            index: lastDot,
            text: '.',
            json: false
          });
          tokens.push({
            index: lastDot + 1,
            text: methodName,
            json: false
          });
        }
      }
      function readString(quote) {
        var start = index;
        index++;
        var string = "";
        var rawString = quote;
        var escape = false;
        while (index < text.length) {
          var ch = text.charAt(index);
          rawString += ch;
          if (escape) {
            if (ch == 'u') {
              var hex = text.substring(index + 1, index + 5);
              if (!hex.match(/[\da-f]{4}/i))
                throwError("Invalid unicode escape [\\u" + hex + "]");
              index += 4;
              string += String.fromCharCode(parseInt(hex, 16));
            } else {
              var rep = ESCAPE[ch];
              if (rep) {
                string += rep;
              } else {
                string += ch;
              }
            }
            escape = false;
          } else if (ch == '\\') {
            escape = true;
          } else if (ch == quote) {
            index++;
            tokens.push({
              index: start,
              text: rawString,
              string: string,
              json: true,
              fn: function() {
                return string;
              }
            });
            return;
          } else {
            string += ch;
          }
          index++;
        }
        throwError("Unterminated quote", start);
      }
    }
    function parser(text, json, $filter, csp) {
      var ZERO = valueFn(0),
          value,
          tokens = lex(text, csp),
          assignment = _assignment,
          functionCall = _functionCall,
          fieldAccess = _fieldAccess,
          objectIndex = _objectIndex,
          filterChain = _filterChain;
      if (json) {
        assignment = logicalOR;
        functionCall = fieldAccess = objectIndex = filterChain = function() {
          throwError("is not valid json", {
            text: text,
            index: 0
          });
        };
        value = primary();
      } else {
        value = statements();
      }
      if (tokens.length !== 0) {
        throwError("is an unexpected token", tokens[0]);
      }
      return value;
      function throwError(msg, token) {
        throw Error("Syntax Error: Token '" + token.text + "' " + msg + " at column " + (token.index + 1) + " of the expression [" + text + "] starting at [" + text.substring(token.index) + "].");
      }
      function peekToken() {
        if (tokens.length === 0)
          throw Error("Unexpected end of expression: " + text);
        return tokens[0];
      }
      function peek(e1, e2, e3, e4) {
        if (tokens.length > 0) {
          var token = tokens[0];
          var t = token.text;
          if (t == e1 || t == e2 || t == e3 || t == e4 || (!e1 && !e2 && !e3 && !e4)) {
            return token;
          }
        }
        return false;
      }
      function expect(e1, e2, e3, e4) {
        var token = peek(e1, e2, e3, e4);
        if (token) {
          if (json && !token.json) {
            throwError("is not valid json", token);
          }
          tokens.shift();
          return token;
        }
        return false;
      }
      function consume(e1) {
        if (!expect(e1)) {
          throwError("is unexpected, expecting [" + e1 + "]", peek());
        }
      }
      function unaryFn(fn, right) {
        return function(self, locals) {
          return fn(self, locals, right);
        };
      }
      function binaryFn(left, fn, right) {
        return function(self, locals) {
          return fn(self, locals, left, right);
        };
      }
      function statements() {
        var statements = [];
        while (true) {
          if (tokens.length > 0 && !peek('}', ')', ';', ']'))
            statements.push(filterChain());
          if (!expect(';')) {
            return statements.length == 1 ? statements[0] : function(self, locals) {
              var value;
              for (var i = 0; i < statements.length; i++) {
                var statement = statements[i];
                if (statement)
                  value = statement(self, locals);
              }
              return value;
            };
          }
        }
      }
      function _filterChain() {
        var left = expression();
        var token;
        while (true) {
          if ((token = expect('|'))) {
            left = binaryFn(left, token.fn, filter());
          } else {
            return left;
          }
        }
      }
      function filter() {
        var token = expect();
        var fn = $filter(token.text);
        var argsFn = [];
        while (true) {
          if ((token = expect(':'))) {
            argsFn.push(expression());
          } else {
            var fnInvoke = function(self, locals, input) {
              var args = [input];
              for (var i = 0; i < argsFn.length; i++) {
                args.push(argsFn[i](self, locals));
              }
              return fn.apply(self, args);
            };
            return function() {
              return fnInvoke;
            };
          }
        }
      }
      function expression() {
        return assignment();
      }
      function _assignment() {
        var left = logicalOR();
        var right;
        var token;
        if ((token = expect('='))) {
          if (!left.assign) {
            throwError("implies assignment but [" + text.substring(0, token.index) + "] can not be assigned to", token);
          }
          right = logicalOR();
          return function(scope, locals) {
            return left.assign(scope, right(scope, locals), locals);
          };
        } else {
          return left;
        }
      }
      function logicalOR() {
        var left = logicalAND();
        var token;
        while (true) {
          if ((token = expect('||'))) {
            left = binaryFn(left, token.fn, logicalAND());
          } else {
            return left;
          }
        }
      }
      function logicalAND() {
        var left = equality();
        var token;
        if ((token = expect('&&'))) {
          left = binaryFn(left, token.fn, logicalAND());
        }
        return left;
      }
      function equality() {
        var left = relational();
        var token;
        if ((token = expect('==', '!='))) {
          left = binaryFn(left, token.fn, equality());
        }
        return left;
      }
      function relational() {
        var left = additive();
        var token;
        if ((token = expect('<', '>', '<=', '>='))) {
          left = binaryFn(left, token.fn, relational());
        }
        return left;
      }
      function additive() {
        var left = multiplicative();
        var token;
        while ((token = expect('+', '-'))) {
          left = binaryFn(left, token.fn, multiplicative());
        }
        return left;
      }
      function multiplicative() {
        var left = unary();
        var token;
        while ((token = expect('*', '/', '%'))) {
          left = binaryFn(left, token.fn, unary());
        }
        return left;
      }
      function unary() {
        var token;
        if (expect('+')) {
          return primary();
        } else if ((token = expect('-'))) {
          return binaryFn(ZERO, token.fn, unary());
        } else if ((token = expect('!'))) {
          return unaryFn(token.fn, unary());
        } else {
          return primary();
        }
      }
      function primary() {
        var primary;
        if (expect('(')) {
          primary = filterChain();
          consume(')');
        } else if (expect('[')) {
          primary = arrayDeclaration();
        } else if (expect('{')) {
          primary = object();
        } else {
          var token = expect();
          primary = token.fn;
          if (!primary) {
            throwError("not a primary expression", token);
          }
        }
        var next,
            context;
        while ((next = expect('(', '[', '.'))) {
          if (next.text === '(') {
            primary = functionCall(primary, context);
            context = null;
          } else if (next.text === '[') {
            context = primary;
            primary = objectIndex(primary);
          } else if (next.text === '.') {
            context = primary;
            primary = fieldAccess(primary);
          } else {
            throwError("IMPOSSIBLE");
          }
        }
        return primary;
      }
      function _fieldAccess(object) {
        var field = expect().text;
        var getter = getterFn(field, csp);
        return extend(function(scope, locals, self) {
          return getter(self || object(scope, locals), locals);
        }, {assign: function(scope, value, locals) {
            return setter(object(scope, locals), field, value);
          }});
      }
      function _objectIndex(obj) {
        var indexFn = expression();
        consume(']');
        return extend(function(self, locals) {
          var o = obj(self, locals),
              i = indexFn(self, locals),
              v,
              p;
          if (!o)
            return undefined;
          v = o[i];
          if (v && v.then) {
            p = v;
            if (!('$$v' in v)) {
              p.$$v = undefined;
              p.then(function(val) {
                p.$$v = val;
              });
            }
            v = v.$$v;
          }
          return v;
        }, {assign: function(self, value, locals) {
            return obj(self, locals)[indexFn(self, locals)] = value;
          }});
      }
      function _functionCall(fn, contextGetter) {
        var argsFn = [];
        if (peekToken().text != ')') {
          do {
            argsFn.push(expression());
          } while (expect(','));
        }
        consume(')');
        return function(scope, locals) {
          var args = [],
              context = contextGetter ? contextGetter(scope, locals) : scope;
          for (var i = 0; i < argsFn.length; i++) {
            args.push(argsFn[i](scope, locals));
          }
          var fnPtr = fn(scope, locals, context) || noop;
          return fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
        };
      }
      function arrayDeclaration() {
        var elementFns = [];
        if (peekToken().text != ']') {
          do {
            elementFns.push(expression());
          } while (expect(','));
        }
        consume(']');
        return function(self, locals) {
          var array = [];
          for (var i = 0; i < elementFns.length; i++) {
            array.push(elementFns[i](self, locals));
          }
          return array;
        };
      }
      function object() {
        var keyValues = [];
        if (peekToken().text != '}') {
          do {
            var token = expect(),
                key = token.string || token.text;
            consume(":");
            var value = expression();
            keyValues.push({
              key: key,
              value: value
            });
          } while (expect(','));
        }
        consume('}');
        return function(self, locals) {
          var object = {};
          for (var i = 0; i < keyValues.length; i++) {
            var keyValue = keyValues[i];
            object[keyValue.key] = keyValue.value(self, locals);
          }
          return object;
        };
      }
    }
    function setter(obj, path, setValue) {
      var element = path.split('.');
      for (var i = 0; element.length > 1; i++) {
        var key = element.shift();
        var propertyObj = obj[key];
        if (!propertyObj) {
          propertyObj = {};
          obj[key] = propertyObj;
        }
        obj = propertyObj;
      }
      obj[element.shift()] = setValue;
      return setValue;
    }
    var getterFnCache = {};
    function cspSafeGetterFn(key0, key1, key2, key3, key4) {
      return function(scope, locals) {
        var pathVal = (locals && locals.hasOwnProperty(key0)) ? locals : scope,
            promise;
        if (pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key0];
        if (pathVal && pathVal.then) {
          if (!("$$v" in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function(val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key1 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key1];
        if (pathVal && pathVal.then) {
          if (!("$$v" in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function(val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key2 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key2];
        if (pathVal && pathVal.then) {
          if (!("$$v" in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function(val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key3 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key3];
        if (pathVal && pathVal.then) {
          if (!("$$v" in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function(val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key4 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key4];
        if (pathVal && pathVal.then) {
          if (!("$$v" in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function(val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        return pathVal;
      };
    }
    function getterFn(path, csp) {
      if (getterFnCache.hasOwnProperty(path)) {
        return getterFnCache[path];
      }
      var pathKeys = path.split('.'),
          pathKeysLength = pathKeys.length,
          fn;
      if (csp) {
        fn = (pathKeysLength < 6) ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4]) : function(scope, locals) {
          var i = 0,
              val;
          do {
            val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++])(scope, locals);
            locals = undefined;
            scope = val;
          } while (i < pathKeysLength);
          return val;
        };
      } else {
        var code = 'var l, fn, p;\n';
        forEach(pathKeys, function(key, index) {
          code += 'if(s === null || s === undefined) return s;\n' + 'l=s;\n' + 's=' + (index ? 's' : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n' + 'if (s && s.then) {\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=v;});\n' + '}\n' + ' s=s.$$v\n' + '}\n';
        });
        code += 'return s;';
        fn = Function('s', 'k', code);
        fn.toString = function() {
          return code;
        };
      }
      return getterFnCache[path] = fn;
    }
    function $ParseProvider() {
      var cache = {};
      this.$get = ['$filter', '$sniffer', function($filter, $sniffer) {
        return function(exp) {
          switch (typeof exp) {
            case 'string':
              return cache.hasOwnProperty(exp) ? cache[exp] : cache[exp] = parser(exp, false, $filter, $sniffer.csp);
            case 'function':
              return exp;
            default:
              return noop;
          }
        };
      }];
    }
    function $QProvider() {
      this.$get = ['$rootScope', '$exceptionHandler', function($rootScope, $exceptionHandler) {
        return qFactory(function(callback) {
          $rootScope.$evalAsync(callback);
        }, $exceptionHandler);
      }];
    }
    function qFactory(nextTick, exceptionHandler) {
      var defer = function() {
        var pending = [],
            value,
            deferred;
        deferred = {
          resolve: function(val) {
            if (pending) {
              var callbacks = pending;
              pending = undefined;
              value = ref(val);
              if (callbacks.length) {
                nextTick(function() {
                  var callback;
                  for (var i = 0,
                      ii = callbacks.length; i < ii; i++) {
                    callback = callbacks[i];
                    value.then(callback[0], callback[1]);
                  }
                });
              }
            }
          },
          reject: function(reason) {
            deferred.resolve(reject(reason));
          },
          promise: {then: function(callback, errback) {
              var result = defer();
              var wrappedCallback = function(value) {
                try {
                  result.resolve((callback || defaultCallback)(value));
                } catch (e) {
                  result.reject(e);
                  exceptionHandler(e);
                }
              };
              var wrappedErrback = function(reason) {
                try {
                  result.resolve((errback || defaultErrback)(reason));
                } catch (e) {
                  result.reject(e);
                  exceptionHandler(e);
                }
              };
              if (pending) {
                pending.push([wrappedCallback, wrappedErrback]);
              } else {
                value.then(wrappedCallback, wrappedErrback);
              }
              return result.promise;
            }}
        };
        return deferred;
      };
      var ref = function(value) {
        if (value && value.then)
          return value;
        return {then: function(callback) {
            var result = defer();
            nextTick(function() {
              result.resolve(callback(value));
            });
            return result.promise;
          }};
      };
      var reject = function(reason) {
        return {then: function(callback, errback) {
            var result = defer();
            nextTick(function() {
              result.resolve((errback || defaultErrback)(reason));
            });
            return result.promise;
          }};
      };
      var when = function(value, callback, errback) {
        var result = defer(),
            done;
        var wrappedCallback = function(value) {
          try {
            return (callback || defaultCallback)(value);
          } catch (e) {
            exceptionHandler(e);
            return reject(e);
          }
        };
        var wrappedErrback = function(reason) {
          try {
            return (errback || defaultErrback)(reason);
          } catch (e) {
            exceptionHandler(e);
            return reject(e);
          }
        };
        nextTick(function() {
          ref(value).then(function(value) {
            if (done)
              return;
            done = true;
            result.resolve(ref(value).then(wrappedCallback, wrappedErrback));
          }, function(reason) {
            if (done)
              return;
            done = true;
            result.resolve(wrappedErrback(reason));
          });
        });
        return result.promise;
      };
      function defaultCallback(value) {
        return value;
      }
      function defaultErrback(reason) {
        return reject(reason);
      }
      function all(promises) {
        var deferred = defer(),
            counter = promises.length,
            results = [];
        if (counter) {
          forEach(promises, function(promise, index) {
            ref(promise).then(function(value) {
              if (index in results)
                return;
              results[index] = value;
              if (!(--counter))
                deferred.resolve(results);
            }, function(reason) {
              if (index in results)
                return;
              deferred.reject(reason);
            });
          });
        } else {
          deferred.resolve(results);
        }
        return deferred.promise;
      }
      return {
        defer: defer,
        reject: reject,
        when: when,
        all: all
      };
    }
    function $RouteProvider() {
      var routes = {};
      this.when = function(path, route) {
        routes[path] = extend({reloadOnSearch: true}, route);
        if (path) {
          var redirectPath = (path[path.length - 1] == '/') ? path.substr(0, path.length - 1) : path + '/';
          routes[redirectPath] = {redirectTo: path};
        }
        return this;
      };
      this.otherwise = function(params) {
        this.when(null, params);
        return this;
      };
      this.$get = ['$rootScope', '$location', '$routeParams', '$q', '$injector', '$http', '$templateCache', function($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache) {
        var forceReload = false,
            $route = {
              routes: routes,
              reload: function() {
                forceReload = true;
                $rootScope.$evalAsync(updateRoute);
              }
            };
        $rootScope.$on('$locationChangeSuccess', updateRoute);
        return $route;
        function switchRouteMatcher(on, when) {
          when = '^' + when.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + '$';
          var regex = '',
              params = [],
              dst = {};
          var re = /:(\w+)/g,
              paramMatch,
              lastMatchedIndex = 0;
          while ((paramMatch = re.exec(when)) !== null) {
            regex += when.slice(lastMatchedIndex, paramMatch.index);
            regex += '([^\\/]*)';
            params.push(paramMatch[1]);
            lastMatchedIndex = re.lastIndex;
          }
          regex += when.substr(lastMatchedIndex);
          var match = on.match(new RegExp(regex));
          if (match) {
            forEach(params, function(name, index) {
              dst[name] = match[index + 1];
            });
          }
          return match ? dst : null;
        }
        function updateRoute() {
          var next = parseRoute(),
              last = $route.current;
          if (next && last && next.$$route === last.$$route && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
            last.params = next.params;
            copy(last.params, $routeParams);
            $rootScope.$broadcast('$routeUpdate', last);
          } else if (next || last) {
            forceReload = false;
            $rootScope.$broadcast('$routeChangeStart', next, last);
            $route.current = next;
            if (next) {
              if (next.redirectTo) {
                if (isString(next.redirectTo)) {
                  $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace();
                } else {
                  $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace();
                }
              }
            }
            $q.when(next).then(function() {
              if (next) {
                var keys = [],
                    values = [],
                    template;
                forEach(next.resolve || {}, function(value, key) {
                  keys.push(key);
                  values.push(isString(value) ? $injector.get(value) : $injector.invoke(value));
                });
                if (isDefined(template = next.template)) {} else if (isDefined(template = next.templateUrl)) {
                  template = $http.get(template, {cache: $templateCache}).then(function(response) {
                    return response.data;
                  });
                }
                if (isDefined(template)) {
                  keys.push('$template');
                  values.push(template);
                }
                return $q.all(values).then(function(values) {
                  var locals = {};
                  forEach(values, function(value, index) {
                    locals[keys[index]] = value;
                  });
                  return locals;
                });
              }
            }).then(function(locals) {
              if (next == $route.current) {
                if (next) {
                  next.locals = locals;
                  copy(next.params, $routeParams);
                }
                $rootScope.$broadcast('$routeChangeSuccess', next, last);
              }
            }, function(error) {
              if (next == $route.current) {
                $rootScope.$broadcast('$routeChangeError', next, last, error);
              }
            });
          }
        }
        function parseRoute() {
          var params,
              match;
          forEach(routes, function(route, path) {
            if (!match && (params = switchRouteMatcher($location.path(), path))) {
              match = inherit(route, {
                params: extend({}, $location.search(), params),
                pathParams: params
              });
              match.$$route = route;
            }
          });
          return match || routes[null] && inherit(routes[null], {
            params: {},
            pathParams: {}
          });
        }
        function interpolate(string, params) {
          var result = [];
          forEach((string || '').split(':'), function(segment, i) {
            if (i == 0) {
              result.push(segment);
            } else {
              var segmentMatch = segment.match(/(\w+)(.*)/);
              var key = segmentMatch[1];
              result.push(params[key]);
              result.push(segmentMatch[2] || '');
              delete params[key];
            }
          });
          return result.join('');
        }
      }];
    }
    function $RouteParamsProvider() {
      this.$get = valueFn({});
    }
    function $RootScopeProvider() {
      var TTL = 10;
      this.digestTtl = function(value) {
        if (arguments.length) {
          TTL = value;
        }
        return TTL;
      };
      this.$get = ['$injector', '$exceptionHandler', '$parse', function($injector, $exceptionHandler, $parse) {
        function Scope() {
          this.$id = nextUid();
          this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          this['this'] = this.$root = this;
          this.$$destroyed = false;
          this.$$asyncQueue = [];
          this.$$listeners = {};
          this.$$isolateBindings = {};
        }
        Scope.prototype = {
          $new: function(isolate) {
            var Child,
                child;
            if (isFunction(isolate)) {
              throw Error('API-CHANGE: Use $controller to instantiate controllers.');
            }
            if (isolate) {
              child = new Scope();
              child.$root = this.$root;
            } else {
              Child = function() {};
              Child.prototype = this;
              child = new Child();
              child.$id = nextUid();
            }
            child['this'] = child;
            child.$$listeners = {};
            child.$parent = this;
            child.$$asyncQueue = [];
            child.$$watchers = child.$$nextSibling = child.$$childHead = child.$$childTail = null;
            child.$$prevSibling = this.$$childTail;
            if (this.$$childHead) {
              this.$$childTail.$$nextSibling = child;
              this.$$childTail = child;
            } else {
              this.$$childHead = this.$$childTail = child;
            }
            return child;
          },
          $watch: function(watchExp, listener, objectEquality) {
            var scope = this,
                get = compileToFn(watchExp, 'watch'),
                array = scope.$$watchers,
                watcher = {
                  fn: listener,
                  last: initWatchVal,
                  get: get,
                  exp: watchExp,
                  eq: !!objectEquality
                };
            if (!isFunction(listener)) {
              var listenFn = compileToFn(listener || noop, 'listener');
              watcher.fn = function(newVal, oldVal, scope) {
                listenFn(scope);
              };
            }
            if (!array) {
              array = scope.$$watchers = [];
            }
            array.unshift(watcher);
            return function() {
              arrayRemove(array, watcher);
            };
          },
          $digest: function() {
            var watch,
                value,
                last,
                watchers,
                asyncQueue,
                length,
                dirty,
                ttl = TTL,
                next,
                current,
                target = this,
                watchLog = [],
                logIdx,
                logMsg;
            beginPhase('$digest');
            do {
              dirty = false;
              current = target;
              do {
                asyncQueue = current.$$asyncQueue;
                while (asyncQueue.length) {
                  try {
                    current.$eval(asyncQueue.shift());
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                }
                if ((watchers = current.$$watchers)) {
                  length = watchers.length;
                  while (length--) {
                    try {
                      watch = watchers[length];
                      if (watch && (value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : (typeof value == 'number' && typeof last == 'number' && isNaN(value) && isNaN(last)))) {
                        dirty = true;
                        watch.last = watch.eq ? copy(value) : value;
                        watch.fn(value, ((last === initWatchVal) ? value : last), current);
                        if (ttl < 5) {
                          logIdx = 4 - ttl;
                          if (!watchLog[logIdx])
                            watchLog[logIdx] = [];
                          logMsg = (isFunction(watch.exp)) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                          logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last);
                          watchLog[logIdx].push(logMsg);
                        }
                      }
                    } catch (e) {
                      $exceptionHandler(e);
                    }
                  }
                }
                if (!(next = (current.$$childHead || (current !== target && current.$$nextSibling)))) {
                  while (current !== target && !(next = current.$$nextSibling)) {
                    current = current.$parent;
                  }
                }
              } while ((current = next));
              if (dirty && !(ttl--)) {
                clearPhase();
                throw Error(TTL + ' $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: ' + toJson(watchLog));
              }
            } while (dirty || asyncQueue.length);
            clearPhase();
          },
          $destroy: function() {
            if ($rootScope == this || this.$$destroyed)
              return;
            var parent = this.$parent;
            this.$broadcast('$destroy');
            this.$$destroyed = true;
            if (parent.$$childHead == this)
              parent.$$childHead = this.$$nextSibling;
            if (parent.$$childTail == this)
              parent.$$childTail = this.$$prevSibling;
            if (this.$$prevSibling)
              this.$$prevSibling.$$nextSibling = this.$$nextSibling;
            if (this.$$nextSibling)
              this.$$nextSibling.$$prevSibling = this.$$prevSibling;
            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          },
          $eval: function(expr, locals) {
            return $parse(expr)(this, locals);
          },
          $evalAsync: function(expr) {
            this.$$asyncQueue.push(expr);
          },
          $apply: function(expr) {
            try {
              beginPhase('$apply');
              return this.$eval(expr);
            } catch (e) {
              $exceptionHandler(e);
            } finally {
              clearPhase();
              try {
                $rootScope.$digest();
              } catch (e) {
                $exceptionHandler(e);
                throw e;
              }
            }
          },
          $on: function(name, listener) {
            var namedListeners = this.$$listeners[name];
            if (!namedListeners) {
              this.$$listeners[name] = namedListeners = [];
            }
            namedListeners.push(listener);
            return function() {
              namedListeners[indexOf(namedListeners, listener)] = null;
            };
          },
          $emit: function(name, args) {
            var empty = [],
                namedListeners,
                scope = this,
                stopPropagation = false,
                event = {
                  name: name,
                  targetScope: scope,
                  stopPropagation: function() {
                    stopPropagation = true;
                  },
                  preventDefault: function() {
                    event.defaultPrevented = true;
                  },
                  defaultPrevented: false
                },
                listenerArgs = concat([event], arguments, 1),
                i,
                length;
            do {
              namedListeners = scope.$$listeners[name] || empty;
              event.currentScope = scope;
              for (i = 0, length = namedListeners.length; i < length; i++) {
                if (!namedListeners[i]) {
                  namedListeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  namedListeners[i].apply(null, listenerArgs);
                  if (stopPropagation)
                    return event;
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              scope = scope.$parent;
            } while (scope);
            return event;
          },
          $broadcast: function(name, args) {
            var target = this,
                current = target,
                next = target,
                event = {
                  name: name,
                  targetScope: target,
                  preventDefault: function() {
                    event.defaultPrevented = true;
                  },
                  defaultPrevented: false
                },
                listenerArgs = concat([event], arguments, 1),
                listeners,
                i,
                length;
            do {
              current = next;
              event.currentScope = current;
              listeners = current.$$listeners[name] || [];
              for (i = 0, length = listeners.length; i < length; i++) {
                if (!listeners[i]) {
                  listeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  listeners[i].apply(null, listenerArgs);
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              if (!(next = (current.$$childHead || (current !== target && current.$$nextSibling)))) {
                while (current !== target && !(next = current.$$nextSibling)) {
                  current = current.$parent;
                }
              }
            } while ((current = next));
            return event;
          }
        };
        var $rootScope = new Scope();
        return $rootScope;
        function beginPhase(phase) {
          if ($rootScope.$$phase) {
            throw Error($rootScope.$$phase + ' already in progress');
          }
          $rootScope.$$phase = phase;
        }
        function clearPhase() {
          $rootScope.$$phase = null;
        }
        function compileToFn(exp, name) {
          var fn = $parse(exp);
          assertArgFn(fn, name);
          return fn;
        }
        function initWatchVal() {}
      }];
    }
    function $SnifferProvider() {
      this.$get = ['$window', function($window) {
        var eventSupport = {},
            android = int((/android (\d+)/.exec(lowercase($window.navigator.userAgent)) || [])[1]);
        return {
          history: !!($window.history && $window.history.pushState && !(android < 4)),
          hashchange: 'onhashchange' in $window && (!$window.document.documentMode || $window.document.documentMode > 7),
          hasEvent: function(event) {
            if (event == 'input' && msie == 9)
              return false;
            if (isUndefined(eventSupport[event])) {
              var divElm = $window.document.createElement('div');
              eventSupport[event] = 'on' + event in divElm;
            }
            return eventSupport[event];
          },
          csp: false
        };
      }];
    }
    function $WindowProvider() {
      this.$get = valueFn(window);
    }
    function parseHeaders(headers) {
      var parsed = {},
          key,
          val,
          i;
      if (!headers)
        return parsed;
      forEach(headers.split('\n'), function(line) {
        i = line.indexOf(':');
        key = lowercase(trim(line.substr(0, i)));
        val = trim(line.substr(i + 1));
        if (key) {
          if (parsed[key]) {
            parsed[key] += ', ' + val;
          } else {
            parsed[key] = val;
          }
        }
      });
      return parsed;
    }
    function headersGetter(headers) {
      var headersObj = isObject(headers) ? headers : undefined;
      return function(name) {
        if (!headersObj)
          headersObj = parseHeaders(headers);
        if (name) {
          return headersObj[lowercase(name)] || null;
        }
        return headersObj;
      };
    }
    function transformData(data, headers, fns) {
      if (isFunction(fns))
        return fns(data, headers);
      forEach(fns, function(fn) {
        data = fn(data, headers);
      });
      return data;
    }
    function isSuccess(status) {
      return 200 <= status && status < 300;
    }
    function $HttpProvider() {
      var JSON_START = /^\s*(\[|\{[^\{])/,
          JSON_END = /[\}\]]\s*$/,
          PROTECTION_PREFIX = /^\)\]\}',?\n/;
      var $config = this.defaults = {
        transformResponse: [function(data) {
          if (isString(data)) {
            data = data.replace(PROTECTION_PREFIX, '');
            if (JSON_START.test(data) && JSON_END.test(data))
              data = fromJson(data, true);
          }
          return data;
        }],
        transformRequest: [function(d) {
          return isObject(d) && !isFile(d) ? toJson(d) : d;
        }],
        headers: {
          common: {
            'Accept': 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
          },
          post: {'Content-Type': 'application/json;charset=utf-8'},
          put: {'Content-Type': 'application/json;charset=utf-8'}
        }
      };
      var providerResponseInterceptors = this.responseInterceptors = [];
      this.$get = ['$httpBackend', '$browser', '$cacheFactory', '$rootScope', '$q', '$injector', function($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
        var defaultCache = $cacheFactory('$http'),
            responseInterceptors = [];
        forEach(providerResponseInterceptors, function(interceptor) {
          responseInterceptors.push(isString(interceptor) ? $injector.get(interceptor) : $injector.invoke(interceptor));
        });
        function $http(config) {
          config.method = uppercase(config.method);
          var reqTransformFn = config.transformRequest || $config.transformRequest,
              respTransformFn = config.transformResponse || $config.transformResponse,
              reqHeaders = extend({}, config.headers),
              defHeaders = extend({'X-XSRF-TOKEN': $browser.cookies()['XSRF-TOKEN']}, $config.headers.common, $config.headers[lowercase(config.method)]),
              reqData,
              defHeaderName,
              lowercaseDefHeaderName,
              headerName,
              promise;
          defaultHeadersIteration: for (defHeaderName in defHeaders) {
            lowercaseDefHeaderName = lowercase(defHeaderName);
            for (headerName in config.headers) {
              if (lowercase(headerName) === lowercaseDefHeaderName) {
                continue defaultHeadersIteration;
              }
            }
            reqHeaders[defHeaderName] = defHeaders[defHeaderName];
          }
          if (isUndefined(config.data)) {
            for (var header in reqHeaders) {
              if (lowercase(header) === 'content-type') {
                delete reqHeaders[header];
                break;
              }
            }
          }
          reqData = transformData(config.data, headersGetter(reqHeaders), reqTransformFn);
          promise = sendReq(config, reqData, reqHeaders);
          promise = promise.then(transformResponse, transformResponse);
          forEach(responseInterceptors, function(interceptor) {
            promise = interceptor(promise);
          });
          promise.success = function(fn) {
            promise.then(function(response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          promise.error = function(fn) {
            promise.then(null, function(response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          return promise;
          function transformResponse(response) {
            var resp = extend({}, response, {data: transformData(response.data, response.headers, respTransformFn)});
            return (isSuccess(response.status)) ? resp : $q.reject(resp);
          }
        }
        $http.pendingRequests = [];
        createShortMethods('get', 'delete', 'head', 'jsonp');
        createShortMethodsWithData('post', 'put');
        $http.defaults = $config;
        return $http;
        function createShortMethods(names) {
          forEach(arguments, function(name) {
            $http[name] = function(url, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url
              }));
            };
          });
        }
        function createShortMethodsWithData(name) {
          forEach(arguments, function(name) {
            $http[name] = function(url, data, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url,
                data: data
              }));
            };
          });
        }
        function sendReq(config, reqData, reqHeaders) {
          var deferred = $q.defer(),
              promise = deferred.promise,
              cache,
              cachedResp,
              url = buildUrl(config.url, config.params);
          $http.pendingRequests.push(config);
          promise.then(removePendingReq, removePendingReq);
          if (config.cache && config.method == 'GET') {
            cache = isObject(config.cache) ? config.cache : defaultCache;
          }
          if (cache) {
            cachedResp = cache.get(url);
            if (cachedResp) {
              if (cachedResp.then) {
                cachedResp.then(removePendingReq, removePendingReq);
                return cachedResp;
              } else {
                if (isArray(cachedResp)) {
                  resolvePromise(cachedResp[1], cachedResp[0], copy(cachedResp[2]));
                } else {
                  resolvePromise(cachedResp, 200, {});
                }
              }
            } else {
              cache.put(url, promise);
            }
          }
          if (!cachedResp) {
            $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials);
          }
          return promise;
          function done(status, response, headersString) {
            if (cache) {
              if (isSuccess(status)) {
                cache.put(url, [status, response, parseHeaders(headersString)]);
              } else {
                cache.remove(url);
              }
            }
            resolvePromise(response, status, headersString);
            $rootScope.$apply();
          }
          function resolvePromise(response, status, headers) {
            status = Math.max(status, 0);
            (isSuccess(status) ? deferred.resolve : deferred.reject)({
              data: response,
              status: status,
              headers: headersGetter(headers),
              config: config
            });
          }
          function removePendingReq() {
            var idx = indexOf($http.pendingRequests, config);
            if (idx !== -1)
              $http.pendingRequests.splice(idx, 1);
          }
        }
        function buildUrl(url, params) {
          if (!params)
            return url;
          var parts = [];
          forEachSorted(params, function(value, key) {
            if (value == null || value == undefined)
              return;
            if (isObject(value)) {
              value = toJson(value);
            }
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
          });
          return url + ((url.indexOf('?') == -1) ? '?' : '&') + parts.join('&');
        }
      }];
    }
    var XHR = window.XMLHttpRequest || function() {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      } catch (e1) {}
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      } catch (e2) {}
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e3) {}
      throw new Error("This browser does not support XMLHttpRequest.");
    };
    function $HttpBackendProvider() {
      this.$get = ['$browser', '$window', '$document', function($browser, $window, $document) {
        return createHttpBackend($browser, XHR, $browser.defer, $window.angular.callbacks, $document[0], $window.location.protocol.replace(':', ''));
      }];
    }
    function createHttpBackend($browser, XHR, $browserDefer, callbacks, rawDocument, locationProtocol) {
      return function(method, url, post, callback, headers, timeout, withCredentials) {
        $browser.$$incOutstandingRequestCount();
        url = url || $browser.url();
        if (lowercase(method) == 'jsonp') {
          var callbackId = '_' + (callbacks.counter++).toString(36);
          callbacks[callbackId] = function(data) {
            callbacks[callbackId].data = data;
          };
          jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), function() {
            if (callbacks[callbackId].data) {
              completeRequest(callback, 200, callbacks[callbackId].data);
            } else {
              completeRequest(callback, -2);
            }
            delete callbacks[callbackId];
          });
        } else {
          var xhr = new XHR();
          xhr.open(method, url, true);
          forEach(headers, function(value, key) {
            if (value)
              xhr.setRequestHeader(key, value);
          });
          var status;
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              var responseHeaders = xhr.getAllResponseHeaders();
              var value,
                  simpleHeaders = ["Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma"];
              if (!responseHeaders) {
                responseHeaders = "";
                forEach(simpleHeaders, function(header) {
                  var value = xhr.getResponseHeader(header);
                  if (value) {
                    responseHeaders += header + ": " + value + "\n";
                  }
                });
              }
              completeRequest(callback, status || xhr.status, xhr.responseText, responseHeaders);
            }
          };
          if (withCredentials) {
            xhr.withCredentials = true;
          }
          xhr.send(post || '');
          if (timeout > 0) {
            $browserDefer(function() {
              status = -1;
              xhr.abort();
            }, timeout);
          }
        }
        function completeRequest(callback, status, response, headersString) {
          var protocol = (url.match(URL_MATCH) || ['', locationProtocol])[1];
          status = (protocol == 'file') ? (response ? 200 : 404) : status;
          status = status == 1223 ? 204 : status;
          callback(status, response, headersString);
          $browser.$$completeOutstandingRequest(noop);
        }
      };
      function jsonpReq(url, done) {
        var script = rawDocument.createElement('script'),
            doneWrapper = function() {
              rawDocument.body.removeChild(script);
              if (done)
                done();
            };
        script.type = 'text/javascript';
        script.src = url;
        if (msie) {
          script.onreadystatechange = function() {
            if (/loaded|complete/.test(script.readyState))
              doneWrapper();
          };
        } else {
          script.onload = script.onerror = doneWrapper;
        }
        rawDocument.body.appendChild(script);
      }
    }
    function $LocaleProvider() {
      this.$get = function() {
        return {
          id: 'en-us',
          NUMBER_FORMATS: {
            DECIMAL_SEP: '.',
            GROUP_SEP: ',',
            PATTERNS: [{
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            }, {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\u00A4',
              posSuf: '',
              negPre: '(\u00A4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }],
            CURRENCY_SYM: '$'
          },
          DATETIME_FORMATS: {
            MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
            SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
            DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
            SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
            AMPMS: ['AM', 'PM'],
            medium: 'MMM d, y h:mm:ss a',
            short: 'M/d/yy h:mm a',
            fullDate: 'EEEE, MMMM d, y',
            longDate: 'MMMM d, y',
            mediumDate: 'MMM d, y',
            shortDate: 'M/d/yy',
            mediumTime: 'h:mm:ss a',
            shortTime: 'h:mm a'
          },
          pluralCat: function(num) {
            if (num === 1) {
              return 'one';
            }
            return 'other';
          }
        };
      };
    }
    function $TimeoutProvider() {
      this.$get = ['$rootScope', '$browser', '$q', '$exceptionHandler', function($rootScope, $browser, $q, $exceptionHandler) {
        var deferreds = {};
        function timeout(fn, delay, invokeApply) {
          var deferred = $q.defer(),
              promise = deferred.promise,
              skipApply = (isDefined(invokeApply) && !invokeApply),
              timeoutId,
              cleanup;
          timeoutId = $browser.defer(function() {
            try {
              deferred.resolve(fn());
            } catch (e) {
              deferred.reject(e);
              $exceptionHandler(e);
            } finally {
              delete deferreds[promise.$$timeoutId];
            }
            if (!skipApply)
              $rootScope.$apply();
          }, delay);
          promise.$$timeoutId = timeoutId;
          deferreds[timeoutId] = deferred;
          return promise;
        }
        timeout.cancel = function(promise) {
          if (promise && promise.$$timeoutId in deferreds) {
            deferreds[promise.$$timeoutId].reject('canceled');
            delete deferreds[promise.$$timeoutId];
            return $browser.defer.cancel(promise.$$timeoutId);
          }
          return false;
        };
        return timeout;
      }];
    }
    $FilterProvider.$inject = ['$provide'];
    function $FilterProvider($provide) {
      var suffix = 'Filter';
      function register(name, factory) {
        return $provide.factory(name + suffix, factory);
      }
      this.register = register;
      this.$get = ['$injector', function($injector) {
        return function(name) {
          return $injector.get(name + suffix);
        };
      }];
      register('currency', currencyFilter);
      register('date', dateFilter);
      register('filter', filterFilter);
      register('json', jsonFilter);
      register('limitTo', limitToFilter);
      register('lowercase', lowercaseFilter);
      register('number', numberFilter);
      register('orderBy', orderByFilter);
      register('uppercase', uppercaseFilter);
    }
    function filterFilter() {
      return function(array, expression) {
        if (!isArray(array))
          return array;
        var predicates = [];
        predicates.check = function(value) {
          for (var j = 0; j < predicates.length; j++) {
            if (!predicates[j](value)) {
              return false;
            }
          }
          return true;
        };
        var search = function(obj, text) {
          if (text.charAt(0) === '!') {
            return !search(obj, text.substr(1));
          }
          switch (typeof obj) {
            case "boolean":
            case "number":
            case "string":
              return ('' + obj).toLowerCase().indexOf(text) > -1;
            case "object":
              for (var objKey in obj) {
                if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
                  return true;
                }
              }
              return false;
            case "array":
              for (var i = 0; i < obj.length; i++) {
                if (search(obj[i], text)) {
                  return true;
                }
              }
              return false;
            default:
              return false;
          }
        };
        switch (typeof expression) {
          case "boolean":
          case "number":
          case "string":
            expression = {$: expression};
          case "object":
            for (var key in expression) {
              if (key == '$') {
                (function() {
                  var text = ('' + expression[key]).toLowerCase();
                  if (!text)
                    return;
                  predicates.push(function(value) {
                    return search(value, text);
                  });
                })();
              } else {
                (function() {
                  var path = key;
                  var text = ('' + expression[key]).toLowerCase();
                  if (!text)
                    return;
                  predicates.push(function(value) {
                    return search(getter(value, path), text);
                  });
                })();
              }
            }
            break;
          case 'function':
            predicates.push(expression);
            break;
          default:
            return array;
        }
        var filtered = [];
        for (var j = 0; j < array.length; j++) {
          var value = array[j];
          if (predicates.check(value)) {
            filtered.push(value);
          }
        }
        return filtered;
      };
    }
    currencyFilter.$inject = ['$locale'];
    function currencyFilter($locale) {
      var formats = $locale.NUMBER_FORMATS;
      return function(amount, currencySymbol) {
        if (isUndefined(currencySymbol))
          currencySymbol = formats.CURRENCY_SYM;
        return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
      };
    }
    numberFilter.$inject = ['$locale'];
    function numberFilter($locale) {
      var formats = $locale.NUMBER_FORMATS;
      return function(number, fractionSize) {
        return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
      };
    }
    var DECIMAL_SEP = '.';
    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
      if (isNaN(number) || !isFinite(number))
        return '';
      var isNegative = number < 0;
      number = Math.abs(number);
      var numStr = number + '',
          formatedText = '',
          parts = [];
      var hasExponent = false;
      if (numStr.indexOf('e') !== -1) {
        var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
        if (match && match[2] == '-' && match[3] > fractionSize + 1) {
          numStr = '0';
        } else {
          formatedText = numStr;
          hasExponent = true;
        }
      }
      if (!hasExponent) {
        var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
        if (isUndefined(fractionSize)) {
          fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
        }
        var pow = Math.pow(10, fractionSize);
        number = Math.round(number * pow) / pow;
        var fraction = ('' + number).split(DECIMAL_SEP);
        var whole = fraction[0];
        fraction = fraction[1] || '';
        var pos = 0,
            lgroup = pattern.lgSize,
            group = pattern.gSize;
        if (whole.length >= (lgroup + group)) {
          pos = whole.length - lgroup;
          for (var i = 0; i < pos; i++) {
            if ((pos - i) % group === 0 && i !== 0) {
              formatedText += groupSep;
            }
            formatedText += whole.charAt(i);
          }
        }
        for (i = pos; i < whole.length; i++) {
          if ((whole.length - i) % lgroup === 0 && i !== 0) {
            formatedText += groupSep;
          }
          formatedText += whole.charAt(i);
        }
        while (fraction.length < fractionSize) {
          fraction += '0';
        }
        if (fractionSize && fractionSize !== "0")
          formatedText += decimalSep + fraction.substr(0, fractionSize);
      } else {
        if (fractionSize > 0 && number > -1 && number < 1) {
          formatedText = number.toFixed(fractionSize);
        }
      }
      parts.push(isNegative ? pattern.negPre : pattern.posPre);
      parts.push(formatedText);
      parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
      return parts.join('');
    }
    function padNumber(num, digits, trim) {
      var neg = '';
      if (num < 0) {
        neg = '-';
        num = -num;
      }
      num = '' + num;
      while (num.length < digits)
        num = '0' + num;
      if (trim)
        num = num.substr(num.length - digits);
      return neg + num;
    }
    function dateGetter(name, size, offset, trim) {
      offset = offset || 0;
      return function(date) {
        var value = date['get' + name]();
        if (offset > 0 || value > -offset)
          value += offset;
        if (value === 0 && offset == -12)
          value = 12;
        return padNumber(value, size, trim);
      };
    }
    function dateStrGetter(name, shortForm) {
      return function(date, formats) {
        var value = date['get' + name]();
        var get = uppercase(shortForm ? ('SHORT' + name) : name);
        return formats[get][value];
      };
    }
    function timeZoneGetter(date) {
      var zone = -1 * date.getTimezoneOffset();
      var paddedZone = (zone >= 0) ? "+" : "";
      paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
      return paddedZone;
    }
    function ampmGetter(date, formats) {
      return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
    }
    var DATE_FORMATS = {
      yyyy: dateGetter('FullYear', 4),
      yy: dateGetter('FullYear', 2, 0, true),
      y: dateGetter('FullYear', 1),
      MMMM: dateStrGetter('Month'),
      MMM: dateStrGetter('Month', true),
      MM: dateGetter('Month', 2, 1),
      M: dateGetter('Month', 1, 1),
      dd: dateGetter('Date', 2),
      d: dateGetter('Date', 1),
      HH: dateGetter('Hours', 2),
      H: dateGetter('Hours', 1),
      hh: dateGetter('Hours', 2, -12),
      h: dateGetter('Hours', 1, -12),
      mm: dateGetter('Minutes', 2),
      m: dateGetter('Minutes', 1),
      ss: dateGetter('Seconds', 2),
      s: dateGetter('Seconds', 1),
      EEEE: dateStrGetter('Day'),
      EEE: dateStrGetter('Day', true),
      a: ampmGetter,
      Z: timeZoneGetter
    };
    var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
        NUMBER_STRING = /^\d+$/;
    dateFilter.$inject = ['$locale'];
    function dateFilter($locale) {
      var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
      function jsonStringToDate(string) {
        var match;
        if (match = string.match(R_ISO8601_STR)) {
          var date = new Date(0),
              tzHour = 0,
              tzMin = 0;
          if (match[9]) {
            tzHour = int(match[9] + match[10]);
            tzMin = int(match[9] + match[11]);
          }
          date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3]));
          date.setUTCHours(int(match[4] || 0) - tzHour, int(match[5] || 0) - tzMin, int(match[6] || 0), int(match[7] || 0));
          return date;
        }
        return string;
      }
      return function(date, format) {
        var text = '',
            parts = [],
            fn,
            match;
        format = format || 'mediumDate';
        format = $locale.DATETIME_FORMATS[format] || format;
        if (isString(date)) {
          if (NUMBER_STRING.test(date)) {
            date = int(date);
          } else {
            date = jsonStringToDate(date);
          }
        }
        if (isNumber(date)) {
          date = new Date(date);
        }
        if (!isDate(date)) {
          return date;
        }
        while (format) {
          match = DATE_FORMATS_SPLIT.exec(format);
          if (match) {
            parts = concat(parts, match, 1);
            format = parts.pop();
          } else {
            parts.push(format);
            format = null;
          }
        }
        forEach(parts, function(value) {
          fn = DATE_FORMATS[value];
          text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, "'");
        });
        return text;
      };
    }
    function jsonFilter() {
      return function(object) {
        return toJson(object, true);
      };
    }
    var lowercaseFilter = valueFn(lowercase);
    var uppercaseFilter = valueFn(uppercase);
    function limitToFilter() {
      return function(array, limit) {
        if (!(array instanceof Array))
          return array;
        limit = int(limit);
        var out = [],
            i,
            n;
        if (!array || !(array instanceof Array))
          return out;
        if (limit > array.length)
          limit = array.length;
        else if (limit < -array.length)
          limit = -array.length;
        if (limit > 0) {
          i = 0;
          n = limit;
        } else {
          i = array.length + limit;
          n = array.length;
        }
        for (; i < n; i++) {
          out.push(array[i]);
        }
        return out;
      };
    }
    orderByFilter.$inject = ['$parse'];
    function orderByFilter($parse) {
      return function(array, sortPredicate, reverseOrder) {
        if (!isArray(array))
          return array;
        if (!sortPredicate)
          return array;
        sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
        sortPredicate = map(sortPredicate, function(predicate) {
          var descending = false,
              get = predicate || identity;
          if (isString(predicate)) {
            if ((predicate.charAt(0) == '+' || predicate.charAt(0) == '-')) {
              descending = predicate.charAt(0) == '-';
              predicate = predicate.substring(1);
            }
            get = $parse(predicate);
          }
          return reverseComparator(function(a, b) {
            return compare(get(a), get(b));
          }, descending);
        });
        var arrayCopy = [];
        for (var i = 0; i < array.length; i++) {
          arrayCopy.push(array[i]);
        }
        return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
        function comparator(o1, o2) {
          for (var i = 0; i < sortPredicate.length; i++) {
            var comp = sortPredicate[i](o1, o2);
            if (comp !== 0)
              return comp;
          }
          return 0;
        }
        function reverseComparator(comp, descending) {
          return toBoolean(descending) ? function(a, b) {
            return comp(b, a);
          } : comp;
        }
        function compare(v1, v2) {
          var t1 = typeof v1;
          var t2 = typeof v2;
          if (t1 == t2) {
            if (t1 == "string") {
              v1 = v1.toLowerCase();
              v2 = v2.toLowerCase();
            }
            if (v1 === v2)
              return 0;
            return v1 < v2 ? -1 : 1;
          } else {
            return t1 < t2 ? -1 : 1;
          }
        }
      };
    }
    function ngDirective(directive) {
      if (isFunction(directive)) {
        directive = {link: directive};
      }
      directive.restrict = directive.restrict || 'AC';
      return valueFn(directive);
    }
    var htmlAnchorDirective = valueFn({
      restrict: 'E',
      compile: function(element, attr) {
        if (msie <= 8) {
          if (!attr.href && !attr.name) {
            attr.$set('href', '');
          }
          element.append(document.createComment('IE fix'));
        }
        return function(scope, element) {
          element.bind('click', function(event) {
            if (!element.attr('href')) {
              event.preventDefault();
            }
          });
        };
      }
    });
    var ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function(propName, attrName) {
      var normalized = directiveNormalize('ng-' + attrName);
      ngAttributeAliasDirectives[normalized] = function() {
        return {
          priority: 100,
          compile: function() {
            return function(scope, element, attr) {
              scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
                attr.$set(attrName, !!value);
              });
            };
          }
        };
      };
    });
    forEach(['src', 'href'], function(attrName) {
      var normalized = directiveNormalize('ng-' + attrName);
      ngAttributeAliasDirectives[normalized] = function() {
        return {
          priority: 99,
          link: function(scope, element, attr) {
            attr.$observe(normalized, function(value) {
              if (!value)
                return;
              attr.$set(attrName, value);
              if (msie)
                element.prop(attrName, attr[attrName]);
            });
          }
        };
      };
    });
    var nullFormCtrl = {
      $addControl: noop,
      $removeControl: noop,
      $setValidity: noop,
      $setDirty: noop
    };
    FormController.$inject = ['$element', '$attrs', '$scope'];
    function FormController(element, attrs) {
      var form = this,
          parentForm = element.parent().controller('form') || nullFormCtrl,
          invalidCount = 0,
          errors = form.$error = {};
      form.$name = attrs.name || attrs.ngForm;
      form.$dirty = false;
      form.$pristine = true;
      form.$valid = true;
      form.$invalid = false;
      parentForm.$addControl(form);
      element.addClass(PRISTINE_CLASS);
      toggleValidCss(true);
      function toggleValidCss(isValid, validationErrorKey) {
        validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
        element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
      }
      form.$addControl = function(control) {
        if (control.$name && !form.hasOwnProperty(control.$name)) {
          form[control.$name] = control;
        }
      };
      form.$removeControl = function(control) {
        if (control.$name && form[control.$name] === control) {
          delete form[control.$name];
        }
        forEach(errors, function(queue, validationToken) {
          form.$setValidity(validationToken, true, control);
        });
      };
      form.$setValidity = function(validationToken, isValid, control) {
        var queue = errors[validationToken];
        if (isValid) {
          if (queue) {
            arrayRemove(queue, control);
            if (!queue.length) {
              invalidCount--;
              if (!invalidCount) {
                toggleValidCss(isValid);
                form.$valid = true;
                form.$invalid = false;
              }
              errors[validationToken] = false;
              toggleValidCss(true, validationToken);
              parentForm.$setValidity(validationToken, true, form);
            }
          }
        } else {
          if (!invalidCount) {
            toggleValidCss(isValid);
          }
          if (queue) {
            if (includes(queue, control))
              return;
          } else {
            errors[validationToken] = queue = [];
            invalidCount++;
            toggleValidCss(false, validationToken);
            parentForm.$setValidity(validationToken, false, form);
          }
          queue.push(control);
          form.$valid = false;
          form.$invalid = true;
        }
      };
      form.$setDirty = function() {
        element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
        form.$dirty = true;
        form.$pristine = false;
        parentForm.$setDirty();
      };
    }
    var formDirectiveFactory = function(isNgForm) {
      return ['$timeout', function($timeout) {
        var formDirective = {
          name: 'form',
          restrict: 'E',
          controller: FormController,
          compile: function() {
            return {pre: function(scope, formElement, attr, controller) {
                if (!attr.action) {
                  var preventDefaultListener = function(event) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                  };
                  addEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                  formElement.bind('$destroy', function() {
                    $timeout(function() {
                      removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                    }, 0, false);
                  });
                }
                var parentFormCtrl = formElement.parent().controller('form'),
                    alias = attr.name || attr.ngForm;
                if (alias) {
                  scope[alias] = controller;
                }
                if (parentFormCtrl) {
                  formElement.bind('$destroy', function() {
                    parentFormCtrl.$removeControl(controller);
                    if (alias) {
                      scope[alias] = undefined;
                    }
                    extend(controller, nullFormCtrl);
                  });
                }
              }};
          }
        };
        return isNgForm ? extend(copy(formDirective), {restrict: 'EAC'}) : formDirective;
      }];
    };
    var formDirective = formDirectiveFactory();
    var ngFormDirective = formDirectiveFactory(true);
    var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
    var inputType = {
      'text': textInputType,
      'number': numberInputType,
      'url': urlInputType,
      'email': emailInputType,
      'radio': radioInputType,
      'checkbox': checkboxInputType,
      'hidden': noop,
      'button': noop,
      'submit': noop,
      'reset': noop
    };
    function isEmpty(value) {
      return isUndefined(value) || value === '' || value === null || value !== value;
    }
    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      var listener = function() {
        var value = trim(element.val());
        if (ctrl.$viewValue !== value) {
          scope.$apply(function() {
            ctrl.$setViewValue(value);
          });
        }
      };
      if ($sniffer.hasEvent('input')) {
        element.bind('input', listener);
      } else {
        var timeout;
        var deferListener = function() {
          if (!timeout) {
            timeout = $browser.defer(function() {
              listener();
              timeout = null;
            });
          }
        };
        element.bind('keydown', function(event) {
          var key = event.keyCode;
          if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
            return;
          deferListener();
        });
        element.bind('change', listener);
        if ($sniffer.hasEvent('paste')) {
          element.bind('paste cut', deferListener);
        }
      }
      ctrl.$render = function() {
        element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
      };
      var pattern = attr.ngPattern,
          patternValidator;
      var validate = function(regexp, value) {
        if (isEmpty(value) || regexp.test(value)) {
          ctrl.$setValidity('pattern', true);
          return value;
        } else {
          ctrl.$setValidity('pattern', false);
          return undefined;
        }
      };
      if (pattern) {
        if (pattern.match(/^\/(.*)\/$/)) {
          pattern = new RegExp(pattern.substr(1, pattern.length - 2));
          patternValidator = function(value) {
            return validate(pattern, value);
          };
        } else {
          patternValidator = function(value) {
            var patternObj = scope.$eval(pattern);
            if (!patternObj || !patternObj.test) {
              throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
            }
            return validate(patternObj, value);
          };
        }
        ctrl.$formatters.push(patternValidator);
        ctrl.$parsers.push(patternValidator);
      }
      if (attr.ngMinlength) {
        var minlength = int(attr.ngMinlength);
        var minLengthValidator = function(value) {
          if (!isEmpty(value) && value.length < minlength) {
            ctrl.$setValidity('minlength', false);
            return undefined;
          } else {
            ctrl.$setValidity('minlength', true);
            return value;
          }
        };
        ctrl.$parsers.push(minLengthValidator);
        ctrl.$formatters.push(minLengthValidator);
      }
      if (attr.ngMaxlength) {
        var maxlength = int(attr.ngMaxlength);
        var maxLengthValidator = function(value) {
          if (!isEmpty(value) && value.length > maxlength) {
            ctrl.$setValidity('maxlength', false);
            return undefined;
          } else {
            ctrl.$setValidity('maxlength', true);
            return value;
          }
        };
        ctrl.$parsers.push(maxLengthValidator);
        ctrl.$formatters.push(maxLengthValidator);
      }
    }
    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      textInputType(scope, element, attr, ctrl, $sniffer, $browser);
      ctrl.$parsers.push(function(value) {
        var empty = isEmpty(value);
        if (empty || NUMBER_REGEXP.test(value)) {
          ctrl.$setValidity('number', true);
          return value === '' ? null : (empty ? value : parseFloat(value));
        } else {
          ctrl.$setValidity('number', false);
          return undefined;
        }
      });
      ctrl.$formatters.push(function(value) {
        return isEmpty(value) ? '' : '' + value;
      });
      if (attr.min) {
        var min = parseFloat(attr.min);
        var minValidator = function(value) {
          if (!isEmpty(value) && value < min) {
            ctrl.$setValidity('min', false);
            return undefined;
          } else {
            ctrl.$setValidity('min', true);
            return value;
          }
        };
        ctrl.$parsers.push(minValidator);
        ctrl.$formatters.push(minValidator);
      }
      if (attr.max) {
        var max = parseFloat(attr.max);
        var maxValidator = function(value) {
          if (!isEmpty(value) && value > max) {
            ctrl.$setValidity('max', false);
            return undefined;
          } else {
            ctrl.$setValidity('max', true);
            return value;
          }
        };
        ctrl.$parsers.push(maxValidator);
        ctrl.$formatters.push(maxValidator);
      }
      ctrl.$formatters.push(function(value) {
        if (isEmpty(value) || isNumber(value)) {
          ctrl.$setValidity('number', true);
          return value;
        } else {
          ctrl.$setValidity('number', false);
          return undefined;
        }
      });
    }
    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      textInputType(scope, element, attr, ctrl, $sniffer, $browser);
      var urlValidator = function(value) {
        if (isEmpty(value) || URL_REGEXP.test(value)) {
          ctrl.$setValidity('url', true);
          return value;
        } else {
          ctrl.$setValidity('url', false);
          return undefined;
        }
      };
      ctrl.$formatters.push(urlValidator);
      ctrl.$parsers.push(urlValidator);
    }
    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      textInputType(scope, element, attr, ctrl, $sniffer, $browser);
      var emailValidator = function(value) {
        if (isEmpty(value) || EMAIL_REGEXP.test(value)) {
          ctrl.$setValidity('email', true);
          return value;
        } else {
          ctrl.$setValidity('email', false);
          return undefined;
        }
      };
      ctrl.$formatters.push(emailValidator);
      ctrl.$parsers.push(emailValidator);
    }
    function radioInputType(scope, element, attr, ctrl) {
      if (isUndefined(attr.name)) {
        element.attr('name', nextUid());
      }
      element.bind('click', function() {
        if (element[0].checked) {
          scope.$apply(function() {
            ctrl.$setViewValue(attr.value);
          });
        }
      });
      ctrl.$render = function() {
        var value = attr.value;
        element[0].checked = (value == ctrl.$viewValue);
      };
      attr.$observe('value', ctrl.$render);
    }
    function checkboxInputType(scope, element, attr, ctrl) {
      var trueValue = attr.ngTrueValue,
          falseValue = attr.ngFalseValue;
      if (!isString(trueValue))
        trueValue = true;
      if (!isString(falseValue))
        falseValue = false;
      element.bind('click', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(element[0].checked);
        });
      });
      ctrl.$render = function() {
        element[0].checked = ctrl.$viewValue;
      };
      ctrl.$formatters.push(function(value) {
        return value === trueValue;
      });
      ctrl.$parsers.push(function(value) {
        return value ? trueValue : falseValue;
      });
    }
    var inputDirective = ['$browser', '$sniffer', function($browser, $sniffer) {
      return {
        restrict: 'E',
        require: '?ngModel',
        link: function(scope, element, attr, ctrl) {
          if (ctrl) {
            (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
          }
        }
      };
    }];
    var VALID_CLASS = 'ng-valid',
        INVALID_CLASS = 'ng-invalid',
        PRISTINE_CLASS = 'ng-pristine',
        DIRTY_CLASS = 'ng-dirty';
    var NgModelController = ['$scope', '$exceptionHandler', '$attrs', '$element', '$parse', function($scope, $exceptionHandler, $attr, $element, $parse) {
      this.$viewValue = Number.NaN;
      this.$modelValue = Number.NaN;
      this.$parsers = [];
      this.$formatters = [];
      this.$viewChangeListeners = [];
      this.$pristine = true;
      this.$dirty = false;
      this.$valid = true;
      this.$invalid = false;
      this.$name = $attr.name;
      var ngModelGet = $parse($attr.ngModel),
          ngModelSet = ngModelGet.assign;
      if (!ngModelSet) {
        throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel + ' (' + startingTag($element) + ')');
      }
      this.$render = noop;
      var parentForm = $element.inheritedData('$formController') || nullFormCtrl,
          invalidCount = 0,
          $error = this.$error = {};
      $element.addClass(PRISTINE_CLASS);
      toggleValidCss(true);
      function toggleValidCss(isValid, validationErrorKey) {
        validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
        $element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
      }
      this.$setValidity = function(validationErrorKey, isValid) {
        if ($error[validationErrorKey] === !isValid)
          return;
        if (isValid) {
          if ($error[validationErrorKey])
            invalidCount--;
          if (!invalidCount) {
            toggleValidCss(true);
            this.$valid = true;
            this.$invalid = false;
          }
        } else {
          toggleValidCss(false);
          this.$invalid = true;
          this.$valid = false;
          invalidCount++;
        }
        $error[validationErrorKey] = !isValid;
        toggleValidCss(isValid, validationErrorKey);
        parentForm.$setValidity(validationErrorKey, isValid, this);
      };
      this.$setViewValue = function(value) {
        this.$viewValue = value;
        if (this.$pristine) {
          this.$dirty = true;
          this.$pristine = false;
          $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
          parentForm.$setDirty();
        }
        forEach(this.$parsers, function(fn) {
          value = fn(value);
        });
        if (this.$modelValue !== value) {
          this.$modelValue = value;
          ngModelSet($scope, value);
          forEach(this.$viewChangeListeners, function(listener) {
            try {
              listener();
            } catch (e) {
              $exceptionHandler(e);
            }
          });
        }
      };
      var ctrl = this;
      $scope.$watch(function ngModelWatch() {
        var value = ngModelGet($scope);
        if (ctrl.$modelValue !== value) {
          var formatters = ctrl.$formatters,
              idx = formatters.length;
          ctrl.$modelValue = value;
          while (idx--) {
            value = formatters[idx](value);
          }
          if (ctrl.$viewValue !== value) {
            ctrl.$viewValue = value;
            ctrl.$render();
          }
        }
      });
    }];
    var ngModelDirective = function() {
      return {
        require: ['ngModel', '^?form'],
        controller: NgModelController,
        link: function(scope, element, attr, ctrls) {
          var modelCtrl = ctrls[0],
              formCtrl = ctrls[1] || nullFormCtrl;
          formCtrl.$addControl(modelCtrl);
          element.bind('$destroy', function() {
            formCtrl.$removeControl(modelCtrl);
          });
        }
      };
    };
    var ngChangeDirective = valueFn({
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {
        ctrl.$viewChangeListeners.push(function() {
          scope.$eval(attr.ngChange);
        });
      }
    });
    var requiredDirective = function() {
      return {
        require: '?ngModel',
        link: function(scope, elm, attr, ctrl) {
          if (!ctrl)
            return;
          attr.required = true;
          var validator = function(value) {
            if (attr.required && (isEmpty(value) || value === false)) {
              ctrl.$setValidity('required', false);
              return;
            } else {
              ctrl.$setValidity('required', true);
              return value;
            }
          };
          ctrl.$formatters.push(validator);
          ctrl.$parsers.unshift(validator);
          attr.$observe('required', function() {
            validator(ctrl.$viewValue);
          });
        }
      };
    };
    var ngListDirective = function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
          var match = /\/(.*)\//.exec(attr.ngList),
              separator = match && new RegExp(match[1]) || attr.ngList || ',';
          var parse = function(viewValue) {
            var list = [];
            if (viewValue) {
              forEach(viewValue.split(separator), function(value) {
                if (value)
                  list.push(trim(value));
              });
            }
            return list;
          };
          ctrl.$parsers.push(parse);
          ctrl.$formatters.push(function(value) {
            if (isArray(value)) {
              return value.join(', ');
            }
            return undefined;
          });
        }
      };
    };
    var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
    var ngValueDirective = function() {
      return {
        priority: 100,
        compile: function(tpl, tplAttr) {
          if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
            return function(scope, elm, attr) {
              attr.$set('value', scope.$eval(attr.ngValue));
            };
          } else {
            return function(scope, elm, attr) {
              scope.$watch(attr.ngValue, function valueWatchAction(value) {
                attr.$set('value', value);
              });
            };
          }
        }
      };
    };
    var ngBindDirective = ngDirective(function(scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.ngBind);
      scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
        element.text(value == undefined ? '' : value);
      });
    });
    var ngBindTemplateDirective = ['$interpolate', function($interpolate) {
      return function(scope, element, attr) {
        var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
        element.addClass('ng-binding').data('$binding', interpolateFn);
        attr.$observe('ngBindTemplate', function(value) {
          element.text(value);
        });
      };
    }];
    var ngBindHtmlUnsafeDirective = [function() {
      return function(scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
        scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
          element.html(value || '');
        });
      };
    }];
    function classDirective(name, selector) {
      name = 'ngClass' + name;
      return ngDirective(function(scope, element, attr) {
        var oldVal = undefined;
        scope.$watch(attr[name], ngClassWatchAction, true);
        attr.$observe('class', function(value) {
          var ngClass = scope.$eval(attr[name]);
          ngClassWatchAction(ngClass, ngClass);
        });
        if (name !== 'ngClass') {
          scope.$watch('$index', function($index, old$index) {
            var mod = $index & 1;
            if (mod !== old$index & 1) {
              if (mod === selector) {
                addClass(scope.$eval(attr[name]));
              } else {
                removeClass(scope.$eval(attr[name]));
              }
            }
          });
        }
        function ngClassWatchAction(newVal) {
          if (selector === true || scope.$index % 2 === selector) {
            if (oldVal && !equals(newVal, oldVal)) {
              removeClass(oldVal);
            }
            addClass(newVal);
          }
          oldVal = copy(newVal);
        }
        function removeClass(classVal) {
          if (isObject(classVal) && !isArray(classVal)) {
            classVal = map(classVal, function(v, k) {
              if (v)
                return k;
            });
          }
          element.removeClass(isArray(classVal) ? classVal.join(' ') : classVal);
        }
        function addClass(classVal) {
          if (isObject(classVal) && !isArray(classVal)) {
            classVal = map(classVal, function(v, k) {
              if (v)
                return k;
            });
          }
          if (classVal) {
            element.addClass(isArray(classVal) ? classVal.join(' ') : classVal);
          }
        }
      });
    }
    var ngClassDirective = classDirective('', true);
    var ngClassOddDirective = classDirective('Odd', 0);
    var ngClassEvenDirective = classDirective('Even', 1);
    var ngCloakDirective = ngDirective({compile: function(element, attr) {
        attr.$set('ngCloak', undefined);
        element.removeClass('ng-cloak');
      }});
    var ngControllerDirective = [function() {
      return {
        scope: true,
        controller: '@'
      };
    }];
    var ngCspDirective = ['$sniffer', function($sniffer) {
      return {
        priority: 1000,
        compile: function() {
          $sniffer.csp = true;
        }
      };
    }];
    var ngEventDirectives = {};
    forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave submit'.split(' '), function(name) {
      var directiveName = directiveNormalize('ng-' + name);
      ngEventDirectives[directiveName] = ['$parse', function($parse) {
        return function(scope, element, attr) {
          var fn = $parse(attr[directiveName]);
          element.bind(lowercase(name), function(event) {
            scope.$apply(function() {
              fn(scope, {$event: event});
            });
          });
        };
      }];
    });
    var ngIncludeDirective = ['$http', '$templateCache', '$anchorScroll', '$compile', function($http, $templateCache, $anchorScroll, $compile) {
      return {
        restrict: 'ECA',
        terminal: true,
        compile: function(element, attr) {
          var srcExp = attr.ngInclude || attr.src,
              onloadExp = attr.onload || '',
              autoScrollExp = attr.autoscroll;
          return function(scope, element) {
            var changeCounter = 0,
                childScope;
            var clearContent = function() {
              if (childScope) {
                childScope.$destroy();
                childScope = null;
              }
              element.html('');
            };
            scope.$watch(srcExp, function ngIncludeWatchAction(src) {
              var thisChangeId = ++changeCounter;
              if (src) {
                $http.get(src, {cache: $templateCache}).success(function(response) {
                  if (thisChangeId !== changeCounter)
                    return;
                  if (childScope)
                    childScope.$destroy();
                  childScope = scope.$new();
                  element.html(response);
                  $compile(element.contents())(childScope);
                  if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                    $anchorScroll();
                  }
                  childScope.$emit('$includeContentLoaded');
                  scope.$eval(onloadExp);
                }).error(function() {
                  if (thisChangeId === changeCounter)
                    clearContent();
                });
              } else
                clearContent();
            });
          };
        }
      };
    }];
    var ngInitDirective = ngDirective({compile: function() {
        return {pre: function(scope, element, attrs) {
            scope.$eval(attrs.ngInit);
          }};
      }});
    var ngNonBindableDirective = ngDirective({
      terminal: true,
      priority: 1000
    });
    var ngPluralizeDirective = ['$locale', '$interpolate', function($locale, $interpolate) {
      var BRACE = /{}/g;
      return {
        restrict: 'EA',
        link: function(scope, element, attr) {
          var numberExp = attr.count,
              whenExp = element.attr(attr.$attr.when),
              offset = attr.offset || 0,
              whens = scope.$eval(whenExp),
              whensExpFns = {},
              startSymbol = $interpolate.startSymbol(),
              endSymbol = $interpolate.endSymbol();
          forEach(whens, function(expression, key) {
            whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + '-' + offset + endSymbol));
          });
          scope.$watch(function ngPluralizeWatch() {
            var value = parseFloat(scope.$eval(numberExp));
            if (!isNaN(value)) {
              if (!(value in whens))
                value = $locale.pluralCat(value - offset);
              return whensExpFns[value](scope, element, true);
            } else {
              return '';
            }
          }, function ngPluralizeWatchAction(newVal) {
            element.text(newVal);
          });
        }
      };
    }];
    var ngRepeatDirective = ngDirective({
      transclude: 'element',
      priority: 1000,
      terminal: true,
      compile: function(element, attr, linker) {
        return function(scope, iterStartElement, attr) {
          var expression = attr.ngRepeat;
          var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/),
              lhs,
              rhs,
              valueIdent,
              keyIdent;
          if (!match) {
            throw Error("Expected ngRepeat in form of '_item_ in _collection_' but got '" + expression + "'.");
          }
          lhs = match[1];
          rhs = match[2];
          match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
          if (!match) {
            throw Error("'item' in 'item in collection' should be identifier or (key, value) but got '" + lhs + "'.");
          }
          valueIdent = match[3] || match[1];
          keyIdent = match[2];
          var lastOrder = new HashQueueMap();
          scope.$watch(function ngRepeatWatch(scope) {
            var index,
                length,
                collection = scope.$eval(rhs),
                cursor = iterStartElement,
                nextOrder = new HashQueueMap(),
                arrayBound,
                childScope,
                key,
                value,
                array,
                last;
            if (!isArray(collection)) {
              array = [];
              for (key in collection) {
                if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                  array.push(key);
                }
              }
              array.sort();
            } else {
              array = collection || [];
            }
            arrayBound = array.length - 1;
            for (index = 0, length = array.length; index < length; index++) {
              key = (collection === array) ? index : array[index];
              value = collection[key];
              last = lastOrder.shift(value);
              if (last) {
                childScope = last.scope;
                nextOrder.push(value, last);
                if (index === last.index) {
                  cursor = last.element;
                } else {
                  last.index = index;
                  cursor.after(last.element);
                  cursor = last.element;
                }
              } else {
                childScope = scope.$new();
              }
              childScope[valueIdent] = value;
              if (keyIdent)
                childScope[keyIdent] = key;
              childScope.$index = index;
              childScope.$first = (index === 0);
              childScope.$last = (index === arrayBound);
              childScope.$middle = !(childScope.$first || childScope.$last);
              if (!last) {
                linker(childScope, function(clone) {
                  cursor.after(clone);
                  last = {
                    scope: childScope,
                    element: (cursor = clone),
                    index: index
                  };
                  nextOrder.push(value, last);
                });
              }
            }
            for (key in lastOrder) {
              if (lastOrder.hasOwnProperty(key)) {
                array = lastOrder[key];
                while (array.length) {
                  value = array.pop();
                  value.element.remove();
                  value.scope.$destroy();
                }
              }
            }
            lastOrder = nextOrder;
          });
        };
      }
    });
    var ngShowDirective = ngDirective(function(scope, element, attr) {
      scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
        element.css('display', toBoolean(value) ? '' : 'none');
      });
    });
    var ngHideDirective = ngDirective(function(scope, element, attr) {
      scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        element.css('display', toBoolean(value) ? 'none' : '');
      });
    });
    var ngStyleDirective = ngDirective(function(scope, element, attr) {
      scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
        if (oldStyles && (newStyles !== oldStyles)) {
          forEach(oldStyles, function(val, style) {
            element.css(style, '');
          });
        }
        if (newStyles)
          element.css(newStyles);
      }, true);
    });
    var NG_SWITCH = 'ng-switch';
    var ngSwitchDirective = valueFn({
      restrict: 'EA',
      require: 'ngSwitch',
      controller: ['$scope', function ngSwitchController() {
        this.cases = {};
      }],
      link: function(scope, element, attr, ctrl) {
        var watchExpr = attr.ngSwitch || attr.on,
            selectedTransclude,
            selectedElement,
            selectedScope;
        scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
          if (selectedElement) {
            selectedScope.$destroy();
            selectedElement.remove();
            selectedElement = selectedScope = null;
          }
          if ((selectedTransclude = ctrl.cases['!' + value] || ctrl.cases['?'])) {
            scope.$eval(attr.change);
            selectedScope = scope.$new();
            selectedTransclude(selectedScope, function(caseElement) {
              selectedElement = caseElement;
              element.append(caseElement);
            });
          }
        });
      }
    });
    var ngSwitchWhenDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function(element, attrs, transclude) {
        return function(scope, element, attr, ctrl) {
          ctrl.cases['!' + attrs.ngSwitchWhen] = transclude;
        };
      }
    });
    var ngSwitchDefaultDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function(element, attrs, transclude) {
        return function(scope, element, attr, ctrl) {
          ctrl.cases['?'] = transclude;
        };
      }
    });
    var ngTranscludeDirective = ngDirective({controller: ['$transclude', '$element', function($transclude, $element) {
        $transclude(function(clone) {
          $element.append(clone);
        });
      }]});
    var ngViewDirective = ['$http', '$templateCache', '$route', '$anchorScroll', '$compile', '$controller', function($http, $templateCache, $route, $anchorScroll, $compile, $controller) {
      return {
        restrict: 'ECA',
        terminal: true,
        link: function(scope, element, attr) {
          var lastScope,
              onloadExp = attr.onload || '';
          scope.$on('$routeChangeSuccess', update);
          update();
          function destroyLastScope() {
            if (lastScope) {
              lastScope.$destroy();
              lastScope = null;
            }
          }
          function clearContent() {
            element.html('');
            destroyLastScope();
          }
          function update() {
            var locals = $route.current && $route.current.locals,
                template = locals && locals.$template;
            if (template) {
              element.html(template);
              destroyLastScope();
              var link = $compile(element.contents()),
                  current = $route.current,
                  controller;
              lastScope = current.scope = scope.$new();
              if (current.controller) {
                locals.$scope = lastScope;
                controller = $controller(current.controller, locals);
                element.children().data('$ngControllerController', controller);
              }
              link(lastScope);
              lastScope.$emit('$viewContentLoaded');
              lastScope.$eval(onloadExp);
              $anchorScroll();
            } else {
              clearContent();
            }
          }
        }
      };
    }];
    var scriptDirective = ['$templateCache', function($templateCache) {
      return {
        restrict: 'E',
        terminal: true,
        compile: function(element, attr) {
          if (attr.type == 'text/ng-template') {
            var templateUrl = attr.id,
                text = element[0].text;
            $templateCache.put(templateUrl, text);
          }
        }
      };
    }];
    var ngOptionsDirective = valueFn({terminal: true});
    var selectDirective = ['$compile', '$parse', function($compile, $parse) {
      var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/,
          nullModelCtrl = {$setViewValue: noop};
      return {
        restrict: 'E',
        require: ['select', '?ngModel'],
        controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {
          var self = this,
              optionsMap = {},
              ngModelCtrl = nullModelCtrl,
              nullOption,
              unknownOption;
          self.databound = $attrs.ngModel;
          self.init = function(ngModelCtrl_, nullOption_, unknownOption_) {
            ngModelCtrl = ngModelCtrl_;
            nullOption = nullOption_;
            unknownOption = unknownOption_;
          };
          self.addOption = function(value) {
            optionsMap[value] = true;
            if (ngModelCtrl.$viewValue == value) {
              $element.val(value);
              if (unknownOption.parent())
                unknownOption.remove();
            }
          };
          self.removeOption = function(value) {
            if (this.hasOption(value)) {
              delete optionsMap[value];
              if (ngModelCtrl.$viewValue == value) {
                this.renderUnknownOption(value);
              }
            }
          };
          self.renderUnknownOption = function(val) {
            var unknownVal = '? ' + hashKey(val) + ' ?';
            unknownOption.val(unknownVal);
            $element.prepend(unknownOption);
            $element.val(unknownVal);
            unknownOption.prop('selected', true);
          };
          self.hasOption = function(value) {
            return optionsMap.hasOwnProperty(value);
          };
          $scope.$on('$destroy', function() {
            self.renderUnknownOption = noop;
          });
        }],
        link: function(scope, element, attr, ctrls) {
          if (!ctrls[1])
            return;
          var selectCtrl = ctrls[0],
              ngModelCtrl = ctrls[1],
              multiple = attr.multiple,
              optionsExp = attr.ngOptions,
              nullOption = false,
              emptyOption,
              optionTemplate = jqLite(document.createElement('option')),
              optGroupTemplate = jqLite(document.createElement('optgroup')),
              unknownOption = optionTemplate.clone();
          for (var i = 0,
              children = element.children(),
              ii = children.length; i < ii; i++) {
            if (children[i].value == '') {
              emptyOption = nullOption = children.eq(i);
              break;
            }
          }
          selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
          if (multiple && (attr.required || attr.ngRequired)) {
            var requiredValidator = function(value) {
              ngModelCtrl.$setValidity('required', !attr.required || (value && value.length));
              return value;
            };
            ngModelCtrl.$parsers.push(requiredValidator);
            ngModelCtrl.$formatters.unshift(requiredValidator);
            attr.$observe('required', function() {
              requiredValidator(ngModelCtrl.$viewValue);
            });
          }
          if (optionsExp)
            Options(scope, element, ngModelCtrl);
          else if (multiple)
            Multiple(scope, element, ngModelCtrl);
          else
            Single(scope, element, ngModelCtrl, selectCtrl);
          function Single(scope, selectElement, ngModelCtrl, selectCtrl) {
            ngModelCtrl.$render = function() {
              var viewValue = ngModelCtrl.$viewValue;
              if (selectCtrl.hasOption(viewValue)) {
                if (unknownOption.parent())
                  unknownOption.remove();
                selectElement.val(viewValue);
                if (viewValue === '')
                  emptyOption.prop('selected', true);
              } else {
                if (isUndefined(viewValue) && emptyOption) {
                  selectElement.val('');
                } else {
                  selectCtrl.renderUnknownOption(viewValue);
                }
              }
            };
            selectElement.bind('change', function() {
              scope.$apply(function() {
                if (unknownOption.parent())
                  unknownOption.remove();
                ngModelCtrl.$setViewValue(selectElement.val());
              });
            });
          }
          function Multiple(scope, selectElement, ctrl) {
            var lastView;
            ctrl.$render = function() {
              var items = new HashMap(ctrl.$viewValue);
              forEach(selectElement.find('option'), function(option) {
                option.selected = isDefined(items.get(option.value));
              });
            };
            scope.$watch(function selectMultipleWatch() {
              if (!equals(lastView, ctrl.$viewValue)) {
                lastView = copy(ctrl.$viewValue);
                ctrl.$render();
              }
            });
            selectElement.bind('change', function() {
              scope.$apply(function() {
                var array = [];
                forEach(selectElement.find('option'), function(option) {
                  if (option.selected) {
                    array.push(option.value);
                  }
                });
                ctrl.$setViewValue(array);
              });
            });
          }
          function Options(scope, selectElement, ctrl) {
            var match;
            if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
              throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" + " but got '" + optionsExp + "'.");
            }
            var displayFn = $parse(match[2] || match[1]),
                valueName = match[4] || match[6],
                keyName = match[5],
                groupByFn = $parse(match[3] || ''),
                valueFn = $parse(match[2] ? match[1] : valueName),
                valuesFn = $parse(match[7]),
                optionGroupsCache = [[{
                  element: selectElement,
                  label: ''
                }]];
            if (nullOption) {
              $compile(nullOption)(scope);
              nullOption.removeClass('ng-scope');
              nullOption.remove();
            }
            selectElement.html('');
            selectElement.bind('change', function() {
              scope.$apply(function() {
                var optionGroup,
                    collection = valuesFn(scope) || [],
                    locals = {},
                    key,
                    value,
                    optionElement,
                    index,
                    groupIndex,
                    length,
                    groupLength;
                if (multiple) {
                  value = [];
                  for (groupIndex = 0, groupLength = optionGroupsCache.length; groupIndex < groupLength; groupIndex++) {
                    optionGroup = optionGroupsCache[groupIndex];
                    for (index = 1, length = optionGroup.length; index < length; index++) {
                      if ((optionElement = optionGroup[index].element)[0].selected) {
                        key = optionElement.val();
                        if (keyName)
                          locals[keyName] = key;
                        locals[valueName] = collection[key];
                        value.push(valueFn(scope, locals));
                      }
                    }
                  }
                } else {
                  key = selectElement.val();
                  if (key == '?') {
                    value = undefined;
                  } else if (key == '') {
                    value = null;
                  } else {
                    locals[valueName] = collection[key];
                    if (keyName)
                      locals[keyName] = key;
                    value = valueFn(scope, locals);
                  }
                }
                ctrl.$setViewValue(value);
              });
            });
            ctrl.$render = render;
            scope.$watch(render);
            function render() {
              var optionGroups = {'': []},
                  optionGroupNames = [''],
                  optionGroupName,
                  optionGroup,
                  option,
                  existingParent,
                  existingOptions,
                  existingOption,
                  modelValue = ctrl.$modelValue,
                  values = valuesFn(scope) || [],
                  keys = keyName ? sortedKeys(values) : values,
                  groupLength,
                  length,
                  groupIndex,
                  index,
                  locals = {},
                  selected,
                  selectedSet = false,
                  lastElement,
                  element,
                  label;
              if (multiple) {
                selectedSet = new HashMap(modelValue);
              }
              for (index = 0; length = keys.length, index < length; index++) {
                locals[valueName] = values[keyName ? locals[keyName] = keys[index] : index];
                optionGroupName = groupByFn(scope, locals) || '';
                if (!(optionGroup = optionGroups[optionGroupName])) {
                  optionGroup = optionGroups[optionGroupName] = [];
                  optionGroupNames.push(optionGroupName);
                }
                if (multiple) {
                  selected = selectedSet.remove(valueFn(scope, locals)) != undefined;
                } else {
                  selected = modelValue === valueFn(scope, locals);
                  selectedSet = selectedSet || selected;
                }
                label = displayFn(scope, locals);
                label = label === undefined ? '' : label;
                optionGroup.push({
                  id: keyName ? keys[index] : index,
                  label: label,
                  selected: selected
                });
              }
              if (!multiple) {
                if (nullOption || modelValue === null) {
                  optionGroups[''].unshift({
                    id: '',
                    label: '',
                    selected: !selectedSet
                  });
                } else if (!selectedSet) {
                  optionGroups[''].unshift({
                    id: '?',
                    label: '',
                    selected: true
                  });
                }
              }
              for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                optionGroupName = optionGroupNames[groupIndex];
                optionGroup = optionGroups[optionGroupName];
                if (optionGroupsCache.length <= groupIndex) {
                  existingParent = {
                    element: optGroupTemplate.clone().attr('label', optionGroupName),
                    label: optionGroup.label
                  };
                  existingOptions = [existingParent];
                  optionGroupsCache.push(existingOptions);
                  selectElement.append(existingParent.element);
                } else {
                  existingOptions = optionGroupsCache[groupIndex];
                  existingParent = existingOptions[0];
                  if (existingParent.label != optionGroupName) {
                    existingParent.element.attr('label', existingParent.label = optionGroupName);
                  }
                }
                lastElement = null;
                for (index = 0, length = optionGroup.length; index < length; index++) {
                  option = optionGroup[index];
                  if ((existingOption = existingOptions[index + 1])) {
                    lastElement = existingOption.element;
                    if (existingOption.label !== option.label) {
                      lastElement.text(existingOption.label = option.label);
                    }
                    if (existingOption.id !== option.id) {
                      lastElement.val(existingOption.id = option.id);
                    }
                    if (lastElement[0].selected !== option.selected) {
                      lastElement.prop('selected', (existingOption.selected = option.selected));
                    }
                  } else {
                    if (option.id === '' && nullOption) {
                      element = nullOption;
                    } else {
                      (element = optionTemplate.clone()).val(option.id).attr('selected', option.selected).text(option.label);
                    }
                    existingOptions.push(existingOption = {
                      element: element,
                      label: option.label,
                      id: option.id,
                      selected: option.selected
                    });
                    if (lastElement) {
                      lastElement.after(element);
                    } else {
                      existingParent.element.append(element);
                    }
                    lastElement = element;
                  }
                }
                index++;
                while (existingOptions.length > index) {
                  existingOptions.pop().element.remove();
                }
              }
              while (optionGroupsCache.length > groupIndex) {
                optionGroupsCache.pop()[0].element.remove();
              }
            }
          }
        }
      };
    }];
    var optionDirective = ['$interpolate', function($interpolate) {
      var nullSelectCtrl = {
        addOption: noop,
        removeOption: noop
      };
      return {
        restrict: 'E',
        priority: 100,
        compile: function(element, attr) {
          if (isUndefined(attr.value)) {
            var interpolateFn = $interpolate(element.text(), true);
            if (!interpolateFn) {
              attr.$set('value', element.text());
            }
          }
          return function(scope, element, attr) {
            var selectCtrlName = '$selectController',
                parent = element.parent(),
                selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
            if (selectCtrl && selectCtrl.databound) {
              element.prop('selected', false);
            } else {
              selectCtrl = nullSelectCtrl;
            }
            if (interpolateFn) {
              scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                attr.$set('value', newVal);
                if (newVal !== oldVal)
                  selectCtrl.removeOption(oldVal);
                selectCtrl.addOption(newVal);
              });
            } else {
              selectCtrl.addOption(attr.value);
            }
            element.bind('$destroy', function() {
              selectCtrl.removeOption(attr.value);
            });
          };
        }
      };
    }];
    var styleDirective = valueFn({
      restrict: 'E',
      terminal: true
    });
    angular.scenario = angular.scenario || {};
    angular.scenario.output = angular.scenario.output || function(name, fn) {
      angular.scenario.output[name] = fn;
    };
    angular.scenario.dsl = angular.scenario.dsl || function(name, fn) {
      angular.scenario.dsl[name] = function() {
        function executeStatement(statement, args) {
          var result = statement.apply(this, args);
          if (angular.isFunction(result) || result instanceof angular.scenario.Future)
            return result;
          var self = this;
          var chain = angular.extend({}, result);
          angular.forEach(chain, function(value, name) {
            if (angular.isFunction(value)) {
              chain[name] = function() {
                return executeStatement.call(self, value, arguments);
              };
            } else {
              chain[name] = value;
            }
          });
          return chain;
        }
        var statement = fn.apply(this, arguments);
        return function() {
          return executeStatement.call(this, statement, arguments);
        };
      };
    };
    angular.scenario.matcher = angular.scenario.matcher || function(name, fn) {
      angular.scenario.matcher[name] = function(expected) {
        var prefix = 'expect ' + this.future.name + ' ';
        if (this.inverse) {
          prefix += 'not ';
        }
        var self = this;
        this.addFuture(prefix + name + ' ' + angular.toJson(expected), function(done) {
          var error;
          self.actual = self.future.value;
          if ((self.inverse && fn.call(self, expected)) || (!self.inverse && !fn.call(self, expected))) {
            error = 'expected ' + angular.toJson(expected) + ' but was ' + angular.toJson(self.actual);
          }
          done(error);
        });
      };
    };
    angular.scenario.setUpAndRun = function(config) {
      var href = window.location.href;
      var body = _jQuery(document.body);
      var output = [];
      var objModel = new angular.scenario.ObjectModel($runner);
      if (config && config.scenario_output) {
        output = config.scenario_output.split(',');
      }
      angular.forEach(angular.scenario.output, function(fn, name) {
        if (!output.length || indexOf(output, name) != -1) {
          var context = body.append('<div></div>').find('div:last');
          context.attr('id', name);
          fn.call({}, context, $runner, objModel);
        }
      });
      if (!/^http/.test(href) && !/^https/.test(href)) {
        body.append('<p id="system-error"></p>');
        body.find('#system-error').text('Scenario runner must be run using http or https. The protocol ' + href.split(':')[0] + ':// is not supported.');
        return;
      }
      var appFrame = body.append('<div id="application"></div>').find('#application');
      var application = new angular.scenario.Application(appFrame);
      $runner.on('RunnerEnd', function() {
        appFrame.css('display', 'none');
        appFrame.find('iframe').attr('src', 'about:blank');
      });
      $runner.on('RunnerError', function(error) {
        if (window.console) {
          console.log(formatException(error));
        } else {
          alert(error);
        }
      });
      $runner.run(application);
    };
    function asyncForEach(list, iterator, done) {
      var i = 0;
      function loop(error, index) {
        if (index && index > i) {
          i = index;
        }
        if (error || i >= list.length) {
          done(error);
        } else {
          try {
            iterator(list[i++], loop);
          } catch (e) {
            done(e);
          }
        }
      }
      loop();
    }
    function formatException(error, maxStackLines) {
      maxStackLines = maxStackLines || 5;
      var message = error.toString();
      if (error.stack) {
        var stack = error.stack.split('\n');
        if (stack[0].indexOf(message) === -1) {
          maxStackLines++;
          stack.unshift(error.message);
        }
        message = stack.slice(0, maxStackLines).join('\n');
      }
      return message;
    }
    function callerFile(offset) {
      var error = new Error();
      return function() {
        var line = (error.stack || '').split('\n')[offset];
        if (line) {
          if (line.indexOf('@') !== -1) {
            line = line.substring(line.indexOf('@') + 1);
          } else {
            line = line.substring(line.indexOf('(') + 1).replace(')', '');
          }
        }
        return line || '';
      };
    }
    function browserTrigger(element, type, keys) {
      if (element && !element.nodeName)
        element = element[0];
      if (!element)
        return;
      if (!type) {
        type = {
          'text': 'change',
          'textarea': 'change',
          'hidden': 'change',
          'password': 'change',
          'button': 'click',
          'submit': 'click',
          'reset': 'click',
          'image': 'click',
          'checkbox': 'click',
          'radio': 'click',
          'select-one': 'change',
          'select-multiple': 'change'
        }[lowercase(element.type)] || 'click';
      }
      if (lowercase(nodeName_(element)) == 'option') {
        element.parentNode.value = element.value;
        element = element.parentNode;
        type = 'change';
      }
      keys = keys || [];
      function pressed(key) {
        return indexOf(keys, key) !== -1;
      }
      if (msie < 9) {
        switch (element.type) {
          case 'radio':
          case 'checkbox':
            element.checked = !element.checked;
            break;
        }
        element.style.posLeft;
        var ret = element.fireEvent('on' + type);
        if (lowercase(element.type) == 'submit') {
          while (element) {
            if (lowercase(element.nodeName) == 'form') {
              element.fireEvent('onsubmit');
              break;
            }
            element = element.parentNode;
          }
        }
        return ret;
      } else {
        var evnt = document.createEvent('MouseEvents'),
            originalPreventDefault = evnt.preventDefault,
            iframe = _jQuery('#application iframe')[0],
            appWindow = iframe ? iframe.contentWindow : window,
            fakeProcessDefault = true,
            finalProcessDefault,
            angular = appWindow.angular || {};
        angular['ff-684208-preventDefault'] = false;
        evnt.preventDefault = function() {
          fakeProcessDefault = false;
          return originalPreventDefault.apply(evnt, arguments);
        };
        evnt.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, pressed('ctrl'), pressed('alt'), pressed('shift'), pressed('meta'), 0, element);
        element.dispatchEvent(evnt);
        finalProcessDefault = !(angular['ff-684208-preventDefault'] || !fakeProcessDefault);
        delete angular['ff-684208-preventDefault'];
        return finalProcessDefault;
      }
    }
    (function(fn) {
      var parentTrigger = fn.trigger;
      fn.trigger = function(type) {
        if (/(click|change|keydown|blur|input)/.test(type)) {
          var processDefaults = [];
          this.each(function(index, node) {
            processDefaults.push(browserTrigger(node, type));
          });
          return processDefaults;
        }
        return parentTrigger.apply(this, arguments);
      };
    })(_jQuery.fn);
    _jQuery.fn.bindings = function(windowJquery, bindExp) {
      var result = [],
          match,
          bindSelector = '.ng-binding:visible';
      if (angular.isString(bindExp)) {
        bindExp = bindExp.replace(/\s/g, '');
        match = function(actualExp) {
          if (actualExp) {
            actualExp = actualExp.replace(/\s/g, '');
            if (actualExp == bindExp)
              return true;
            if (actualExp.indexOf(bindExp) == 0) {
              return actualExp.charAt(bindExp.length) == '|';
            }
          }
        };
      } else if (bindExp) {
        match = function(actualExp) {
          return actualExp && bindExp.exec(actualExp);
        };
      } else {
        match = function(actualExp) {
          return !!actualExp;
        };
      }
      var selection = this.find(bindSelector);
      if (this.is(bindSelector)) {
        selection = selection.add(this);
      }
      function push(value) {
        if (value == undefined) {
          value = '';
        } else if (typeof value != 'string') {
          value = angular.toJson(value);
        }
        result.push('' + value);
      }
      selection.each(function() {
        var element = windowJquery(this),
            binding;
        if (binding = element.data('$binding')) {
          if (typeof binding == 'string') {
            if (match(binding)) {
              push(element.scope().$eval(binding));
            }
          } else {
            if (!angular.isArray(binding)) {
              binding = [binding];
            }
            for (var fns,
                j = 0,
                jj = binding.length; j < jj; j++) {
              fns = binding[j];
              if (fns.parts) {
                fns = fns.parts;
              } else {
                fns = [fns];
              }
              for (var scope,
                  fn,
                  i = 0,
                  ii = fns.length; i < ii; i++) {
                if (match((fn = fns[i]).exp)) {
                  push(fn(scope = scope || element.scope()));
                }
              }
            }
          }
        }
      });
      return result;
    };
    angular.scenario.Application = function(context) {
      this.context = context;
      context.append('<h2>Current URL: <a href="about:blank">None</a></h2>' + '<div id="test-frames"></div>');
    };
    angular.scenario.Application.prototype.getFrame_ = function() {
      return this.context.find('#test-frames iframe:last');
    };
    angular.scenario.Application.prototype.getWindow_ = function() {
      var contentWindow = this.getFrame_().prop('contentWindow');
      if (!contentWindow)
        throw 'Frame window is not accessible.';
      return contentWindow;
    };
    angular.scenario.Application.prototype.navigateTo = function(url, loadFn, errorFn) {
      var self = this;
      var frame = this.getFrame_();
      errorFn = errorFn || function(e) {
        throw e;
      };
      if (url === 'about:blank') {
        errorFn('Sandbox Error: Navigating to about:blank is not allowed.');
      } else if (url.charAt(0) === '#') {
        url = frame.attr('src').split('#')[0] + url;
        frame.attr('src', url);
        this.executeAction(loadFn);
      } else {
        frame.remove();
        this.context.find('#test-frames').append('<iframe>');
        frame = this.getFrame_();
        frame.load(function() {
          frame.unbind();
          try {
            self.executeAction(loadFn);
          } catch (e) {
            errorFn(e);
          }
        }).attr('src', url);
      }
      this.context.find('> h2 a').attr('href', url).text(url);
    };
    angular.scenario.Application.prototype.executeAction = function(action) {
      var self = this;
      var $window = this.getWindow_();
      if (!$window.document) {
        throw 'Sandbox Error: Application document not accessible.';
      }
      if (!$window.angular) {
        return action.call(this, $window, _jQuery($window.document));
      }
      angularInit($window.document, function(element) {
        var $injector = $window.angular.element(element).injector();
        var $element = _jQuery(element);
        $element.injector = function() {
          return $injector;
        };
        $injector.invoke(function($browser) {
          $browser.notifyWhenNoOutstandingRequests(function() {
            action.call(self, $window, $element);
          });
        });
      });
    };
    angular.scenario.Describe = function(descName, parent) {
      this.only = parent && parent.only;
      this.beforeEachFns = [];
      this.afterEachFns = [];
      this.its = [];
      this.children = [];
      this.name = descName;
      this.parent = parent;
      this.id = angular.scenario.Describe.id++;
      var beforeEachFns = this.beforeEachFns;
      this.setupBefore = function() {
        if (parent)
          parent.setupBefore.call(this);
        angular.forEach(beforeEachFns, function(fn) {
          fn.call(this);
        }, this);
      };
      var afterEachFns = this.afterEachFns;
      this.setupAfter = function() {
        angular.forEach(afterEachFns, function(fn) {
          fn.call(this);
        }, this);
        if (parent)
          parent.setupAfter.call(this);
      };
    };
    angular.scenario.Describe.id = 0;
    angular.scenario.Describe.specId = 0;
    angular.scenario.Describe.prototype.beforeEach = function(body) {
      this.beforeEachFns.push(body);
    };
    angular.scenario.Describe.prototype.afterEach = function(body) {
      this.afterEachFns.push(body);
    };
    angular.scenario.Describe.prototype.describe = function(name, body) {
      var child = new angular.scenario.Describe(name, this);
      this.children.push(child);
      body.call(child);
    };
    angular.scenario.Describe.prototype.ddescribe = function(name, body) {
      var child = new angular.scenario.Describe(name, this);
      child.only = true;
      this.children.push(child);
      body.call(child);
    };
    angular.scenario.Describe.prototype.xdescribe = angular.noop;
    angular.scenario.Describe.prototype.it = function(name, body) {
      this.its.push({
        id: angular.scenario.Describe.specId++,
        definition: this,
        only: this.only,
        name: name,
        before: this.setupBefore,
        body: body,
        after: this.setupAfter
      });
    };
    angular.scenario.Describe.prototype.iit = function(name, body) {
      this.it.apply(this, arguments);
      this.its[this.its.length - 1].only = true;
    };
    angular.scenario.Describe.prototype.xit = angular.noop;
    angular.scenario.Describe.prototype.getSpecs = function() {
      var specs = arguments[0] || [];
      angular.forEach(this.children, function(child) {
        child.getSpecs(specs);
      });
      angular.forEach(this.its, function(it) {
        specs.push(it);
      });
      var only = [];
      angular.forEach(specs, function(it) {
        if (it.only) {
          only.push(it);
        }
      });
      return (only.length && only) || specs;
    };
    angular.scenario.Future = function(name, behavior, line) {
      this.name = name;
      this.behavior = behavior;
      this.fulfilled = false;
      this.value = undefined;
      this.parser = angular.identity;
      this.line = line || function() {
        return '';
      };
    };
    angular.scenario.Future.prototype.execute = function(doneFn) {
      var self = this;
      this.behavior(function(error, result) {
        self.fulfilled = true;
        if (result) {
          try {
            result = self.parser(result);
          } catch (e) {
            error = e;
          }
        }
        self.value = error || result;
        doneFn(error, result);
      });
    };
    angular.scenario.Future.prototype.parsedWith = function(fn) {
      this.parser = fn;
      return this;
    };
    angular.scenario.Future.prototype.fromJson = function() {
      return this.parsedWith(angular.fromJson);
    };
    angular.scenario.Future.prototype.toJson = function() {
      return this.parsedWith(angular.toJson);
    };
    angular.scenario.ObjectModel = function(runner) {
      var self = this;
      this.specMap = {};
      this.listeners = [];
      this.value = {
        name: '',
        children: {}
      };
      runner.on('SpecBegin', function(spec) {
        var block = self.value,
            definitions = [];
        angular.forEach(self.getDefinitionPath(spec), function(def) {
          if (!block.children[def.name]) {
            block.children[def.name] = {
              id: def.id,
              name: def.name,
              children: {},
              specs: {}
            };
          }
          block = block.children[def.name];
          definitions.push(def.name);
        });
        var it = self.specMap[spec.id] = block.specs[spec.name] = new angular.scenario.ObjectModel.Spec(spec.id, spec.name, definitions);
        self.emit('SpecBegin', it);
      });
      runner.on('SpecError', function(spec, error) {
        var it = self.getSpec(spec.id);
        it.status = 'error';
        it.error = error;
        self.emit('SpecError', it, error);
      });
      runner.on('SpecEnd', function(spec) {
        var it = self.getSpec(spec.id);
        complete(it);
        self.emit('SpecEnd', it);
      });
      runner.on('StepBegin', function(spec, step) {
        var it = self.getSpec(spec.id);
        var step = new angular.scenario.ObjectModel.Step(step.name);
        it.steps.push(step);
        self.emit('StepBegin', it, step);
      });
      runner.on('StepEnd', function(spec) {
        var it = self.getSpec(spec.id);
        var step = it.getLastStep();
        if (step.name !== step.name)
          throw 'Events fired in the wrong order. Step names don\'t match.';
        complete(step);
        self.emit('StepEnd', it, step);
      });
      runner.on('StepFailure', function(spec, step, error) {
        var it = self.getSpec(spec.id),
            modelStep = it.getLastStep();
        modelStep.setErrorStatus('failure', error, step.line());
        it.setStatusFromStep(modelStep);
        self.emit('StepFailure', it, modelStep, error);
      });
      runner.on('StepError', function(spec, step, error) {
        var it = self.getSpec(spec.id),
            modelStep = it.getLastStep();
        modelStep.setErrorStatus('error', error, step.line());
        it.setStatusFromStep(modelStep);
        self.emit('StepError', it, modelStep, error);
      });
      runner.on('RunnerBegin', function() {
        self.emit('RunnerBegin');
      });
      runner.on('RunnerEnd', function() {
        self.emit('RunnerEnd');
      });
      function complete(item) {
        item.endTime = new Date().getTime();
        item.duration = item.endTime - item.startTime;
        item.status = item.status || 'success';
      }
    };
    angular.scenario.ObjectModel.prototype.on = function(eventName, listener) {
      eventName = eventName.toLowerCase();
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(listener);
    };
    angular.scenario.ObjectModel.prototype.emit = function(eventName) {
      var self = this,
          args = Array.prototype.slice.call(arguments, 1),
          eventName = eventName.toLowerCase();
      if (this.listeners[eventName]) {
        angular.forEach(this.listeners[eventName], function(listener) {
          listener.apply(self, args);
        });
      }
    };
    angular.scenario.ObjectModel.prototype.getDefinitionPath = function(spec) {
      var path = [];
      var currentDefinition = spec.definition;
      while (currentDefinition && currentDefinition.name) {
        path.unshift(currentDefinition);
        currentDefinition = currentDefinition.parent;
      }
      return path;
    };
    angular.scenario.ObjectModel.prototype.getSpec = function(id) {
      return this.specMap[id];
    };
    angular.scenario.ObjectModel.Spec = function(id, name, definitionNames) {
      this.id = id;
      this.name = name;
      this.startTime = new Date().getTime();
      this.steps = [];
      this.fullDefinitionName = (definitionNames || []).join(' ');
    };
    angular.scenario.ObjectModel.Spec.prototype.addStep = function(name) {
      var step = new angular.scenario.ObjectModel.Step(name);
      this.steps.push(step);
      return step;
    };
    angular.scenario.ObjectModel.Spec.prototype.getLastStep = function() {
      return this.steps[this.steps.length - 1];
    };
    angular.scenario.ObjectModel.Spec.prototype.setStatusFromStep = function(step) {
      if (!this.status || step.status == 'error') {
        this.status = step.status;
        this.error = step.error;
        this.line = step.line;
      }
    };
    angular.scenario.ObjectModel.Step = function(name) {
      this.name = name;
      this.startTime = new Date().getTime();
    };
    angular.scenario.ObjectModel.Step.prototype.setErrorStatus = function(status, error, line) {
      this.status = status;
      this.error = error;
      this.line = line;
    };
    angular.scenario.Runner = function($window) {
      this.listeners = [];
      this.$window = $window;
      this.rootDescribe = new angular.scenario.Describe();
      this.currentDescribe = this.rootDescribe;
      this.api = {
        it: this.it,
        iit: this.iit,
        xit: angular.noop,
        describe: this.describe,
        ddescribe: this.ddescribe,
        xdescribe: angular.noop,
        beforeEach: this.beforeEach,
        afterEach: this.afterEach
      };
      angular.forEach(this.api, angular.bind(this, function(fn, key) {
        this.$window[key] = angular.bind(this, fn);
      }));
    };
    angular.scenario.Runner.prototype.emit = function(eventName) {
      var self = this;
      var args = Array.prototype.slice.call(arguments, 1);
      eventName = eventName.toLowerCase();
      if (!this.listeners[eventName])
        return;
      angular.forEach(this.listeners[eventName], function(listener) {
        listener.apply(self, args);
      });
    };
    angular.scenario.Runner.prototype.on = function(eventName, listener) {
      eventName = eventName.toLowerCase();
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(listener);
    };
    angular.scenario.Runner.prototype.describe = function(name, body) {
      var self = this;
      this.currentDescribe.describe(name, function() {
        var parentDescribe = self.currentDescribe;
        self.currentDescribe = this;
        try {
          body.call(this);
        } finally {
          self.currentDescribe = parentDescribe;
        }
      });
    };
    angular.scenario.Runner.prototype.ddescribe = function(name, body) {
      var self = this;
      this.currentDescribe.ddescribe(name, function() {
        var parentDescribe = self.currentDescribe;
        self.currentDescribe = this;
        try {
          body.call(this);
        } finally {
          self.currentDescribe = parentDescribe;
        }
      });
    };
    angular.scenario.Runner.prototype.it = function(name, body) {
      this.currentDescribe.it(name, body);
    };
    angular.scenario.Runner.prototype.iit = function(name, body) {
      this.currentDescribe.iit(name, body);
    };
    angular.scenario.Runner.prototype.beforeEach = function(body) {
      this.currentDescribe.beforeEach(body);
    };
    angular.scenario.Runner.prototype.afterEach = function(body) {
      this.currentDescribe.afterEach(body);
    };
    angular.scenario.Runner.prototype.createSpecRunner_ = function(scope) {
      var child = scope.$new();
      var Cls = angular.scenario.SpecRunner;
      for (var name in Cls.prototype)
        child[name] = angular.bind(child, Cls.prototype[name]);
      Cls.call(child);
      return child;
    };
    angular.scenario.Runner.prototype.run = function(application) {
      var self = this;
      var $root = angular.injector(['ng']).get('$rootScope');
      angular.extend($root, this);
      angular.forEach(angular.scenario.Runner.prototype, function(fn, name) {
        $root[name] = angular.bind(self, fn);
      });
      $root.application = application;
      $root.emit('RunnerBegin');
      asyncForEach(this.rootDescribe.getSpecs(), function(spec, specDone) {
        var dslCache = {};
        var runner = self.createSpecRunner_($root);
        angular.forEach(angular.scenario.dsl, function(fn, key) {
          dslCache[key] = fn.call($root);
        });
        angular.forEach(angular.scenario.dsl, function(fn, key) {
          self.$window[key] = function() {
            var line = callerFile(3);
            var scope = runner.$new();
            scope.dsl = {};
            angular.forEach(dslCache, function(fn, key) {
              scope.dsl[key] = function() {
                return dslCache[key].apply(scope, arguments);
              };
            });
            scope.addFuture = function() {
              Array.prototype.push.call(arguments, line);
              return angular.scenario.SpecRunner.prototype.addFuture.apply(scope, arguments);
            };
            scope.addFutureAction = function() {
              Array.prototype.push.call(arguments, line);
              return angular.scenario.SpecRunner.prototype.addFutureAction.apply(scope, arguments);
            };
            return scope.dsl[key].apply(scope, arguments);
          };
        });
        runner.run(spec, function() {
          runner.$destroy();
          specDone.apply(this, arguments);
        });
      }, function(error) {
        if (error) {
          self.emit('RunnerError', error);
        }
        self.emit('RunnerEnd');
      });
    };
    angular.scenario.SpecRunner = function() {
      this.futures = [];
      this.afterIndex = 0;
    };
    angular.scenario.SpecRunner.prototype.run = function(spec, specDone) {
      var self = this;
      this.spec = spec;
      this.emit('SpecBegin', spec);
      try {
        spec.before.call(this);
        spec.body.call(this);
        this.afterIndex = this.futures.length;
        spec.after.call(this);
      } catch (e) {
        this.emit('SpecError', spec, e);
        this.emit('SpecEnd', spec);
        specDone();
        return;
      }
      var handleError = function(error, done) {
        if (self.error) {
          return done();
        }
        self.error = true;
        done(null, self.afterIndex);
      };
      asyncForEach(this.futures, function(future, futureDone) {
        self.step = future;
        self.emit('StepBegin', spec, future);
        try {
          future.execute(function(error) {
            if (error) {
              self.emit('StepFailure', spec, future, error);
              self.emit('StepEnd', spec, future);
              return handleError(error, futureDone);
            }
            self.emit('StepEnd', spec, future);
            self.$window.setTimeout(function() {
              futureDone();
            }, 0);
          });
        } catch (e) {
          self.emit('StepError', spec, future, e);
          self.emit('StepEnd', spec, future);
          handleError(e, futureDone);
        }
      }, function(e) {
        if (e) {
          self.emit('SpecError', spec, e);
        }
        self.emit('SpecEnd', spec);
        self.$window.setTimeout(function() {
          specDone();
        }, 0);
      });
    };
    angular.scenario.SpecRunner.prototype.addFuture = function(name, behavior, line) {
      var future = new angular.scenario.Future(name, angular.bind(this, behavior), line);
      this.futures.push(future);
      return future;
    };
    angular.scenario.SpecRunner.prototype.addFutureAction = function(name, behavior, line) {
      var self = this;
      var NG = /\[ng\\\:/;
      return this.addFuture(name, function(done) {
        this.application.executeAction(function($window, $document) {
          $document.elements = function(selector) {
            var args = Array.prototype.slice.call(arguments, 1);
            selector = (self.selector || '') + ' ' + (selector || '');
            selector = _jQuery.trim(selector) || '*';
            angular.forEach(args, function(value, index) {
              selector = selector.replace('$' + (index + 1), value);
            });
            var result = $document.find(selector);
            if (selector.match(NG)) {
              angular.forEach(['[ng-', '[data-ng-', '[x-ng-'], function(value, index) {
                result = result.add(selector.replace(NG, value), $document);
              });
            }
            if (!result.length) {
              throw {
                type: 'selector',
                message: 'Selector ' + selector + ' did not match any elements.'
              };
            }
            return result;
          };
          try {
            behavior.call(self, $window, $document, done);
          } catch (e) {
            if (e.type && e.type === 'selector') {
              done(e.message);
            } else {
              throw e;
            }
          }
        });
      }, line);
    };
    angular.scenario.dsl('pause', function() {
      return function() {
        return this.addFuture('pausing for you to resume', function(done) {
          this.emit('InteractivePause', this.spec, this.step);
          this.$window.resume = function() {
            done();
          };
        });
      };
    });
    angular.scenario.dsl('sleep', function() {
      return function(time) {
        return this.addFuture('sleep for ' + time + ' seconds', function(done) {
          this.$window.setTimeout(function() {
            done(null, time * 1000);
          }, time * 1000);
        });
      };
    });
    angular.scenario.dsl('browser', function() {
      var chain = {};
      chain.navigateTo = function(url, delegate) {
        var application = this.application;
        return this.addFuture("browser navigate to '" + url + "'", function(done) {
          if (delegate) {
            url = delegate.call(this, url);
          }
          application.navigateTo(url, function() {
            done(null, url);
          }, done);
        });
      };
      chain.reload = function() {
        var application = this.application;
        return this.addFutureAction('browser reload', function($window, $document, done) {
          var href = $window.location.href;
          application.navigateTo(href, function() {
            done(null, href);
          }, done);
        });
      };
      chain.window = function() {
        var api = {};
        api.href = function() {
          return this.addFutureAction('window.location.href', function($window, $document, done) {
            done(null, $window.location.href);
          });
        };
        api.path = function() {
          return this.addFutureAction('window.location.path', function($window, $document, done) {
            done(null, $window.location.pathname);
          });
        };
        api.search = function() {
          return this.addFutureAction('window.location.search', function($window, $document, done) {
            done(null, $window.location.search);
          });
        };
        api.hash = function() {
          return this.addFutureAction('window.location.hash', function($window, $document, done) {
            done(null, $window.location.hash.replace('#', ''));
          });
        };
        return api;
      };
      chain.location = function() {
        var api = {};
        api.url = function() {
          return this.addFutureAction('$location.url()', function($window, $document, done) {
            done(null, $document.injector().get('$location').url());
          });
        };
        api.path = function() {
          return this.addFutureAction('$location.path()', function($window, $document, done) {
            done(null, $document.injector().get('$location').path());
          });
        };
        api.search = function() {
          return this.addFutureAction('$location.search()', function($window, $document, done) {
            done(null, $document.injector().get('$location').search());
          });
        };
        api.hash = function() {
          return this.addFutureAction('$location.hash()', function($window, $document, done) {
            done(null, $document.injector().get('$location').hash());
          });
        };
        return api;
      };
      return function() {
        return chain;
      };
    });
    angular.scenario.dsl('expect', function() {
      var chain = angular.extend({}, angular.scenario.matcher);
      chain.not = function() {
        this.inverse = true;
        return chain;
      };
      return function(future) {
        this.future = future;
        return chain;
      };
    });
    angular.scenario.dsl('using', function() {
      return function(selector, label) {
        this.selector = _jQuery.trim((this.selector || '') + ' ' + selector);
        if (angular.isString(label) && label.length) {
          this.label = label + ' ( ' + this.selector + ' )';
        } else {
          this.label = this.selector;
        }
        return this.dsl;
      };
    });
    angular.scenario.dsl('binding', function() {
      return function(name) {
        return this.addFutureAction("select binding '" + name + "'", function($window, $document, done) {
          var values = $document.elements().bindings($window.angular.element, name);
          if (!values.length) {
            return done("Binding selector '" + name + "' did not match.");
          }
          done(null, values[0]);
        });
      };
    });
    angular.scenario.dsl('input', function() {
      var chain = {};
      var supportInputEvent = 'oninput' in document.createElement('div') && msie != 9;
      chain.enter = function(value, event) {
        return this.addFutureAction("input '" + this.name + "' enter '" + value + "'", function($window, $document, done) {
          var input = $document.elements('[ng\\:model="$1"]', this.name).filter(':input');
          input.val(value);
          input.trigger(event || (supportInputEvent ? 'input' : 'change'));
          done();
        });
      };
      chain.check = function() {
        return this.addFutureAction("checkbox '" + this.name + "' toggle", function($window, $document, done) {
          var input = $document.elements('[ng\\:model="$1"]', this.name).filter(':checkbox');
          input.trigger('click');
          done();
        });
      };
      chain.select = function(value) {
        return this.addFutureAction("radio button '" + this.name + "' toggle '" + value + "'", function($window, $document, done) {
          var input = $document.elements('[ng\\:model="$1"][value="$2"]', this.name, value).filter(':radio');
          input.trigger('click');
          done();
        });
      };
      chain.val = function() {
        return this.addFutureAction("return input val", function($window, $document, done) {
          var input = $document.elements('[ng\\:model="$1"]', this.name).filter(':input');
          done(null, input.val());
        });
      };
      return function(name) {
        this.name = name;
        return chain;
      };
    });
    angular.scenario.dsl('repeater', function() {
      var chain = {};
      chain.count = function() {
        return this.addFutureAction("repeater '" + this.label + "' count", function($window, $document, done) {
          try {
            done(null, $document.elements().length);
          } catch (e) {
            done(null, 0);
          }
        });
      };
      chain.column = function(binding) {
        return this.addFutureAction("repeater '" + this.label + "' column '" + binding + "'", function($window, $document, done) {
          done(null, $document.elements().bindings($window.angular.element, binding));
        });
      };
      chain.row = function(index) {
        return this.addFutureAction("repeater '" + this.label + "' row '" + index + "'", function($window, $document, done) {
          var matches = $document.elements().slice(index, index + 1);
          if (!matches.length)
            return done('row ' + index + ' out of bounds');
          done(null, matches.bindings($window.angular.element));
        });
      };
      return function(selector, label) {
        this.dsl.using(selector, label);
        return chain;
      };
    });
    angular.scenario.dsl('select', function() {
      var chain = {};
      chain.option = function(value) {
        return this.addFutureAction("select '" + this.name + "' option '" + value + "'", function($window, $document, done) {
          var select = $document.elements('select[ng\\:model="$1"]', this.name);
          var option = select.find('option[value="' + value + '"]');
          if (option.length) {
            select.val(value);
          } else {
            option = select.find('option:contains("' + value + '")');
            if (option.length) {
              select.val(option.val());
            }
          }
          select.trigger('change');
          done();
        });
      };
      chain.options = function() {
        var values = arguments;
        return this.addFutureAction("select '" + this.name + "' options '" + values + "'", function($window, $document, done) {
          var select = $document.elements('select[multiple][ng\\:model="$1"]', this.name);
          select.val(values);
          select.trigger('change');
          done();
        });
      };
      return function(name) {
        this.name = name;
        return chain;
      };
    });
    angular.scenario.dsl('element', function() {
      var KEY_VALUE_METHODS = ['attr', 'css', 'prop'];
      var VALUE_METHODS = ['val', 'text', 'html', 'height', 'innerHeight', 'outerHeight', 'width', 'innerWidth', 'outerWidth', 'position', 'scrollLeft', 'scrollTop', 'offset'];
      var chain = {};
      chain.count = function() {
        return this.addFutureAction("element '" + this.label + "' count", function($window, $document, done) {
          try {
            done(null, $document.elements().length);
          } catch (e) {
            done(null, 0);
          }
        });
      };
      chain.click = function() {
        return this.addFutureAction("element '" + this.label + "' click", function($window, $document, done) {
          var elements = $document.elements();
          var href = elements.attr('href');
          var eventProcessDefault = elements.trigger('click')[0];
          if (href && elements[0].nodeName.toUpperCase() === 'A' && eventProcessDefault) {
            this.application.navigateTo(href, function() {
              done();
            }, done);
          } else {
            done();
          }
        });
      };
      chain.query = function(fn) {
        return this.addFutureAction('element ' + this.label + ' custom query', function($window, $document, done) {
          fn.call(this, $document.elements(), done);
        });
      };
      angular.forEach(KEY_VALUE_METHODS, function(methodName) {
        chain[methodName] = function(name, value) {
          var args = arguments,
              futureName = (args.length == 1) ? "element '" + this.label + "' get " + methodName + " '" + name + "'" : "element '" + this.label + "' set " + methodName + " '" + name + "' to " + "'" + value + "'";
          return this.addFutureAction(futureName, function($window, $document, done) {
            var element = $document.elements();
            done(null, element[methodName].apply(element, args));
          });
        };
      });
      angular.forEach(VALUE_METHODS, function(methodName) {
        chain[methodName] = function(value) {
          var args = arguments,
              futureName = (args.length == 0) ? "element '" + this.label + "' " + methodName : futureName = "element '" + this.label + "' set " + methodName + " to '" + value + "'";
          return this.addFutureAction(futureName, function($window, $document, done) {
            var element = $document.elements();
            done(null, element[methodName].apply(element, args));
          });
        };
      });
      return function(selector, label) {
        this.dsl.using(selector, label);
        return chain;
      };
    });
    angular.scenario.matcher('toEqual', function(expected) {
      return angular.equals(this.actual, expected);
    });
    angular.scenario.matcher('toBe', function(expected) {
      return this.actual === expected;
    });
    angular.scenario.matcher('toBeDefined', function() {
      return angular.isDefined(this.actual);
    });
    angular.scenario.matcher('toBeTruthy', function() {
      return this.actual;
    });
    angular.scenario.matcher('toBeFalsy', function() {
      return !this.actual;
    });
    angular.scenario.matcher('toMatch', function(expected) {
      return new RegExp(expected).test(this.actual);
    });
    angular.scenario.matcher('toBeNull', function() {
      return this.actual === null;
    });
    angular.scenario.matcher('toContain', function(expected) {
      return includes(this.actual, expected);
    });
    angular.scenario.matcher('toBeLessThan', function(expected) {
      return this.actual < expected;
    });
    angular.scenario.matcher('toBeGreaterThan', function(expected) {
      return this.actual > expected;
    });
    angular.scenario.output('html', function(context, runner, model) {
      var specUiMap = {},
          lastStepUiMap = {};
      context.append('<div id="header">' + '  <h1><span class="angular">AngularJS</span>: Scenario Test Runner</h1>' + '  <ul id="status-legend" class="status-display">' + '    <li class="status-error">0 Errors</li>' + '    <li class="status-failure">0 Failures</li>' + '    <li class="status-success">0 Passed</li>' + '  </ul>' + '</div>' + '<div id="specs">' + '  <div class="test-children"></div>' + '</div>');
      runner.on('InteractivePause', function(spec) {
        var ui = lastStepUiMap[spec.id];
        ui.find('.test-title').html('paused... <a href="javascript:resume()">resume</a> when ready.');
      });
      runner.on('SpecBegin', function(spec) {
        var ui = findContext(spec);
        ui.find('> .tests').append('<li class="status-pending test-it"></li>');
        ui = ui.find('> .tests li:last');
        ui.append('<div class="test-info">' + '  <p class="test-title">' + '    <span class="timer-result"></span>' + '    <span class="test-name"></span>' + '  </p>' + '</div>' + '<div class="scrollpane">' + '  <ol class="test-actions"></ol>' + '</div>');
        ui.find('> .test-info .test-name').text(spec.name);
        ui.find('> .test-info').click(function() {
          var scrollpane = ui.find('> .scrollpane');
          var actions = scrollpane.find('> .test-actions');
          var name = context.find('> .test-info .test-name');
          if (actions.find(':visible').length) {
            actions.hide();
            name.removeClass('open').addClass('closed');
          } else {
            actions.show();
            scrollpane.attr('scrollTop', scrollpane.attr('scrollHeight'));
            name.removeClass('closed').addClass('open');
          }
        });
        specUiMap[spec.id] = ui;
      });
      runner.on('SpecError', function(spec, error) {
        var ui = specUiMap[spec.id];
        ui.append('<pre></pre>');
        ui.find('> pre').text(formatException(error));
      });
      runner.on('SpecEnd', function(spec) {
        var ui = specUiMap[spec.id];
        spec = model.getSpec(spec.id);
        ui.removeClass('status-pending');
        ui.addClass('status-' + spec.status);
        ui.find("> .test-info .timer-result").text(spec.duration + "ms");
        if (spec.status === 'success') {
          ui.find('> .test-info .test-name').addClass('closed');
          ui.find('> .scrollpane .test-actions').hide();
        }
        updateTotals(spec.status);
      });
      runner.on('StepBegin', function(spec, step) {
        var ui = specUiMap[spec.id];
        spec = model.getSpec(spec.id);
        step = spec.getLastStep();
        ui.find('> .scrollpane .test-actions').append('<li class="status-pending"></li>');
        var stepUi = lastStepUiMap[spec.id] = ui.find('> .scrollpane .test-actions li:last');
        stepUi.append('<div class="timer-result"></div>' + '<div class="test-title"></div>');
        stepUi.find('> .test-title').text(step.name);
        var scrollpane = stepUi.parents('.scrollpane');
        scrollpane.attr('scrollTop', scrollpane.attr('scrollHeight'));
      });
      runner.on('StepFailure', function(spec, step, error) {
        var ui = lastStepUiMap[spec.id];
        addError(ui, step.line, error);
      });
      runner.on('StepError', function(spec, step, error) {
        var ui = lastStepUiMap[spec.id];
        addError(ui, step.line, error);
      });
      runner.on('StepEnd', function(spec, step) {
        var stepUi = lastStepUiMap[spec.id];
        spec = model.getSpec(spec.id);
        step = spec.getLastStep();
        stepUi.find('.timer-result').text(step.duration + 'ms');
        stepUi.removeClass('status-pending');
        stepUi.addClass('status-' + step.status);
        var scrollpane = specUiMap[spec.id].find('> .scrollpane');
        scrollpane.attr('scrollTop', scrollpane.attr('scrollHeight'));
      });
      function findContext(spec) {
        var currentContext = context.find('#specs');
        angular.forEach(model.getDefinitionPath(spec), function(defn) {
          var id = 'describe-' + defn.id;
          if (!context.find('#' + id).length) {
            currentContext.find('> .test-children').append('<div class="test-describe" id="' + id + '">' + '  <h2></h2>' + '  <div class="test-children"></div>' + '  <ul class="tests"></ul>' + '</div>');
            context.find('#' + id).find('> h2').text('describe: ' + defn.name);
          }
          currentContext = context.find('#' + id);
        });
        return context.find('#describe-' + spec.definition.id);
      }
      function updateTotals(status) {
        var legend = context.find('#status-legend .status-' + status);
        var parts = legend.text().split(' ');
        var value = (parts[0] * 1) + 1;
        legend.text(value + ' ' + parts[1]);
      }
      function addError(context, line, error) {
        context.find('.test-title').append('<pre></pre>');
        var message = _jQuery.trim(line() + '\n\n' + formatException(error));
        context.find('.test-title pre:last').text(message);
      }
    });
    angular.scenario.output('json', function(context, runner, model) {
      model.on('RunnerEnd', function() {
        context.text(angular.toJson(model.value));
      });
    });
    angular.scenario.output('xml', function(context, runner, model) {
      var $ = function(args) {
        return new context.init(args);
      };
      model.on('RunnerEnd', function() {
        var scenario = $('<scenario></scenario>');
        context.append(scenario);
        serializeXml(scenario, model.value);
      });
      function serializeXml(context, tree) {
        angular.forEach(tree.children, function(child) {
          var describeContext = $('<describe></describe>');
          describeContext.attr('id', child.id);
          describeContext.attr('name', child.name);
          context.append(describeContext);
          serializeXml(describeContext, child);
        });
        var its = $('<its></its>');
        context.append(its);
        angular.forEach(tree.specs, function(spec) {
          var it = $('<it></it>');
          it.attr('id', spec.id);
          it.attr('name', spec.name);
          it.attr('duration', spec.duration);
          it.attr('status', spec.status);
          its.append(it);
          angular.forEach(spec.steps, function(step) {
            var stepContext = $('<step></step>');
            stepContext.attr('name', step.name);
            stepContext.attr('duration', step.duration);
            stepContext.attr('status', step.status);
            it.append(stepContext);
            if (step.error) {
              var error = $('<error></error>');
              stepContext.append(error);
              error.text(formatException(step.error));
            }
          });
        });
      }
    });
    angular.scenario.output('object', function(context, runner, model) {
      runner.$window.$result = model.value;
    });
    bindJQuery();
    publishExternalAPI(angular);
    var $runner = new angular.scenario.Runner(window),
        scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1],
        config = {};
    angular.forEach(script.attributes, function(attr) {
      var match = attr.name.match(/ng[:\-](.*)/);
      if (match) {
        config[match[1]] = attr.value || true;
      }
    });
    if (config.autotest) {
      JQLite(document).ready(function() {
        angular.scenario.setUpAndRun(config);
      });
    }
  })(window, document);
  angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";\n\n[ng\\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak],\n.ng-cloak, .x-ng-cloak {\n  display: none !important;\n}\n\nng\\:form {\n  display: block;\n}\n</style>');
  angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";\n/* CSS Document */\n\n/** Structure */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  font-size: 14px;\n}\n\n#system-error {\n  font-size: 1.5em;\n  text-align: center;\n}\n\n#json, #xml {\n  display: none;\n}\n\n#header {\n  position: fixed;\n  width: 100%;\n}\n\n#specs {\n  padding-top: 50px;\n}\n\n#header .angular {\n  font-family: Courier New, monospace;\n  font-weight: bold;\n}\n\n#header h1 {\n  font-weight: normal;\n  float: left;\n  font-size: 30px;\n  line-height: 30px;\n  margin: 0;\n  padding: 10px 10px;\n  height: 30px;\n}\n\n#application h2,\n#specs h2 {\n  margin: 0;\n  padding: 0.5em;\n  font-size: 1.1em;\n}\n\n#status-legend {\n  margin-top: 10px;\n  margin-right: 10px;\n}\n\n#header,\n#application,\n.test-info,\n.test-actions li {\n  overflow: hidden;\n}\n\n#application {\n  margin: 10px;\n}\n\n#application iframe {\n  width: 100%;\n  height: 758px;\n}\n\n#application .popout {\n  float: right;\n}\n\n#application iframe {\n  border: none;\n}\n\n.tests li,\n.test-actions li,\n.test-it li,\n.test-it ol,\n.status-display {\n  list-style-type: none;\n}\n\n.tests,\n.test-it ol,\n.status-display {\n  margin: 0;\n  padding: 0;\n}\n\n.test-info {\n  margin-left: 1em;\n  margin-top: 0.5em;\n  border-radius: 8px 0 0 8px;\n  -webkit-border-radius: 8px 0 0 8px;\n  -moz-border-radius: 8px 0 0 8px;\n  cursor: pointer;\n}\n\n.test-info:hover .test-name {\n  text-decoration: underline;\n}\n\n.test-info .closed:before {\n  content: \'\\25b8\\00A0\';\n}\n\n.test-info .open:before {\n  content: \'\\25be\\00A0\';\n  font-weight: bold;\n}\n\n.test-it ol {\n  margin-left: 2.5em;\n}\n\n.status-display,\n.status-display li {\n  float: right;\n}\n\n.status-display li {\n  padding: 5px 10px;\n}\n\n.timer-result,\n.test-title {\n  display: inline-block;\n  margin: 0;\n  padding: 4px;\n}\n\n.test-actions .test-title,\n.test-actions .test-result {\n  display: table-cell;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n}\n\n.test-actions {\n  display: table;\n}\n\n.test-actions li {\n  display: table-row;\n}\n\n.timer-result {\n  width: 4em;\n  padding: 0 10px;\n  text-align: right;\n  font-family: monospace;\n}\n\n.test-it pre,\n.test-actions pre {\n  clear: left;\n  color: black;\n  margin-left: 6em;\n}\n\n.test-describe {\n  padding-bottom: 0.5em;\n}\n\n.test-describe .test-describe {\n  margin: 5px 5px 10px 2em;\n}\n\n.test-actions .status-pending .test-title:before {\n  content: \'\\00bb\\00A0\';\n}\n\n.scrollpane {\n   max-height: 20em;\n   overflow: auto;\n}\n\n/** Colors */\n\n#header {\n  background-color: #F2C200;\n}\n\n#specs h2 {\n  border-top: 2px solid #BABAD1;\n}\n\n#specs h2,\n#application h2 {\n  background-color: #efefef;\n}\n\n#application {\n  border: 1px solid #BABAD1;\n}\n\n.test-describe .test-describe {\n  border-left: 1px solid #BABAD1;\n  border-right: 1px solid #BABAD1;\n  border-bottom: 1px solid #BABAD1;\n}\n\n.status-display {\n  border: 1px solid #777;\n}\n\n.status-display .status-pending,\n.status-pending .test-info {\n  background-color: #F9EEBC;\n}\n\n.status-display .status-success,\n.status-success .test-info {\n  background-color: #B1D7A1;\n}\n\n.status-display .status-failure,\n.status-failure .test-info {\n  background-color: #FF8286;\n}\n\n.status-display .status-error,\n.status-error .test-info {\n  background-color: black;\n  color: white;\n}\n\n.test-actions .status-success .test-title {\n  color: #30B30A;\n}\n\n.test-actions .status-failure .test-title {\n  color: #DF0000;\n}\n\n.test-actions .status-error .test-title {\n  color: black;\n}\n\n.test-actions .timer-result {\n  color: #888;\n}\n</style>');
})(require('process'));
