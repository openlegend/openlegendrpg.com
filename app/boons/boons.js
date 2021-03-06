'use strict';

System.register(["angular", "angular-material", "common/directives/mainwrap/mainwrap", "./boonsList.controller", "./boonsSingle.controller", "./boonsList.tpl", "./boonsSingle.tpl", "./boons.header.tpl", "./boons.css!", "common/services/link.service"], function (_export, _context) {
  "use strict";

  var angular, mainwrap, BoonsListCtrl, BoonsSingleCtrl, linkService, boonsModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap.default;
    }, function (_boonsListController) {
      BoonsListCtrl = _boonsListController.default;
    }, function (_boonsSingleController) {
      BoonsSingleCtrl = _boonsSingleController.default;
    }, function (_boonsListTpl) {}, function (_boonsSingleTpl) {}, function (_boonsHeaderTpl) {}, function (_boonsCss) {}, function (_commonServicesLinkService) {
      linkService = _commonServicesLinkService.default;
    }],
    execute: function () {
      boonsModule = angular.module('boons', [mainwrap.name, 'app/boons/boonsList.tpl.html', 'app/boons/boonsSingle.tpl.html', 'app/boons/boons.header.tpl.html', linkService]);
      boonsModule.filter('unsafe', ["$sce", function ($sce) {
        return $sce.trustAsHtml;
      }]);
      boonsModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('boons', {
          url: '/boons',
          templateUrl: 'app/boons/boonsList.tpl.html',
          controller: BoonsListCtrl,
          controllerAs: 'boonsCtrl',
          authenticate: false
        }).state('boonsSingle', {
          url: '/boons/:name',
          templateUrl: 'app/boons/boonsSingle.tpl.html',
          controller: BoonsSingleCtrl,
          controllerAs: 'boonsCtrl',
          authenticate: false,
          resolve: {
            name: ["$stateParams", function name($stateParams) {
              return $stateParams.name;
            }]
          }
        });
      }]);

      _export("default", boonsModule);
    }
  };
});
//# sourceMappingURL=boons.js.map
