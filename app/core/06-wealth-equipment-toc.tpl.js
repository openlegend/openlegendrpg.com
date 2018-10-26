"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/06-wealth-equipment-toc.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/06-wealth-equipment-toc.tpl.html', '<div id="toc"><ul><li><a href="#chapter-6-wealth-equipment">Chapter 6: Wealth &amp; Equipment</a><ul><li><a href="#wealth">Wealth</a><ul><li><a href="#acquiring-goods-and-services">Acquiring Goods and Services</a></li><li><a href="#gaining-wealth">Gaining Wealth</a></li></ul></li><li><a href="#carrying-capacity">Carrying Capacity</a><ul><li><a href="#twenty-items-max">Twenty Items Max</a></li><li><a href="#maximum-heavy-items-equals-might-score">Maximum Heavy Items Equals Might Score</a></li><li><a href="#one-maybe-two-bulky-items">One (Maybe Two) Bulky Items</a></li></ul></li><li><a href="#weapons-implements">Weapons &amp; Implements</a><ul><li><a href="#properties">Properties</a></li></ul></li><li><a href="#armor">Armor</a><ul><li><a href="#getting-in-and-out-of-your-armor">Getting in and out of Your Armor</a></li></ul></li><li><a href="#building-your-own-weapons">Building Your Own Weapons</a><ul><li><a href="#step-1-choose-a-category">Step 1: Choose a Category</a></li><li><a href="#step-2-choose-properties">Step 2: Choose Properties</a></li><li><a href="#step-3-choose-banes">Step 3: Choose Banes</a></li><li><a href="#step-4-calculate-wealth-level">Step 4: Calculate Wealth Level</a></li></ul></li></ul></li></ul></div>');
      }]);
    }
  };
});