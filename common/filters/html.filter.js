"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular, htmlFilterModule;

  // escapes html content
  function filter($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    };
  }
  filter.$inject = ["$sce"];

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      ;
      htmlFilterModule = angular.module('html.filter.js', []).filter('html', filter);

      _export("default", htmlFilterModule);
    }
  };
});
//# sourceMappingURL=html.filter.js.map
