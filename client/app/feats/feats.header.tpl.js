System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/feats/feats.header.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/feats/feats.header.tpl.html", "<div layout=\"row\" layout-xs=\"column\" layout-sm=\"column\"><div class=\"left-search\" flex=\"\" layout-padding=\"\"><md-autocomplete md-min-length=\"0\" md-items=\"item in []\" md-item-text=\"item.name\" md-search-text=\"featsCtrl.searchQuery\" placeholder=\"Text Search\"></md-autocomplete></div><md-chips md-require-match=\"true\" ng-model=\"featsCtrl.selectedAttributes\" flex=\"\" layout-padding=\"\"><md-autocomplete class=\"header-search\" md-min-length=\"0\" md-search-text=\"featsCtrl.attackAttrSearchText\" md-search-text-change=\"featsCtrl.updateSearchTextModel(featsCtrl.attackAttrSearchText)\" md-selected-item=\"selectedItem\" md-autoselect=\"true\" md-select-on-match=\"true\" md-items=\"item in featsCtrl.attributes | filter:featsCtrl.attackAttrSearchFilter(item,attackAttrSearchText)\" md-item-text=\"item.name\" placeholder=\"Search\"><span md-highlight-text=\"featsCtrl.attackAttrSearchText\">{{item}}</span></md-autocomplete><md-chip-template><span><strong>{{$chip}}</strong></span></md-chip-template></md-chips></div>");
      }]);
    }
  };
});