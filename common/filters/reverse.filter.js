"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular, reverseModule;

  function filter() {
    return function (items) {
      return items.reverse();
    };
  }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      reverseModule = angular.module('reverse.filter.js', []).filter('reverse', filter);

      _export("default", reverseModule);
    }
  };
});
//# sourceMappingURL=reverse.filter.js.map
