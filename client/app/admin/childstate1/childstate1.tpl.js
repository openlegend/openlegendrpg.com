System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/admin/childstate1/childstate1.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/admin/childstate1/childstate1.tpl.html", "<h2>Child State 1</h2>");
      }]);
    }
  };
});