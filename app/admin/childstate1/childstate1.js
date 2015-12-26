System.register(["angular", "./childstate1.tpl"], function (_export) {
  var angular, childstate1Module;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_childstate1Tpl) {}],
    execute: function () {
      "use strict";

      childstate1Module = angular.module("admin.childstate1", ["app/admin/childstate1/childstate1.tpl.html"]);

      childstate1Module.controller("Childstate1Ctrl", ["$scope", function ($scope) {
        $scope = $scope;
        console.log("childstate1!");
      }]);

      _export("default", childstate1Module);
    }
  };
});
//# sourceMappingURL=../../../app/admin/childstate1/childstate1.js.map