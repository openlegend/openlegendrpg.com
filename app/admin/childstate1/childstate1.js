"use strict";

System.register(["angular", "./childstate1.tpl"], function (_export, _context) {
  "use strict";

  var angular, childstate1Module;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_childstate1Tpl) {}],
    execute: function () {
      childstate1Module = angular.module('admin.childstate1', ['app/admin/childstate1/childstate1.tpl.html']);
      childstate1Module.controller('Childstate1Ctrl', ["$scope", function ($scope) {
        $scope = $scope;
        console.log('childstate1!');
      }]);

      _export("default", childstate1Module);
    }
  };
});
//# sourceMappingURL=childstate1.js.map
