"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/admin/childstate1/childstate1.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/admin/childstate1/childstate1.tpl.html', '<h2>Child State 1</h2>');
      }]);
    }
  };
});