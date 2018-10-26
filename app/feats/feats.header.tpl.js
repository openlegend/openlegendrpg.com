"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/feats/feats.header.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/feats/feats.header.tpl.html', '<form name="featsCtrl.headerForm"><div layout="row" layout-xs="column" layout-sm="column" layout-align="space-between center"><div class="left-search" flex=""><md-autocomplete md-min-length="0" md-items="item in []" md-item-text="item.name" md-search-text="featsCtrl.searchQuery" placeholder="Text Search"></md-autocomplete></div><md-chips md-require-match="true" ng-model="featsCtrl.selectedAttributes" flex="" layout-padding=""><md-autocomplete class="header-search" md-min-length="0" md-search-text="featsCtrl.attackAttrSearchText" md-search-text-change="featsCtrl.updateSearchTextModel(featsCtrl.attackAttrSearchText)" md-selected-item="selectedItem" md-autoselect="true" md-select-on-match="true" md-items="item in featsCtrl.attributes | filter:featsCtrl.attackAttrSearchFilter(item,attackAttrSearchText)" md-item-text="item.name" placeholder="Search"><span md-highlight-text="featsCtrl.attackAttrSearchText">{{item}}</span></md-autocomplete><md-chip-template><span><strong>{{$chip}}</strong></span></md-chip-template></md-chips><div flex="" layout="row" layout-align="center center"><div flex="25">Cost is</div><div flex="25"><md-select md-container-class="center-children" placeholder="Cost" ng-model="featsCtrl.powerLevelValue"><md-option value="1">1</md-option><md-option value="2">2</md-option><md-option value="3">3</md-option><md-option value="4">4</md-option></md-select></div><div flex="50"><md-select md-container-class="center-children" placeholder="Comparison" ng-model="featsCtrl.powerComparator"><md-option value="gte">or Greater</md-option><md-option value="eq">Exactly</md-option><md-option value="lte">or Less</md-option></md-select></div></div></div></form>');
      }]);
    }
  };
});