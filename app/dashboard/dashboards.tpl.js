System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/dashboard/dashboards.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/dashboard/dashboards.tpl.html", "<main-wrap layout=\"column\"><h2>Dashboard</h2></main-wrap>");
      }]);
    }
  };
});