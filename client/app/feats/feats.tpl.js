System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/feats/feats.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/feats/feats.tpl.html", "<main-wrap toolbar-template=\"app/feats/feats.header.tpl.html\" layout=\"column\" flex=\"\" layout-fill=\"\"><md-content class=\"paper-bg\"><div class=\"inner-pad\"><md-list><md-list-item ng-repeat=\"thisPower in featsCtrl.powers | filter:featsCtrl.textSearchFilter(thisPower) track by $index\"><div class=\"md-list-item-text\"><h2 class=\"md-display-1\">{{thisPower.name}}</h2><br><strong>Prerequisites:</strong><ul><li ng-repeat=\"prerequisite in thisPower.prerequisite track by $index\"><span ng-if=\"$index != 0\">,</span> {{prerequisite}}</li></ul><div ng-if=\"thisPower.description\"><h3 class=\"md-headline\">Description</h3><p ng-bind-html=\"thisPower.description | unsafe\"></p></div><div ng-if=\"thisPower.effect\"><h3 class=\"md-headline\">Effect</h3><p ng-bind-html=\"thisPower.effect | unsafe\"></p></div><div ng-if=\"thisPower.special\"><h3 class=\"md-headline\">Special</h3><p ng-bind-html=\"thisPower.special | unsafe\"></p></div><br></div><md-divider ng-if=\"!$last\"></md-divider></md-list-item></md-list></div></md-content></main-wrap>");
      }]);
    }
  };
});