System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/admin/childstate2/childstate2.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/admin/childstate2/childstate2.tpl.html", "<h2>Child State 2</h2>");
      }]);
    }
  };
});