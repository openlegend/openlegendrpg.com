/* */ 
(function(process) {
  'use strict';
  var EventEmitter = require("events").EventEmitter;
  var sysPath = require("path");
  var each = require("async-each");
  var NodeFsHandler = require("./nodefs-handler");
  var FsEventsHandler = require("./fsevents-handler");
  exports.isBinaryPath = require("./is-binary");
  var platform = require("os").platform();
  function FSWatcher(_opts) {
    var opts = {};
    if (_opts)
      for (var opt in _opts)
        opts[opt] = _opts[opt];
    this._watched = Object.create(null);
    this._watchers = [];
    this._ignoredPaths = Object.create(null);
    this.closed = false;
    this._throttled = Object.create(null);
    this._symlinkPaths = Object.create(null);
    function undef(key) {
      return opts[key] === undefined;
    }
    if (undef('persistent'))
      opts.persistent = true;
    if (undef('ignoreInitial'))
      opts.ignoreInitial = false;
    if (undef('ignorePermissionErrors'))
      opts.ignorePermissionErrors = false;
    if (undef('interval'))
      opts.interval = 100;
    if (undef('binaryInterval'))
      opts.binaryInterval = 300;
    this.enableBinaryInterval = opts.binaryInterval !== opts.interval;
    if (undef('useFsEvents'))
      opts.useFsEvents = !opts.usePolling;
    if (!FsEventsHandler.canUse())
      opts.useFsEvents = false;
    if (undef('usePolling') && !opts.useFsEvents) {
      opts.usePolling = platform === 'darwin';
    }
    if (undef('atomic'))
      opts.atomic = !opts.usePolling && !opts.useFsEvents;
    if (opts.atomic)
      this._pendingUnlinks = Object.create(null);
    if (undef('followSymlinks'))
      opts.followSymlinks = true;
    this._isntIgnored = function(entry) {
      return !this._isIgnored(entry.path, entry.stat);
    }.bind(this);
    var readyCalls = 0;
    this._emitReady = function() {
      if (++readyCalls >= this._readyCount) {
        this._emitReady = Function.prototype;
        process.nextTick(this.emit.bind(this, 'ready'));
      }
    }.bind(this);
    this.options = opts;
    Object.freeze(opts);
  }
  FSWatcher.prototype = Object.create(EventEmitter.prototype);
  FSWatcher.prototype._emit = function(event, target, val1, val2, val3) {
    var args = [event, target, val1, val2, val3];
    if (this.options.atomic) {
      if (event === 'unlink') {
        this._pendingUnlinks[target] = args;
        setTimeout(function() {
          Object.keys(this._pendingUnlinks).forEach(function(path) {
            this.emit.apply(this, this._pendingUnlinks[path]);
            this.emit.apply(this, ['all'].concat(this._pendingUnlinks[path]));
            delete this._pendingUnlinks[path];
          }.bind(this));
        }.bind(this), 100);
        return this;
      } else if (event === 'add' && this._pendingUnlinks[target]) {
        event = args[0] = 'change';
        delete this._pendingUnlinks[target];
      }
      if (event === 'change') {
        if (!this._throttle('change', target, 50))
          return this;
      }
    }
    this.emit.apply(this, args);
    if (event !== 'error')
      this.emit.apply(this, ['all'].concat(args));
    return this;
  };
  FSWatcher.prototype._handleError = function(error) {
    if (error && error.code !== 'ENOENT' && error.code !== 'ENOTDIR' && !(error.code === 'EPERM' && !this.options.ignorePermissionErrors))
      this.emit('error', error);
    return error || this.closed;
  };
  FSWatcher.prototype._throttle = function(action, path, timeout) {
    if (!(action in this._throttled)) {
      this._throttled[action] = Object.create(null);
    }
    var throttled = this._throttled[action];
    if (path in throttled)
      return false;
    function clear() {
      delete throttled[path];
      clearTimeout(timeoutObject);
    }
    var timeoutObject = setTimeout(clear, timeout);
    throttled[path] = {
      timeoutObject: timeoutObject,
      clear: clear
    };
    return throttled[path];
  };
  FSWatcher.prototype._isIgnored = function(path, stats) {
    if (this.options.atomic && /^\..*\.(sw[px])$|\~$|\.subl.*\.tmp/.test(path))
      return true;
    var userIgnored = (function(ignored) {
      switch (toString.call(ignored)) {
        case '[object RegExp]':
          return function(string) {
            return ignored.test(string);
          };
        case '[object Function]':
          return ignored;
        default:
          return function() {
            return false;
          };
      }
    })(this.options.ignored);
    var ignoredPaths = Object.keys(this._ignoredPaths);
    function isParent(ip) {
      return !path.indexOf(ip + sysPath.sep);
    }
    return ignoredPaths.length && ignoredPaths.some(isParent) || userIgnored(path, stats);
  };
  FSWatcher.prototype._getWatchedDir = function(directory) {
    var dir = sysPath.resolve(directory);
    if (!(dir in this._watched))
      this._watched[dir] = {
        _items: Object.create(null),
        add: function(item) {
          this._items[item] = true;
        },
        remove: function(item) {
          delete this._items[item];
        },
        has: function(item) {
          return item in this._items;
        },
        children: function() {
          return Object.keys(this._items);
        }
      };
    return this._watched[dir];
  };
  FSWatcher.prototype._hasReadPermissions = function(stats) {
    return Boolean(4 & parseInt((stats.mode & 0x1ff).toString(8)[0], 10));
  };
  FSWatcher.prototype._remove = function(directory, item) {
    var fullPath = sysPath.join(directory, item);
    var absolutePath = sysPath.resolve(fullPath);
    var isDirectory = this._watched[fullPath] || this._watched[absolutePath];
    if (!this._throttle('remove', fullPath, 100))
      return ;
    var watchedDirs = Object.keys(this._watched);
    if (!isDirectory && !this.options.useFsEvents && watchedDirs.length === 1) {
      this.add(directory, item);
    }
    var nestedDirectoryChildren = this._getWatchedDir(fullPath).children();
    nestedDirectoryChildren.forEach(function(nestedItem) {
      this._remove(fullPath, nestedItem);
    }, this);
    this._getWatchedDir(directory).remove(item);
    delete this._watched[fullPath];
    delete this._watched[absolutePath];
    var eventName = isDirectory ? 'unlinkDir' : 'unlink';
    this._emit(eventName, fullPath);
  };
  FSWatcher.prototype.add = function(files, _origAdd) {
    this.closed = false;
    if (!('_initialAdd' in this))
      this._initialAdd = true;
    if (!Array.isArray(files))
      files = [files];
    if (this.options.useFsEvents && FsEventsHandler.canUse()) {
      if (!this._readyCount)
        this._readyCount = files.length;
      if (this.options.persistent)
        this._readyCount *= 2;
      files.forEach(this._addToFsEvents, this);
    } else {
      if (!this._readyCount)
        this._readyCount = 0;
      this._readyCount += files.length;
      each(files, function(file, next) {
        this._addToNodeFs(file, this._initialAdd, _origAdd, function(err, res) {
          if (res)
            this._emitReady();
          next(err, res);
        }.bind(this));
      }.bind(this), function(error, results) {
        results.forEach(function(item) {
          if (!item)
            return ;
          this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
        }, this);
      }.bind(this));
    }
    this._initialAdd = false;
    return this;
  };
  FSWatcher.prototype.close = function() {
    if (this.closed)
      return this;
    this.closed = true;
    this._watchers.forEach(function(watcher) {
      watcher.close();
    });
    this._watched = Object.create(null);
    this.removeAllListeners();
    return this;
  };
  function importProto(proto) {
    Object.keys(proto).forEach(function(method) {
      FSWatcher.prototype[method] = proto[method];
    });
  }
  importProto(NodeFsHandler.prototype);
  if (FsEventsHandler.canUse())
    importProto(FsEventsHandler.prototype);
  exports.FSWatcher = FSWatcher;
  exports.watch = function(files, options) {
    return new FSWatcher(options).add(files);
  };
})(require("process"));
