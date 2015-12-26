System.register(["angular"], function (_export) {
  var angular, reverseModule;

  function filter() {
    return function (items) {
      return items.reverse();
    };
  }

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      reverseModule = angular.module("reverse.filter.js", []).filter("reverse", filter);

      _export("default", reverseModule);
    }
  };
});
//# sourceMappingURL=../../common/filters/reverse.filter.js.map