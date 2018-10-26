/* global self */
'use strict';

System.register(["angular-material", "angular-ui-router", "./loginModal.tpl"], function (_export, _context) {
  "use strict";

  var loginModalDirectiveModule, LoginModalCtrl, LoginModalLaunchCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angularMaterial) {}, function (_angularUiRouter) {}, function (_loginModalTpl) {}],
    execute: function () {
      loginModalDirectiveModule = angular.module('loginModal.js', ['common/directives/loginModal/loginModal.tpl.html']);

      LoginModalCtrl =
      /*#__PURE__*/
      function () {
        function LoginModalCtrl($scope, $mdDialog) {
          _classCallCheck(this, LoginModalCtrl);

          this.self = self;
          this.$scope = $scope;
          this.$mdDialog = $mdDialog;
        }

        _createClass(LoginModalCtrl, [{
          key: "hide",
          value: function hide() {
            this.$mdDialog.hide();
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.$mdDialog.cancel();
          }
        }]);

        return LoginModalCtrl;
      }();

      LoginModalLaunchCtrl = function LoginModalLaunchCtrl($rootScope, $state, $mdDialog, AUTH_EVENTS) {
        _classCallCheck(this, LoginModalLaunchCtrl);

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$mdDialog = $mdDialog;

        this.showModal = function () {
          this.$mdDialog.show({
            controller: LoginModalCtrl,
            controllerAs: 'loginModalCtrl',
            templateUrl: 'common/directives/loginModal/loginModal.tpl.html',
            locals: {
              self: this // need to pass context to modal controller (out of `this` rootScope)

            },
            clickOutsideToClose: false
          });
        };

        this.hideModal = function () {
          $state.go($state.current, {}, {
            reload: true
          });
          this.$mdDialog.hide();
        }; // show the modal when we hear a `sessionTimeout` event


        this.$rootScope.$on(AUTH_EVENTS.sessionTimeout, function (event) {
          // only show the login modal if not on the login page
          if ($state.$current.name !== 'login') {
            event.currentScope.loginModalLaunchCtrl.showModal();
          }
        }); // hide the modal when we hear a `loginSuccess` event

        this.$rootScope.$on(AUTH_EVENTS.loginSuccess, function (event) {
          event.currentScope.loginModalLaunchCtrl.hideModal();
        });
      };

      loginModalDirectiveModule.directive('loginModal', function () {
        return {
          restrict: 'E',
          controller: LoginModalLaunchCtrl,
          controllerAs: 'loginModalLaunchCtrl'
        };
      });

      _export("default", loginModalDirectiveModule);
    }
  };
});
//# sourceMappingURL=loginModal.js.map
