"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/00-introduction-toc.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/00-introduction-toc.tpl.html', '<div id="toc"><ul><li><a href="#introduction-this-is-your-story.-tell-it.">Introduction: This is Your Story. Tell it.</a><ul><li><a href="#what-defines-open-legend">What Defines Open Legend?</a></li><li><a href="#the-core-mechanic-the-action-roll">The Core Mechanic: The Action Roll</a></li><li><a href="#greater-treasures-lie-within">Greater Treasures Lie Within</a></li></ul></li></ul></div>');
      }]);
    }
  };
});