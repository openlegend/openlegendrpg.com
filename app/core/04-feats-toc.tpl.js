"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/04-feats-toc.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/04-feats-toc.tpl.html', '<div id="toc"><ul><li><a href="#chapter-4-feats">Chapter 4: Feats</a><ul><li><a href="#acquiring-feats">Acquiring Feats</a></li><li><a href="#reading-a-feat-description">Reading a Feat Description</a></li></ul></li></ul></div>');
      }]);
    }
  };
});