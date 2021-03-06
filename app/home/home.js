'use strict';

System.register(["angular", "angular-material", "common/directives/mainwrap/mainwrap", "config/config", "./home.controller", "./home.tpl", "./home.css!"], function (_export, _context) {
  "use strict";

  var angular, mainwrap, configService, HomeCtrl, homeModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap.default;
    }, function (_configConfig) {
      configService = _configConfig.default;
    }, function (_homeController) {
      HomeCtrl = _homeController.default;
    }, function (_homeTpl) {}, function (_homeCss) {}],
    execute: function () {
      homeModule = angular.module('home', [mainwrap.name, configService.name, 'app/home/home.tpl.html']);
      homeModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('home', {
          url: '/',
          templateUrl: 'app/home/home.tpl.html',
          controller: HomeCtrl,
          controllerAs: 'homeCtrl'
        });
      }]);

      _export("default", homeModule);
    }
  };
});
//# sourceMappingURL=home.js.map
