System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/banes/banes.header.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/banes/banes.header.tpl.html", "<form name=\"banesCtrl.headerForm\"><div layout=\"row\" layout-xs=\"column\" layout-sm=\"column\" layout-align=\"stretch stretch\"><div class=\"left-search\" flex=\"100\" flex-gt-sm=\"30\"><md-autocomplete md-min-length=\"0\" md-items=\"item in []\" md-item-text=\"item.name\" md-search-text=\"banesCtrl.searchQuery\" placeholder=\"Text Search\"></md-autocomplete></div><div flex=\"100\" flex-gt-sm=\"20\" layout=\"column\" layout-align=\"center center\"><div>Power Level</div><div layout=\"row\"><md-select placeholder=\"Pick\" ng-model=\"banesCtrl.powerLevelValue\"><md-option value=\"0\">0</md-option><md-option value=\"1\">1</md-option><md-option value=\"2\">2</md-option><md-option value=\"3\">3</md-option><md-option value=\"4\">4</md-option><md-option value=\"5\">5</md-option><md-option value=\"6\">6</md-option><md-option value=\"7\">7</md-option><md-option value=\"8\">8</md-option><md-option value=\"9\">9</md-option></md-select><div>or Less</div></div></div><md-chips class=\"search-overflow-y chips-search\" md-require-match=\"true\" ng-model=\"banesCtrl.selectedAttributes\" flex=\"100\" flex-gt-sm=\"50\" layout-padding=\"\"><md-autocomplete class=\"header-search\" md-min-length=\"0\" md-search-text=\"banesCtrl.searchText\" md-search-text-change=\"banesCtrl.updateSearchTextModel(banesCtrl.searchText)\" md-selected-item=\"selectedItem\" md-autoselect=\"true\" md-select-on-match=\"true\" md-items=\"item in banesCtrl.attackAttrSearchFilter()\" md-item-text=\"item.name\" placeholder=\"Search\"><span md-highlight-text=\"banesCtrl.searchText\">{{item.name}}</span></md-autocomplete><md-chip-template><span><strong>{{$chip.name}}</strong> <strong ng-if=\"$chip.power\">:&nbsp;{{ $chip.power }}</strong></span></md-chip-template></md-chips></div></form>");
      }]);
    }
  };
});