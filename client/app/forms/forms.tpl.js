System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/forms/forms.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/forms/forms.tpl.html", "<main-wrap layout=\"column\"><h5>A Form</h5><input type=\"text\"></main-wrap>");
      }]);
    }
  };
});