System.register(["angular"],function(_export){var angular;return{setters:[function(_angular){angular=_angular["default"]}],execute:function(){"use strict";angular.module("app/core/core.tpl.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("app/core/core.tpl.html",'<main-wrap layout-orientation="none" layout="column" flex="" layout-fill=""><md-content class="paper-bg core-rules-ctrl" layout="column" flex=""><div class="inner-pad" layout-padding="lg"><div class="right-shim"></div><div class="right-toc-sidebar"><div class="inner-wrap" ng-class="{ expanded: sidebarExpanded }"><div ng-include="\'app/core/tableOfContents.tpl.html\'"></div><div class="bottom-toc-footer"><md-button class="md-raised" ng-click="sidebarExpanded = !sidebarExpanded">{{ (sidebarExpanded) ? \'Show Less\' : \'Show More\' }}</md-button></div></div></div><div ng-include="\'app/core/coreRulesContent.tpl.html\'"></div></div></md-content></main-wrap>')}])}}});