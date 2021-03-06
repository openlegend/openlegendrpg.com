"use strict";

System.register(["angular", "angular-material", "common/services/user.service", "common/directives/mainwrap/mainwrap", "./signup.controller", "./signup.tpl", "./signup.css!"], function (_export, _context) {
  "use strict";

  var angular, userService, mainwrap, signupController, signupModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_commonServicesUserService) {
      userService = _commonServicesUserService.default;
    }, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap.default;
    }, function (_signupController) {
      signupController = _signupController.default;
    }, function (_signupTpl) {}, function (_signupCss) {}],
    execute: function () {
      signupModule = angular.module('signup', [userService.name, mainwrap.name, signupController.name, 'app/signup/signup.tpl.html']);
      signupModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('signup', {
          url: '/signup',
          controller: 'SignupCtrl',
          controllerAs: 'signupCtrl',
          templateUrl: 'app/signup/signup.tpl.html',
          authenticate: false
        });
      }]);

      _export("default", signupModule);
    }
  };
});
//# sourceMappingURL=signup.js.map
