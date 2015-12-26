System.register(["angular", "angular-resource", "common/services/url.service"], function (_export) {
  var angular, urlService, userModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularResource) {}, function (_commonServicesUrlService) {
      urlService = _commonServicesUrlService["default"];
    }],
    execute: function () {
      "use strict";

      userModule = angular.module("user.service.js", ["ngResource", urlService.name]);

      _export("userModule", userModule);

      userModule.service("User", ["$resource", "URL", function ($resource, URL) {
        return $resource(URL.apiBase + "/api/users/:id/:controller", {
          id: "@_id"
        }, {
          // changePassword: {
          //   method: 'PUT',
          //   params: {
          //     controller:'password'
          //   }
          // },
          get: {
            method: "GET",
            params: {
              id: "me"
            }
          },
          save: {
            method: "POST"
          }
        });
      }]);

      _export("default", userModule);
    }
  };
});
//# sourceMappingURL=../../common/services/user.service.js.map