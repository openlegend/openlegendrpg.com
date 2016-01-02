System.register(["angular", "angular-material", "common/directives/mainwrap/mainwrap", "./dashboards.tpl"], function (_export) {
  var angular, mainwrap, dashboardModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMaterial) {}, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap["default"];
    }, function (_dashboardsTpl) {}],
    execute: function () {
      "use strict";

      dashboardModule = angular.module("dashboard", [mainwrap.name, "app/dashboard/dashboards.tpl.html"]);

      dashboardModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("dashboards", {
          url: "/dashboards",
          templateUrl: "app/dashboard/dashboards.tpl.html",
          controller: "DashboardCtrl",
          controllerAs: "dashboardCtrl"
        });
      }]);

      dashboardModule.controller("DashboardCtrl", ["$scope", function ($scope) {
        $scope = $scope;
        console.log("dashboard!");
      }]);

      _export("default", dashboardModule);
    }
  };
});
//# sourceMappingURL=../../app/dashboard/dashboard.js.map