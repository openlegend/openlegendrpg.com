/* */ 
(function(process) {
  (function() {
    'use strict';
    function minErr(module) {
      return function() {
        var code = arguments[0],
            prefix = '[' + (module ? module + ':' : '') + code + '] ',
            template = arguments[1],
            templateArgs = arguments,
            stringify = function(obj) {
              if (typeof obj === 'function') {
                return obj.toString().replace(/ \{[\s\S]*$/, '');
              } else if (typeof obj === 'undefined') {
                return 'undefined';
              } else if (typeof obj !== 'string') {
                return JSON.stringify(obj);
              }
              return obj;
            },
            message,
            i;
        message = prefix + template.replace(/\{\d+\}/g, function(match) {
          var index = +match.slice(1, -1),
              arg;
          if (index + 2 < templateArgs.length) {
            arg = templateArgs[index + 2];
            if (typeof arg === 'function') {
              return arg.toString().replace(/ ?\{[\s\S]*$/, '');
            } else if (typeof arg === 'undefined') {
              return 'undefined';
            } else if (typeof arg !== 'string') {
              return toJson(arg);
            }
            return arg;
          }
          return match;
        });
        message = message + '\nhttp://errors.angularjs.org/1.2.14/' + (module ? module + '/' : '') + code;
        for (i = 2; i < arguments.length; i++) {
          message = message + (i == 2 ? '?' : '&') + 'p' + (i - 2) + '=' + encodeURIComponent(stringify(arguments[i]));
        }
        return new Error(message);
      };
    }
    function setupModuleLoader(window) {
      var $injectorMinErr = minErr('$injector');
      var ngMinErr = minErr('ng');
      function ensure(obj, name, factory) {
        return obj[name] || (obj[name] = factory());
      }
      var angular = ensure(window, 'angular', Object);
      angular.$$minErr = angular.$$minErr || minErr;
      return ensure(angular, 'module', function() {
        var modules = {};
        return function module(name, requires, configFn) {
          var assertNotHasOwnProperty = function(name, context) {
            if (name === 'hasOwnProperty') {
              throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context);
            }
          };
          assertNotHasOwnProperty(name, 'module');
          if (requires && modules.hasOwnProperty(name)) {
            modules[name] = null;
          }
          return ensure(modules, name, function() {
            if (!requires) {
              throw $injectorMinErr('nomod', "Module '{0}' is not available! You either misspelled " + "the module name or forgot to load it. If registering a module ensure that you " + "specify the dependencies as the second argument.", name);
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
              animation: invokeLater('$animateProvider', 'register'),
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
    setupModuleLoader(window);
  })(window);
  angular.Module;
})(require("process"));
