"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('common/directives/mainwrap/socialList.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('common/directives/mainwrap/socialList.tpl.html', '<div layout-padding="md"><div layout-padding="lg-b"><strong clas="md-headline reset" layout-padding="sm-b">Follow Us</strong></div><div class="bg-accent" layout="row" layout-align="center space-between"><md-button class="md-icon-button" ng-href="http://facebook.com/openlegendrpg"><md-icon md-svg-icon="facebook" alt="Open Legend RPG on Facebook"></md-icon><md-tooltip>Facebook</md-tooltip></md-button><md-button class="md-icon-button" ng-href="http://twitter.com/OpenLegendRPG"><md-icon md-svg-icon="twitter" alt="Open Legend RPG on Twitter"></md-icon><md-tooltip>Twitter</md-tooltip></md-button><md-button class="md-icon-button" ng-href="http://twitch.tv/OpenLegendRPG"><md-icon md-svg-icon="twitch" alt="Open Legend RPG on Twitch"></md-icon><md-tooltip>Live on Twitch</md-tooltip></md-button><md-button class="md-icon-button" ng-href="https://www.youtube.com/openlegendrpg"><md-icon md-svg-icon="youtube-play" alt="Open Legend RPG on YouTube"></md-icon><md-tooltip>YouTube Archives</md-tooltip></md-button><md-button class="md-icon-button" ng-href="http://reddit.com/r/openlegendrpg"><md-icon md-svg-icon="reddit" alt="Open Legend RPG on Reddit"></md-icon><md-tooltip>Subreddit Community</md-tooltip></md-button></div></div>');
      }]);
    }
  };
});