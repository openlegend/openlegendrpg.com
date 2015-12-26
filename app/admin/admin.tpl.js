System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/admin/admin.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/admin/admin.tpl.html", "<main-wrap layout=\"column\"><h1>Manage Your Account</h1><a ui-sref=\"admin.childstate1\" href=\"#\">Child State 1</a> <a ui-sref=\"admin.childstate2\" href=\"#\">Child State 2</a><ui-view></ui-view></main-wrap>");
      }]);
    }
  };
});