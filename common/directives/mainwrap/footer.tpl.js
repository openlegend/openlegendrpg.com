"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('common/directives/mainwrap/footer.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('common/directives/mainwrap/footer.tpl.html', '<div class="no-bg footer" flex=""><md-divider></md-divider><div layout="row" flex="" layout-wrap=""><div flex="100" flex-gt-sm="33" layout-padding="md"><div ng-include="\'common/directives/mainwrap/socialList.tpl.html\'"></div></div><div flex="100" flex-gt-sm="33" layout-padding="md"><twitter-timeline><a class="twitter-timeline" href="https://twitter.com/openlegendrpg" data-widget-id="696092295943319552">Tweets by @openlegendrpg</a> <a class="twitter-timeline" href="https://twitter.com/openlegendrpg" data-widget-id="696092295943319552">Tweets from https://twitter.com/OpenLegendRPG</a></twitter-timeline></div><div flex="100" flex-gt-sm="33" layout-padding="md"><div class="copyright bg-accent" layout-padding="md" layout="column" layout-align="start"><small>Copyright &copy; 2012 - {{ mainwrapCtrl.Date.now() | fromNow:false:\'YYYY\' }} Seventh Sphere Entertainment. Create your own Open Legend content with the <a href="/community-license">Open Legend Community License</a>. Artwork by <a href="http://saryth.deviantart.com/gallery/" target="_blank">Saryth</a>.<br><br>Last updated: <strong>{{ mainwrapCtrl.Config.timestamp | fromNow:false:\'MMM Do YYYY, h:mm a\' }}</strong><br><br><a href="https://github.com/openlegend/core-rules/commits/master">View Recent Changes</a></small></div></div><br><br><br><br><br></div></div>');
      }]);
    }
  };
});