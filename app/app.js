'use strict';

System.register(["lodash", "angular", "angular-animate", "angular-material", "angular-material/angular-material.min.css!", "angular-ui-router", "angular-cookies", "oclazyload", "common/utils/routing", "common/services/authBroadcast.service", "common/services/authInterceptor.service", "common/services/auth.service", "config/config", "common/directives/loginModal/loginModal", "common/directives/loginComponent/loginComponent", "common/core.css!", "app/home/home"], function (_export, _context) {
  "use strict";

  var angular, routing, authBroadcastService, authInterceptorService, authService, configService, loginModal, loginComponent, homeModule, app;
  return {
    setters: [function (_lodash) {}, function (_angular) {
      angular = _angular.default;
    }, function (_angularAnimate) {}, function (_angularMaterial) {}, function (_angularMaterialAngularMaterialMinCss) {}, function (_angularUiRouter) {}, function (_angularCookies) {}, function (_oclazyload) {}, function (_commonUtilsRouting) {
      routing = _commonUtilsRouting.routing;
    }, function (_commonServicesAuthBroadcastService) {
      authBroadcastService = _commonServicesAuthBroadcastService.default;
    }, function (_commonServicesAuthInterceptorService) {
      authInterceptorService = _commonServicesAuthInterceptorService.default;
    }, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService.default;
    }, function (_configConfig) {
      configService = _configConfig.default;
    }, function (_commonDirectivesLoginModalLoginModal) {
      loginModal = _commonDirectivesLoginModalLoginModal.default;
    }, function (_commonDirectivesLoginComponentLoginComponent) {
      loginComponent = _commonDirectivesLoginComponentLoginComponent.default;
    }, function (_commonCoreCss) {}, function (_appHomeHome) {
      homeModule = _appHomeHome.default;
    }],
    execute: function () {
      app = angular.module('olrpg', ['ui.router', 'oc.lazyLoad', 'ngMaterial', 'ngCookies', 'ngAnimate', authBroadcastService.name, authInterceptorService.name, authService.name, configService.name, loginModal.name, loginComponent.name, homeModule.name]);
      app.config(routing(app));
      app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "$httpProvider", "$mdThemingProvider", "$mdIconProvider", function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider, $mdThemingProvider, $mdIconProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
        $httpProvider.useApplyAsync(true);
        $urlRouterProvider.otherwise('/');
        $mdThemingProvider.theme('default').primaryPalette('deep-purple', {
          'default': '700',
          'hue-1': '300',
          'hue-2': '500',
          'hue-3': '50'
        }).accentPalette('light-green');
        $mdThemingProvider.theme('dark').primaryPalette('deep-purple', {
          'default': '700',
          'hue-1': '300',
          'hue-2': '500',
          'hue-3': '50'
        }).dark();
        $mdIconProvider.defaultIconSet('assets/svg/sprite.stack.svg'); // Register a default set of SVG icons
        // the abstract state for login simply calls
        // Auth.logout() and redirects to the /login route

        $stateProvider.state('logout', {
          url: '/logout',
          controller: ["$scope", "$state", "Auth", function controller($scope, $state, Auth) {
            Auth.logout();
            $scope.$evalAsync(function () {
              $state.go('login', {}, {
                reload: true
              });
            });
          }],
          authenticate: false
        });
      }]); // enforce login / logout / and separate
      // "guest" vs. authenticated-only routes

      app.run(["$rootScope", "$state", "$timeout", "Auth", function ($rootScope, $state, $timeout, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
          if (next.name !== 'login' && next.name !== 'logout' && !next.abstract) {
            Auth.setNextRoute(next);
          }

          if (next.authenticate) {
            Auth.isLoggedInAsync(function (loggedIn) {
              // prevent routing if the next route requires authentication
              // & we have no user
              if (next.authenticate && !loggedIn) {
                event.preventDefault();
                $state.go('login', {}, {
                  reload: true
                });
              } else if (next.authenticate && loggedIn && next.name !== Auth.getNextRoute().name) {
                $state.go(next.name, {}, {
                  reload: false
                });
              }
            });
          }
        });
      }]); // bootstrap our application

      angular.element(document).ready(function () {
        angular.bootstrap(document.body, [app.name], {// strictDi: true // turning off for now
        });
      });

      _export("default", app);
    }
  };
});
//# sourceMappingURL=app.js.map
