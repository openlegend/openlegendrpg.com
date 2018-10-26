'use strict';

System.register(["angular", "angular-material", "angular-ui-router", "common/services/auth.service", "./loginComponent.controller", "common/directives/customEmailValidation/customEmailValidation", "./loginComponent.tpl", "./loginComponent.css!"], function (_export, _context) {
  "use strict";

  var angular, authService, loginComponentCtrl, customEmailValidation, loginDirectiveModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_angularUiRouter) {}, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService.default;
    }, function (_loginComponentController) {
      loginComponentCtrl = _loginComponentController.default;
    }, function (_commonDirectivesCustomEmailValidationCustomEmailValidation) {
      customEmailValidation = _commonDirectivesCustomEmailValidationCustomEmailValidation.default;
    }, function (_loginComponentTpl) {}, function (_loginComponentCss) {}],
    execute: function () {
      loginDirectiveModule = angular.module('loginComponent.js', ['ngMaterial', 'ui.router', authService.name, loginComponentCtrl.name, customEmailValidation.name, 'common/directives/loginComponent/loginComponent.tpl.html']);
      loginDirectiveModule.directive('loginComponent', function () {
        return {
          templateUrl: 'common/directives/loginComponent/loginComponent.tpl.html',
          restrict: 'E',
          // transclude: true,
          controller: 'LoginComponentCtrl',
          controllerAs: 'loginComponentCtrl'
        };
      });

      _export("default", loginDirectiveModule);
    }
  };
});
//# sourceMappingURL=loginComponent.js.map
