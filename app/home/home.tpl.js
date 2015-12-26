System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/home/home.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/home/home.tpl.html", "<main-wrap layout=\"column\" flex=\"\" layout-fill=\"\"><div layout=\"vertical\" layout-fill=\"\"><md-content layout-padding=\"lg\"><h1>Hello from Home!</h1></md-content></div></main-wrap>");
      }]);
    }
  };
});