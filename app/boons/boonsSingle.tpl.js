"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/boons/boonsSingle.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/boons/boonsSingle.tpl.html', '<main-wrap layout="column" flex=""><md-toolbar class="md-hue-2"><div class="md-toolbar-tools"><md-button ui-sref="boons" class="md-icon-button"><md-icon aria-label="Back Icon Button" class="md-primary-icon" md-svg-icon="arrow-left"></md-icon></md-button>&nbsp;&nbsp;Back to Boon List</div></md-toolbar><md-content class="paper-bg" layout="row" flex="" layout-align="space-between start"><div class="inner-pad" flex="" layout="column"><md-list class="paper-bg list-fill single" layout-padding="lg"><md-list-item ng-repeat="item in boonsCtrl.boon track by $index"><div class="md-list-item-text"><h2 class="md-display-1">{{item.name}}&nbsp;</h2><p><strong>Duration:</strong> {{item.duration}}</p><p><strong>Invocation Time:</strong> {{item.invocationTime}}</p><strong>Power Level:</strong> <span ng-repeat="power in item.power track by $index"><span ng-if="$index != 0">/</span> {{power}}</span><p><strong>Attributes:</strong> <span ng-repeat="attribute in item.attribute track by $index"><span ng-if="$index != 0">,</span> {{attribute}}</span></p><p ng-if="item.description"><strong>Description</strong></p><p ng-bind-html="item.description | unsafe"></p><p></p><p ng-if="item.effect"><strong>Effect</strong></p><p ng-bind-html="item.effect | unsafe"></p><p></p><p ng-if="item.special"><strong>Special</strong></p><p ng-bind-html="item.special | unsafe"></p><p></p><br><br></div><md-divider ng-if="!$last"></md-divider></md-list-item></md-list><span flex=""></span><div flex="" class="dark-bg"><div md-theme="dark" flex="" ng-include="\'common/directives/mainwrap/footer.tpl.html\'"></div></div></div></md-content></main-wrap>');
      }]);
    }
  };
});