"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/feats/featsSingle.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/feats/featsSingle.tpl.html', '<main-wrap layout="column" flex=""><md-toolbar class="md-hue-2"><div class="md-toolbar-tools"><md-button ui-sref="feats" class="md-icon-button"><md-icon aria-label="Back Icon Button" class="md-primary-icon" md-svg-icon="arrow-left"></md-icon></md-button>&nbsp;&nbsp;Back to Feat List</div></md-toolbar><md-content class="paper-bg" layout="row" flex="" layout-align="space-between start"><div class="inner-pad" flex="" layout="column"><md-list class="paper-bg list-fill single" layout-padding="lg"><md-list-item ng-repeat="feat in featsCtrl.feat track by $index"><div class="md-list-item-text"><h2 class="md-display-1">{{feat.name}}&nbsp;</h2><p><strong>Cost:</strong> {{ (feat.cost > 1 ) ? feat.cost+\' points\' : feat.cost+\' point\' }}</p><strong>Prerequisites</strong><ul compile="featsCtrl.featPrereqOutput(feat.prerequisites)"></ul><div ng-if="feat.description"><strong>Description</strong><p class="description" ng-bind-html="feat.description | unsafe"></p></div><div ng-if="feat.effect"><strong>Effect</strong><p ng-bind-html="feat.effect | unsafe"></p></div><div ng-if="feat.special"><strong>Special</strong><p ng-bind-html="feat.special | unsafe"></p></div><br></div><br><br><br><br><br><md-divider ng-if="!$last"></md-divider></md-list-item></md-list><div class="dark-bg"><div md-theme="dark" flex="" ng-include="\'common/directives/mainwrap/footer.tpl.html\'"></div></div></div></md-content></main-wrap>');
      }]);
    }
  };
});