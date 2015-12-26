System.register(["angular"], function (_export) {
  var angular, authBroadcastModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      authBroadcastModule = angular.module("authBroadcast.service.js", []);

      // auth events that we catch and use to broadcast user access control
      authBroadcastModule.constant("AUTH_EVENTS", {
        loginSuccess: "login.success",
        loginFailed: "login.failed",
        sessionTimeout: "auth.session.timeout",
        // notAuthenticated: 'auth.notauthenticated',
        // notAuthorized: 'auth.notauthorized',
        serverError: "auth.serverError"
      });

      authBroadcastModule.factory("authBroadcast", ["$rootScope", "$q", "AUTH_EVENTS", function ($rootScope, $q, AUTH_EVENTS) {
        return {
          response: function response(res) {
            if (!_.isEmpty(res.data.token) && res.status === 200) {
              $rootScope.$broadcast(({
                200: AUTH_EVENTS.loginSuccess
              })[res.status], res);
            }

            return res;
          },
          responseError: function responseError(res) {
            // if the response has a status code and a res.data.code key, then it might
            // be one of the following array we want to broadcast
            if (res.status && res.data.code) {
              $rootScope.$broadcast(({
                "authentication.failed": AUTH_EVENTS.loginFailed,
                "authentication.invalid": AUTH_EVENTS.sessionTimeout })[res.data.code], res);
            } else if (res.status === 500) {
              $rootScope.$broadcast(AUTH_EVENTS.serverError, res);
            }

            return $q.reject(res);
          }
        };
      }]);

      authBroadcastModule.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("authBroadcast");
      }]);

      _export("default", authBroadcastModule);
    }
  };
});
//# sourceMappingURL=../../common/services/authBroadcast.service.js.map