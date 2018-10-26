'use strict';

System.register(["angular", "angular-resource", "config/config"], function (_export, _context) {
  "use strict";

  var angular, configService, userModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularResource) {}, function (_configConfig) {
      configService = _configConfig.default;
    }],
    execute: function () {
      _export("userModule", userModule = angular.module('user.service.js', ['ngResource', configService.name]));

      userModule.service('User', ["$resource", "Config", function ($resource, Config) {
        return $resource(Config.urlBase + '/api/users/:id/:controller', {
          id: '@_id'
        }, {
          // changePassword: {
          //   method: 'PUT',
          //   params: {
          //     controller:'password'
          //   }
          // },
          get: {
            method: 'GET',
            params: {
              id: 'me'
            }
          },
          save: {
            method: 'POST'
          }
        });
      }]);

      _export("default", userModule);
    }
  };
});
//# sourceMappingURL=user.service.js.map
