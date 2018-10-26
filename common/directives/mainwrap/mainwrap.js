"use strict";

System.register(["angular", "angular-material", "./mainwrap.tpl", "./navList.tpl", "./socialList.tpl", "./footer.tpl", "./mainwrap.css!", "./mainwrap.controller", "common/services/auth.service", "config/config", "common/filters/fromNow.filter", "common/filters/html.filter"], function (_export, _context) {
  "use strict";

  var angular, MainwrapCtrl, authService, configService, fromNowFilter, htmlFilter, mainwrapModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_mainwrapTpl) {}, function (_navListTpl) {}, function (_socialListTpl) {}, function (_footerTpl) {}, function (_mainwrapCss) {}, function (_mainwrapController) {
      MainwrapCtrl = _mainwrapController.default;
    }, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService.default;
    }, function (_configConfig) {
      configService = _configConfig.default;
    }, function (_commonFiltersFromNowFilter) {
      fromNowFilter = _commonFiltersFromNowFilter.default;
    }, function (_commonFiltersHtmlFilter) {
      htmlFilter = _commonFiltersHtmlFilter.default;
    }],
    execute: function () {
      mainwrapModule = angular.module('mainwrap.js', ['common/directives/mainwrap/mainwrap.tpl.html', 'common/directives/mainwrap/navList.tpl.html', 'common/directives/mainwrap/socialList.tpl.html', 'common/directives/mainwrap/footer.tpl.html', authService.name, configService.name, fromNowFilter.name, htmlFilter.name]);
      mainwrapModule.directive('mainWrap', function () {
        return {
          templateUrl: 'common/directives/mainwrap/mainwrap.tpl.html',
          restrict: 'EA',
          transclude: true,
          controller: MainwrapCtrl,
          controllerAs: 'mainwrapCtrl',
          link: function link(scope, element, attrs, controller) {
            attrs.$observe('toolbarTemplate', function (value) {
              scope.toolbarTemplate = value;
            });
            attrs.$observe('subnavToggle', function (value) {
              controller.subnavToggle = value;
            });
          },
          bindToController: {
            subnavToggle: '@'
          }
        };
      });
      mainwrapModule.directive('extraToolbar', ["$http", "$templateCache", "$compile", function ($http, $templateCache, $compile) {
        return {
          transclude: true,
          link: function link(scope, element, attrs) {
            function loadTemplate(template) {
              $http.get(template, {
                cache: $templateCache
              }).success(function (templateContent) {
                element.replaceWith($compile(templateContent)(scope));
              });
            }

            scope.$watch(attrs.template, function (value) {
              if (value) {
                loadTemplate(value);
              }
            });

            if (attrs.template) {
              loadTemplate(attrs.template);
            }
          }
        };
      }]);
      mainwrapModule.directive('twitterTimeline', function () {
        return {
          restrict: 'E',
          template: '<a class="twitter-timeline" href="https://twitter.com/openlegendrpg" data-widget-id="696092295943319552">Tweets by @openlegendrpg</a>',
          link: function link(scope, element, attrs) {
            (function run() {
              !function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';

                if (!d.getElementById(id)) {
                  js = d.createElement(s);
                  js.id = id;
                  js.src = p + "://platform.twitter.com/widgets.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }
              }(document, "script", "twitter-wjs");
            })();
          }
        };
      });

      _export("default", mainwrapModule);
    }
  };
});
//# sourceMappingURL=mainwrap.js.map
