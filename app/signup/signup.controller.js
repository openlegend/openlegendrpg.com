'use strict';

System.register(["angular", "angular-ui-router", "angular-messages", "common/services/auth.service", "common/directives/customEmailValidation/customEmailValidation", "common/directives/customPasswordValidation/customPasswordValidation"], function (_export, _context) {
  "use strict";

  var angular, authService, customEmailValidation, customPasswordValidation, signupCtrlModule, SignupCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularUiRouter) {}, function (_angularMessages) {}, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService.default;
    }, function (_commonDirectivesCustomEmailValidationCustomEmailValidation) {
      customEmailValidation = _commonDirectivesCustomEmailValidationCustomEmailValidation.default;
    }, function (_commonDirectivesCustomPasswordValidationCustomPasswordValidation) {
      customPasswordValidation = _commonDirectivesCustomPasswordValidationCustomPasswordValidation.default;
    }],
    execute: function () {
      signupCtrlModule = angular.module('signup.controller.js', ['ui.router', 'ngMessages', authService.name, customEmailValidation.name, customPasswordValidation.name]);

      SignupCtrl =
      /*#__PURE__*/
      function () {
        function SignupCtrl($state, $animate, Auth) {
          _classCallCheck(this, SignupCtrl);

          this.$state = $state;
          this.Auth = Auth;
          this.signupForm = {};
          this.user = {};
          this.user.email = '';
          this.user.password = '';
          this.errors = {};
        } // public methods


        _createClass(SignupCtrl, [{
          key: "signup",
          value: function signup() {
            var _this = this;

            if (this.signupForm.$valid && !this.signupForm.$submitted) {
              this.signupForm.$submitted = true;
              this.Auth.createUser({
                firstName: this.user.firstname,
                lastName: this.user.lastname,
                email: this.user.email,
                password: this.user.password
              }).then(function () {
                // Logged in, redirect to home
                _this.$state.go('content', null, {
                  reload: true
                });

                _this.signupForm.$submitted = false;
              }).catch(function (err) {
                _this.errors[err.data.code] = err.data;
                _this.signupForm.$submitted = false;
              });
            }
          }
        }]);

        return SignupCtrl;
      }();

      signupCtrlModule.controller('SignupCtrl', ['$state', '$animate', 'Auth', SignupCtrl]);

      _export("default", signupCtrlModule);
    }
  };
});
//# sourceMappingURL=signup.controller.js.map
