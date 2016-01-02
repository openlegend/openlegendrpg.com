System.register(["angular", "angular-ui-router", "angular-messages", "common/services/auth.service"], function (_export) {
  var angular, authService, _createClass, _classCallCheck, loginComponentControllerModule, LoginComponentCtrl;

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularUiRouter) {}, function (_angularMessages) {}, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService["default"];
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      loginComponentControllerModule = angular.module("loginComponent.controller.js", [authService.name, "ui.router", "ngMessages"]);

      LoginComponentCtrl = (function () {
        function LoginComponentCtrl($state, $animate, Auth) {
          _classCallCheck(this, LoginComponentCtrl);

          this.$state = $state;

          this.Auth = Auth;

          this.loginForm = {};
          this.user = {};
          this.user.email = "";
          this.user.password = "";
          this.errors = {};
        }

        _createClass(LoginComponentCtrl, {
          login: {
            // public methods

            value: function login() {
              var _this = this;

              if (this.loginForm.$valid && !this.loginForm.$submitted) {

                this.loginForm.$submitted = true;

                this.Auth.login({
                  username: this.user.email,
                  password: this.user.password
                }).then(function () {
                  // Logged in, redirect to home
                  _this.$state.go("content", null, { reload: true });
                  if (_this.loginForm) {
                    _this.loginForm.$submitted = false;
                  }
                })["catch"](function (err) {
                  if (err && err.code) {
                    _this.errors[err.code] = err;
                  }
                  if (_this.loginForm) {
                    _this.loginForm.$submitted = false;
                  }
                });
              }
            }
          }
        });

        return LoginComponentCtrl;
      })();

      loginComponentControllerModule.controller("LoginComponentCtrl", ["$state", "$animate", "Auth", LoginComponentCtrl]);

      _export("default", loginComponentControllerModule);
    }
  };
});
//# sourceMappingURL=../../../common/directives/loginComponent/loginComponent.controller.js.map