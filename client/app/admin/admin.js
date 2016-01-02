System.register(["angular", "angular-material", "./admin.tpl", "common/directives/mainwrap/mainwrap", "./childstate1/childstate1", "./childstate2/childstate2"], function (_export) {
  var angular, mainwrap, adminModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMaterial) {}, function (_adminTpl) {}, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap["default"];
    }, function (_childstate1Childstate1) {}, function (_childstate2Childstate2) {}],
    execute: function () {
      "use strict";

      adminModule = angular.module("admin", [mainwrap.name, "admin.childstate1", "admin.childstate2", "app/admin/admin.tpl.html"]);

      adminModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("admin", {
          url: "/admin",
          templateUrl: "app/admin/admin.tpl.html",
          controller: "AdminCtrl",
          controllerAs: "adminCtrl" });

        $stateProvider.state("admin.childstate1", {
          url: "/childstate1",
          templateUrl: "app/admin/childstate1/childstate1.tpl.html",
          controller: "Childstate1Ctrl",
          controllerAs: "childstate1Ctrl",
          parent: "admin"
        });

        $stateProvider.state("admin.childstate2", {
          url: "/childstate2",
          templateUrl: "app/admin/childstate2/childstate2.tpl.html",
          controller: "Childstate2Ctrl",
          controllerAs: "childstate2Ctrl",
          parent: "admin"
        });
      }]);

      adminModule.controller("AdminCtrl", ["$scope", function ($scope) {
        $scope = $scope;
        console.log("admin!");
      }]);

      _export("default", adminModule);
    }
  };
});
//# sourceMappingURL=../../app/admin/admin.js.map