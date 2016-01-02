System.register(["angular"], function (_export) {
  var angular, authInterceptorModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      authInterceptorModule = angular.module("authInterceptor.service.js", []);

      authInterceptorModule.factory("authInterceptor", ["$rootScope", "$q", "$cookieStore", function ($rootScope, $q, $cookieStore) {
        return {
          // Add authorization token to headers
          request: function request(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get("token")) {
              config.headers.Authorization = "Bearer " + $cookieStore.get("token");
            }
            return config;
          },

          // Intercept 401s and redirect you to login
          responseError: function responseError(response) {
            if (response.status === 401) {
              // remove any stale tokens
              $cookieStore.remove("token");
              return $q.reject(response);
            } else {
              return $q.reject(response);
            }
          }
        };
      }]);

      authInterceptorModule.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("authInterceptor");
      }]);

      _export("default", authInterceptorModule);
    }
  };
});
//# sourceMappingURL=../../common/services/authInterceptor.service.js.map