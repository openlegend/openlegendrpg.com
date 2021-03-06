"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/09-special-equipment-toc.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/09-special-equipment-toc.tpl.html', '<div id="toc"><ul><li><a href="#chapter-9-special-equipment">Chapter 9: Special Equipment</a><ul><li><a href="#extraordinary-items">Extraordinary Items</a><ul><li><a href="#acquiring-extraordinary-items">Acquiring Extraordinary Items</a></li><li><a href="#extraordinary-item-descriptions">Extraordinary Item Descriptions</a></li><li><a href="#building-your-own-extraordinary-items">Building Your Own Extraordinary Items</a></li></ul></li><li><a href="#legendary-items-list">Legendary Items List</a><ul><li><a href="#acquiring-legendary-items">Acquiring Legendary Items</a></li><li><a href="#attributes-banes-and-boons">Attributes, Banes, and Boons</a></li><li><a href="#properties-1">Properties</a></li></ul></li><li><a href="#mounts-vehicles">Mounts &amp; Vehicles</a><ul><li><a href="#mount-actions">Mount Actions</a></li><li><a href="#example-mounts-vehicles">Example Mounts &amp; Vehicles</a></li></ul></li></ul></li></ul></div>');
      }]);
    }
  };
});