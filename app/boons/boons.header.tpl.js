System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/boons/boons.header.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/boons/boons.header.tpl.html", "<div layout=\"row\"><div class=\"left-search\" flex=\"\" layout-padding=\"\"><md-autocomplete md-min-length=\"0\" md-items=\"item in []\" md-item-text=\"item.name\" md-search-text=\"boonsCtrl.searchQuery\" placeholder=\"Text Search\"></md-autocomplete></div><md-chips md-require-match=\"true\" ng-model=\"boonsCtrl.selectedAttributes\" flex=\"\" layout-padding=\"\"><md-autocomplete class=\"header-search\" md-min-length=\"0\" md-search-text=\"boonsCtrl.attackAttrSearchText\" md-search-text-change=\"boonsCtrl.updateSearchTextModel(boonsCtrl.attackAttrSearchText)\" md-selected-item=\"selectedItem\" md-autoselect=\"true\" md-select-on-match=\"true\" md-items=\"item in boonsCtrl.attributes | filter:boonsCtrl.attackAttrSearchFilter(item,attackAttrSearchText)\" md-item-text=\"item.name\" placeholder=\"Search\"><span md-highlight-text=\"boonsCtrl.attackAttrSearchText\">{{item}}</span></md-autocomplete><md-chip-template><span><strong>{{$chip}}</strong></span></md-chip-template></md-chips><div flex=\"\" layout=\"row\" layout-align=\"center center\"><div flex=\"33\">Power Level</div><div flex=\"20\"><md-select placeholder=\"Pick\" ng-model=\"boonsCtrl.powerLevelValue\"><md-option value=\"0\">0</md-option><md-option value=\"1\">1</md-option><md-option value=\"2\">2</md-option><md-option value=\"3\">3</md-option><md-option value=\"4\">4</md-option><md-option value=\"5\">5</md-option><md-option value=\"6\">6</md-option><md-option value=\"7\">7</md-option><md-option value=\"8\">8</md-option><md-option value=\"9\">9</md-option></md-select></div><div flex=\"40\"><md-switch class=\"md-primary\" ng-model=\"boonsCtrl.powerAboveBelow\" ng-true-value=\"'or Greater'\" ng-false-value=\"'or Less'\" aria-label=\"Toggle Power Filter\">{{ boonsCtrl.powerAboveBelow }}</md-switch></div></div></div>");
      }]);
    }
  };
});