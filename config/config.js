'use strict';

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular, configServiceModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      configServiceModule = angular.module('config.js', []);
      configServiceModule.factory('Config', function () {
        return {
          timestamp: 1540521626313,
          urlBase: "".concat(window.location.protocol, "//").concat(window.location.host, "/")
        };
      });

      _export("default", configServiceModule);
    }
  };
});