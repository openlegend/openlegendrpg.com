"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular, compileDirectiveModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      compileDirectiveModule = angular.module('compile.directive.js', []);
      compileDirectiveModule.directive('compile', ["$compile", function ($compile) {
        return {
          restrict: 'A',
          link: function link(scope, element, attrs) {
            scope.$watch(function () {
              return scope.$eval(attrs.compile);
            }, function (value) {
              // Incase value is a TrustedValueHolderType, sometimes it
              // needs to be explicitly called into a string in order to
              // get the HTML string.
              element.html(value && value.toString());
              $compile(element.contents())(scope);
            });
          }
        };
      }]);

      _export("default", compileDirectiveModule);
    }
  };
});
//# sourceMappingURL=compile.directive.js.map
