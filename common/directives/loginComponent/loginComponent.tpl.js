"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('common/directives/loginComponent/loginComponent.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('common/directives/loginComponent/loginComponent.tpl.html', '<md-progress-linear class="login-progress" ng-if="loginComponentCtrl.submitted" md-mode="indeterminate"></md-progress-linear><h1 class="md-headline login-headline" layout="row" layout-sm="column" layout-align="center center">Login</h1><form class="center-full" name="loginComponentCtrl.loginForm" ng-submit="loginComponentCtrl.login()"><section layout="column" layout-align="center center"><div><md-input-container><label>Email</label> <input type="email" required="" name="loginFormEmail" ng-model="loginComponentCtrl.user.email"><div ng-messages="loginComponentCtrl.loginForm.loginFormEmail.$touched && loginComponentCtrl.loginForm.loginFormEmail.$error"><div ng-message="email">Not a valid email address</div><div ng-message="required">Required</div></div></md-input-container></div><div><md-input-container><label>Password</label> <input type="password" minlength="8" required="" name="loginFormPassword" ng-model="loginComponentCtrl.user.password"><div ng-messages="loginComponentCtrl.loginForm.loginFormPassword.$touched && loginComponentCtrl.loginForm.loginFormPassword.$error"><div ng-message="required">Required</div><div ng-message="minlength">At least 8 characters</div></div></md-input-container></div></section><section layout="column" layout-align="center center"><div><md-input-container class="no-form-message txt-center"><div ng-messages="loginComponentCtrl.errors"><div class="md-warn" layout-fill="" ng-message="authentication.failed">Wrong username or password</div></div></md-input-container></div></section><section layout="column" layout-sm="column" layout-align="center center"><md-button type="submit" ng-disabled="!loginComponentCtrl.loginForm.$valid || loginComponentCtrl.submitted" ng-click="loginComponentCtrl.login()" class="md-primary md-raised">Login</md-button><md-button ui-sref="signup" class="md-theme-default">Sign up</md-button></section></form>');
      }]);
    }
  };
});