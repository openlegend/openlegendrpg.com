System.register(["angular-material", "angular-ui-router", "./loginModal.tpl"], function (_export) {
  var _createClass, _classCallCheck, loginModalDirectiveModule, LoginModalCtrl, LoginModalLaunchCtrl;

  return {
    setters: [function (_angularMaterial) {}, function (_angularUiRouter) {}, function (_loginModalTpl) {}],
    execute: function () {
      /* global self */

      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      loginModalDirectiveModule = angular.module("loginModal.js", ["common/directives/loginModal/loginModal.tpl.html"]);

      LoginModalCtrl = (function () {
        function LoginModalCtrl($scope, $mdDialog) {
          _classCallCheck(this, LoginModalCtrl);

          this.self = self;
          this.$scope = $scope;
          this.$mdDialog = $mdDialog;
        }

        _createClass(LoginModalCtrl, {
          hide: {
            value: function hide() {
              this.$mdDialog.hide();
            }
          },
          cancel: {
            value: function cancel() {
              this.$mdDialog.cancel();
            }
          }
        });

        return LoginModalCtrl;
      })();

      LoginModalLaunchCtrl = function LoginModalLaunchCtrl($rootScope, $state, $mdDialog, AUTH_EVENTS) {
        _classCallCheck(this, LoginModalLaunchCtrl);

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$mdDialog = $mdDialog;

        this.showModal = function () {
          this.$mdDialog.show({
            controller: LoginModalCtrl,
            controllerAs: "loginModalCtrl",
            templateUrl: "common/directives/loginModal/loginModal.tpl.html",
            locals: {
              self: this // need to pass context to modal controller (out of `this` rootScope)
            },
            clickOutsideToClose: false
          });
        };

        this.hideModal = function () {
          $state.go($state.current, {}, { reload: true });
          this.$mdDialog.hide();
        };

        // show the modal when we hear a `sessionTimeout` event
        this.$rootScope.$on(AUTH_EVENTS.sessionTimeout, function (event) {
          // only show the login modal if not on the login page
          if ($state.$current.name !== "login") {
            event.currentScope.loginModalLaunchCtrl.showModal();
          }
        });

        // hide the modal when we hear a `loginSuccess` event
        this.$rootScope.$on(AUTH_EVENTS.loginSuccess, function (event) {
          event.currentScope.loginModalLaunchCtrl.hideModal();
        });
      };

      loginModalDirectiveModule.directive("loginModal", function () {
        return {
          restrict: "E",
          controller: LoginModalLaunchCtrl,
          controllerAs: "loginModalLaunchCtrl"
        };
      });

      _export("default", loginModalDirectiveModule);
    }
  };
});
//# sourceMappingURL=../../../common/directives/loginModal/loginModal.js.map