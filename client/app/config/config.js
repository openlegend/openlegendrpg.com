'use strict';

import angular from 'angular';

const configServiceModule = angular.module('config.service.js', []);

configServiceModule.factory('Config', function () {
    return {
      timestamp: 1451848570364
    };
  });

export default configServiceModule;
