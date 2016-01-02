System.register(["angular", "angular-ui-router", "angular-messages", "common/services/auth.service", "common/directives/customEmailValidation/customEmailValidation", "common/directives/customPasswordValidation/customPasswordValidation"], function (_export) {
  var angular, authService, customEmailValidation, customPasswordValidation, _createClass, _classCallCheck, signupCtrlModule, SignupCtrl;

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularUiRouter) {}, function (_angularMessages) {}, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService["default"];
    }, function (_commonDirectivesCustomEmailValidationCustomEmailValidation) {
      customEmailValidation = _commonDirectivesCustomEmailValidationCustomEmailValidation["default"];
    }, function (_commonDirectivesCustomPasswordValidationCustomPasswordValidation) {
      customPasswordValidation = _commonDirectivesCustomPasswordValidationCustomPasswordValidation["default"];
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      signupCtrlModule = angular.module("signup.controller.js", ["ui.router", "ngMessages", authService.name, customEmailValidation.name, customPasswordValidation.name]);

      SignupCtrl = (function () {
        function SignupCtrl($state, $animate, Auth) {
          _classCallCheck(this, SignupCtrl);

          this.$state = $state;

          this.Auth = Auth;

          this.signupForm = {};
          this.user = {};
          this.user.email = "";
          this.user.password = "";
          this.errors = {};
        }

        _createClass(SignupCtrl, {
          signup: {
            // public methods

            value: function signup() {
              var _this = this;

              if (this.signupForm.$valid && !this.signupForm.$submitted) {

                this.signupForm.$submitted = true;

                this.Auth.createUser({
                  firstName: this.user.firstname,
                  lastName: this.user.lastname,
                  email: this.user.email,
                  password: this.user.password }).then(function () {
                  // Logged in, redirect to home
                  _this.$state.go("content", null, { reload: true });
                  _this.signupForm.$submitted = false;
                })["catch"](function (err) {
                  _this.errors[err.data.code] = err.data;
                  _this.signupForm.$submitted = false;
                });
              }
            }
          }
        });

        return SignupCtrl;
      })();

      signupCtrlModule.controller("SignupCtrl", ["$state", "$animate", "Auth", SignupCtrl]);

      _export("default", signupCtrlModule);
    }
  };
});
//# sourceMappingURL=../../app/signup/signup.controller.js.map