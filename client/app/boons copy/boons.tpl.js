System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/boons copy/boons.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/boons copy/boons.tpl.html", "<main-wrap toolbar-template=\"app/boons/boons.header.tpl.html\" layout=\"column\" flex=\"\" layout-fill=\"\"><md-content><div class=\"inner-pad\"><md-list><md-list-item ng-repeat=\"thisPower in boonsCtrl.powers | filter:boonsCtrl.textSearchFilter(thisPower) | filter:boonsCtrl.powerLevelFilter(thisPower) track by $index\"><div class=\"md-list-item-text\"><h2 class=\"md-display-1\">{{thisPower.name}}</h2><strong>Duration:</strong> {{thisPower.duration}}<br><strong>Invocation Time:</strong> {{thisPower.invocationTime}}<br><br><strong>Power Level:</strong> <span ng-repeat=\"power in thisPower.power track by $index\"><span ng-if=\"$index != 0\">/</span> {{power}}</span><br><br><strong>Attributes:</strong> <span ng-repeat=\"attribute in thisPower.attribute track by $index\"><span ng-if=\"$index != 0\">,</span> {{attribute}}</span><br><br><div ng-if=\"thisPower.description\"><h3 class=\"md-headline\">Description</h3><p ng-bind-html=\"thisPower.description | unsafe\"></p></div><div ng-if=\"thisPower.effect\"><h3 class=\"md-headline\">Effect</h3><p ng-bind-html=\"thisPower.effect | unsafe\"></p></div><div ng-if=\"thisPower.special\"><h3 class=\"md-headline\">Special</h3><p ng-bind-html=\"thisPower.special | unsafe\"></p></div><br><br></div><md-divider ng-if=\"!$last\"></md-divider></md-list-item></md-list></div></md-content></main-wrap>");
      }]);
    }
  };
});