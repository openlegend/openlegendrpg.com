'use strict';

System.register(["angular", "angular-material", "common/directives/mainwrap/mainwrap", "config/config", "./license.controller", "./license.tpl", "./license.css!"], function (_export, _context) {
  "use strict";

  var angular, mainwrap, configService, LicenseCtrl, licenseModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap.default;
    }, function (_configConfig) {
      configService = _configConfig.default;
    }, function (_licenseController) {
      LicenseCtrl = _licenseController.default;
    }, function (_licenseTpl) {}, function (_licenseCss) {}],
    execute: function () {
      licenseModule = angular.module('license', [mainwrap.name, configService.name, 'app/license/license.tpl.html']);
      licenseModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('license', {
          url: '/community-license',
          templateUrl: 'app/license/license.tpl.html',
          controller: LicenseCtrl,
          controllerAs: 'licenseCtrl'
        });
      }]);

      _export("default", licenseModule);
    }
  };
});
//# sourceMappingURL=license.js.map
