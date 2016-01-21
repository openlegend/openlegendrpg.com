System.register(["angular"],function(_export){var angular;return{setters:[function(_angular){angular=_angular["default"]}],execute:function(){"use strict";angular.module("app/feats/featsList.tpl.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("app/feats/featsList.tpl.html",'<main-wrap subnav-toggle="true" toolbar-template="app/feats/feats.header.tpl.html" layout="column" flex=""><md-content class="paper-bg" layout="column" flex=""><div class="inner-pad" layout-padding="lg"><md-list><md-list-item ng-repeat="item in featsCtrl.powers | filter:featsCtrl.textSearchFilter(item) | filter:featsCtrl.powerLevelFilter(item) track by $index"><div class="md-list-item-text"><h2 class="md-display-1">{{item.name}}&nbsp;<md-button class="md-icon-button md-exclude" ui-sref="featsSingle({ name: featsCtrl.Link.nameToUrlPath(item.name) })"><md-icon size="lg" aria-label="Link Icon" md-svg-icon="share"></md-icon><md-tooltip md-direction="bottom">View Feat</md-tooltip></md-button><md-button ng-if="$mdMedia(\'gt-sm\')" class="md-icon-button md-exclude" ng-click="featsCtrl.Link.copyLinkToClip( [item], \'feats\')"><md-icon size="lg" aria-label="Link Icon" md-svg-icon="link-variant"></md-icon><md-tooltip md-direction="bottom">Copy Link</md-tooltip></md-button></h2><p><strong>Cost:</strong> {{ (item.cost > 1 ) ? item.cost+\' points\' : item.cost+\' point\' }}</p><strong>Prerequisites</strong><ul><li ng-repeat="prerequisite in item.prerequisite track by $index">{{prerequisite}}</li></ul><div ng-if="item.description"><strong>Description</strong><p ng-bind-html="item.description | unsafe"></p></div><div ng-if="item.effect"><strong>Effect</strong><p ng-bind-html="item.effect | unsafe"></p></div><div ng-if="item.special"><strong>Special</strong><p ng-bind-html="item.special | unsafe"></p></div><br></div><md-divider ng-if="!$last"></md-divider></md-list-item></md-list></div></md-content></main-wrap>')}])}}});