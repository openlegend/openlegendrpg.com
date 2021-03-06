"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/core.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/core.tpl.html', '<main-wrap layout-orientation="none" layout="column" flex="" layout-fill=""><md-content class="paper-bg core-rules-ctrl"><div class="inner-pad"><div class="right-shim"></div><div class="right-toc-sidebar"><div class="inner-wrap" ng-class="{ expanded: sidebarExpanded }"><md-button class="sidebar-pinned md-primary md-icon-button md-raised" ng-click="sidebarExpanded = !sidebarExpanded"><md-icon ng-if="!sidebarExpanded" size="md" aria-label="Expand Icon" md-svg-icon="menu-down"></md-icon><md-icon ng-if="sidebarExpanded" size="md" aria-label="Collapse Icon" md-svg-icon="menu-up"></md-icon><md-tooltip>{{ (sidebarExpanded) ? \'Show Less\' : \'Show More\' }}</md-tooltip></md-button><div layout-padding="lg" ng-include="" src="\'app/core/\' + chapter + \'-toc.tpl.html\'"></div></div></div><div layout-padding="lg" ng-include="" src="\'app/core/\' + chapter + \'.tpl.html\'"></div><div flex="" layout="row" layout-align="center center" class="footer-nav-links"><div><a ng-if="coreCtrl.getChapterIndex(chapter) > 0" ng-href="core-rules/{{ sections[ coreCtrl.getChapterIndex(chapter) - 1 ] }}">< Previous Chapter</a><a ng-if="coreCtrl.getChapterIndex(chapter) + 1 < sections.length" href="/core-rules/{{ sections[ coreCtrl.getChapterIndex(chapter) + 1 ] }}">Next Chapter ></a></div></div><div class="dark-bg"><div md-theme="dark" ng-include="\'common/directives/mainwrap/footer.tpl.html\'"></div></div></div></md-content></main-wrap>');
      }]);
    }
  };
});