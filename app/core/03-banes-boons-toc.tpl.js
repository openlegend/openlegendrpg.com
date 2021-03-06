"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/03-banes-boons-toc.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/03-banes-boons-toc.tpl.html', '<div id="toc"><ul><li><a href="#chapter-3-banes-boons">Chapter 3: Banes &amp; Boons</a><ul><li><a href="#telling-your-story-with-banes-and-boons">Telling Your Story with Banes and Boons</a></li><li><a href="#invoking-banes-and-boons">Invoking Banes and Boons</a></li><li><a href="#reading-a-bane-description">Reading a Bane Description</a></li><li><a href="#reading-a-boon-description">Reading a Boon Description</a></li></ul></li></ul></div>');
      }]);
    }
  };
});