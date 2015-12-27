/* */ 
(function(process) {
  (function setupModuleLoader(window) {
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
  })(window);
  angular.Module;
})(require('process'));
