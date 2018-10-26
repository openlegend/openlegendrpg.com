/* */ 
(function(Buffer, process) {
  var SourceMapConsumer = require('source-map').SourceMapConsumer;
  var path = require('path');
  var fs = require('fs');
  var alreadyInstalled = false;
  var emptyCacheBetweenOperations = false;
  var fileContentsCache = {};
  var sourceMapCache = {};
  function isInBrowser() {
    return ((typeof window !== 'undefined') && (typeof XMLHttpRequest === 'function'));
  }
  function retrieveFile(path) {
    if (path in fileContentsCache) {
      return fileContentsCache[path];
    }
    try {
      if (isInBrowser()) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, false);
        xhr.send(null);
        var contents = xhr.readyState === 4 ? xhr.responseText : null;
      } else {
        var contents = fs.readFileSync(path, 'utf8');
      }
    } catch (e) {
      var contents = null;
    }
    return fileContentsCache[path] = contents;
  }
  function supportRelativeURL(file, url) {
    if (!file)
      return url;
    var dir = path.dirname(file);
    var match = /^\w+:\/\/[^\/]*/.exec(dir);
    var protocol = match ? match[0] : '';
    return protocol + path.resolve(dir.slice(protocol.length), url);
  }
  function retrieveSourceMapURL(source) {
    var fileData;
    if (isInBrowser()) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', source, false);
      xhr.send(null);
      fileData = xhr.readyState === 4 ? xhr.responseText : null;
      var sourceMapHeader = xhr.getResponseHeader("SourceMap") || xhr.getResponseHeader("X-SourceMap");
      if (sourceMapHeader) {
        return sourceMapHeader;
      }
    }
    fileData = retrieveFile(source);
    var match = /\/\/[#@]\s*sourceMappingURL=(.*)\s*$/m.exec(fileData);
    if (!match)
      return null;
    return match[1];
  }
  ;
  function retrieveSourceMap(source) {
    var sourceMappingURL = retrieveSourceMapURL(source);
    if (!sourceMappingURL)
      return null;
    var sourceMapData;
    var dataUrlPrefix = "data:application/json;base64,";
    if (sourceMappingURL.slice(0, dataUrlPrefix.length).toLowerCase() == dataUrlPrefix) {
      sourceMapData = new Buffer(sourceMappingURL.slice(dataUrlPrefix.length), "base64").toString();
      sourceMappingURL = null;
    } else {
      sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
      sourceMapData = retrieveFile(sourceMappingURL, 'utf8');
    }
    if (!sourceMapData) {
      return null;
    }
    return {
      url: sourceMappingURL,
      map: sourceMapData
    };
  }
  function mapSourcePosition(position) {
    var sourceMap = sourceMapCache[position.source];
    if (!sourceMap) {
      var urlAndMap = retrieveSourceMap(position.source);
      if (urlAndMap) {
        sourceMap = sourceMapCache[position.source] = {
          url: urlAndMap.url,
          map: new SourceMapConsumer(urlAndMap.map)
        };
        if (sourceMap.map.sourcesContent) {
          sourceMap.map.sources.forEach(function(source, i) {
            var contents = sourceMap.map.sourcesContent[i];
            if (contents) {
              var url = supportRelativeURL(sourceMap.url, source);
              fileContentsCache[url] = contents;
            }
          });
        }
      } else {
        sourceMap = sourceMapCache[position.source] = {
          url: null,
          map: null
        };
      }
    }
    if (sourceMap && sourceMap.map) {
      var originalPosition = sourceMap.map.originalPositionFor(position);
      if (originalPosition.source !== null) {
        originalPosition.source = supportRelativeURL(sourceMap.url, originalPosition.source);
        return originalPosition;
      }
    }
    return position;
  }
  function mapEvalOrigin(origin) {
    var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
    if (match) {
      var position = mapSourcePosition({
        source: match[2],
        line: match[3],
        column: match[4] - 1
      });
      return 'eval at ' + match[1] + ' (' + position.source + ':' + position.line + ':' + (position.column + 1) + ')';
    }
    match = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
    if (match) {
      return 'eval at ' + match[1] + ' (' + mapEvalOrigin(match[2]) + ')';
    }
    return origin;
  }
  function CallSiteToString() {
    var fileName;
    var fileLocation = "";
    if (this.isNative()) {
      fileLocation = "native";
    } else {
      fileName = this.getScriptNameOrSourceURL();
      if (!fileName && this.isEval()) {
        fileLocation = this.getEvalOrigin();
        fileLocation += ", ";
      }
      if (fileName) {
        fileLocation += fileName;
      } else {
        fileLocation += "<anonymous>";
      }
      var lineNumber = this.getLineNumber();
      if (lineNumber != null) {
        fileLocation += ":" + lineNumber;
        var columnNumber = this.getColumnNumber();
        if (columnNumber) {
          fileLocation += ":" + columnNumber;
        }
      }
    }
    var line = "";
    var functionName = this.getFunctionName();
    var addSuffix = true;
    var isConstructor = this.isConstructor();
    var isMethodCall = !(this.isToplevel() || isConstructor);
    if (isMethodCall) {
      var typeName = this.getTypeName();
      var methodName = this.getMethodName();
      if (functionName) {
        if (typeName && functionName.indexOf(typeName) != 0) {
          line += typeName + ".";
        }
        line += functionName;
        if (methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1) {
          line += " [as " + methodName + "]";
        }
      } else {
        line += typeName + "." + (methodName || "<anonymous>");
      }
    } else if (isConstructor) {
      line += "new " + (functionName || "<anonymous>");
    } else if (functionName) {
      line += functionName;
    } else {
      line += fileLocation;
      addSuffix = false;
    }
    if (addSuffix) {
      line += " (" + fileLocation + ")";
    }
    return line;
  }
  function cloneCallSite(frame) {
    var object = {};
    Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach(function(name) {
      object[name] = /^(?:is|get)/.test(name) ? function() {
        return frame[name].call(frame);
      } : frame[name];
    });
    object.toString = CallSiteToString;
    return object;
  }
  function wrapCallSite(frame) {
    var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
    if (source) {
      var position = mapSourcePosition({
        source: source,
        line: frame.getLineNumber(),
        column: frame.getColumnNumber() - 1
      });
      frame = cloneCallSite(frame);
      frame.getFileName = function() {
        return position.source;
      };
      frame.getLineNumber = function() {
        return position.line;
      };
      frame.getColumnNumber = function() {
        return position.column + 1;
      };
      frame.getScriptNameOrSourceURL = function() {
        return position.source;
      };
      return frame;
    }
    var origin = frame.isEval() && frame.getEvalOrigin();
    if (origin) {
      origin = mapEvalOrigin(origin);
      frame = cloneCallSite(frame);
      frame.getEvalOrigin = function() {
        return origin;
      };
      return frame;
    }
    return frame;
  }
  function prepareStackTrace(error, stack) {
    if (emptyCacheBetweenOperations) {
      fileContentsCache = {};
      sourceMapCache = {};
    }
    return error + stack.map(function(frame) {
      return '\n    at ' + wrapCallSite(frame);
    }).join('');
  }
  function getErrorSource(error) {
    var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
    if (match) {
      var source = match[1];
      var line = +match[2];
      var column = +match[3];
      var contents = fileContentsCache[source];
      if (!contents && fs.existsSync(source)) {
        contents = fs.readFileSync(source, 'utf8');
      }
      if (contents) {
        var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
        if (code) {
          return '\n' + source + ':' + line + '\n' + code + '\n' + new Array(column).join(' ') + '^';
        }
      }
    }
    return null;
  }
  function handleUncaughtExceptions(error) {
    if (!error || !error.stack) {
      console.log('Uncaught exception:', error);
    } else {
      var source = getErrorSource(error);
      if (source !== null)
        console.log(source);
      console.log(error.stack);
    }
    process.exit(1);
  }
  exports.wrapCallSite = wrapCallSite;
  exports.getErrorSource = getErrorSource;
  exports.mapSourcePosition = mapSourcePosition;
  exports.retrieveSourceMap = retrieveSourceMap;
  exports.install = function(options) {
    if (!alreadyInstalled) {
      alreadyInstalled = true;
      Error.prepareStackTrace = prepareStackTrace;
      options = options || {};
      var installHandler = 'handleUncaughtExceptions' in options ? options.handleUncaughtExceptions : true;
      emptyCacheBetweenOperations = 'emptyCacheBetweenOperations' in options ? options.emptyCacheBetweenOperations : false;
      if (options.retrieveFile)
        retrieveFile = options.retrieveFile;
      if (options.retrieveSourceMap)
        retrieveSourceMap = options.retrieveSourceMap;
      if (installHandler && !isInBrowser()) {
        process.on('uncaughtException', handleUncaughtExceptions);
      }
    }
  };
})(require('buffer').Buffer, require('process'));
