'use strict';

System.register(["angular", "angular-ui-router", "angular-messages", "common/services/auth.service"], function (_export, _context) {
  "use strict";

  var angular, authService, loginComponentControllerModule, LoginComponentCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularUiRouter) {}, function (_angularMessages) {}, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService.default;
    }],
    execute: function () {
      loginComponentControllerModule = angular.module('loginComponent.controller.js', [authService.name, 'ui.router', 'ngMessages']);

      LoginComponentCtrl =
      /*#__PURE__*/
      function () {
        function LoginComponentCtrl($state, $animate, Auth) {
          _classCallCheck(this, LoginComponentCtrl);

          this.$state = $state;
          this.Auth = Auth;
          this.loginForm = {};
          this.user = {};
          this.user.email = '';
          this.user.password = '';
          this.errors = {};
        } // public methods


        _createClass(LoginComponentCtrl, [{
          key: "login",
          value: function login() {
            var _this = this;

            if (this.loginForm.$valid && !this.loginForm.$submitted) {
              this.loginForm.$submitted = true;
              this.Auth.login({
                username: this.user.email,
                password: this.user.password
              }).then(function () {
                // Logged in, redirect to home
                _this.$state.go('content', null, {
                  reload: true
                });

                if (_this.loginForm) {
                  _this.loginForm.$submitted = false;
                }
              }).catch(function (err) {
                if (err && err.code) {
                  _this.errors[err.code] = err;
                }

                if (_this.loginForm) {
                  _this.loginForm.$submitted = false;
                }
              });
            }
          }
        }]);

        return LoginComponentCtrl;
      }();

      loginComponentControllerModule.controller('LoginComponentCtrl', ['$state', '$animate', 'Auth', LoginComponentCtrl]);

      _export("default", loginComponentControllerModule);
    }
  };
});
//# sourceMappingURL=loginComponent.controller.js.map
