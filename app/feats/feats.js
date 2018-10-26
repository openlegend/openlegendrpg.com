'use strict';

System.register(["angular", "angular-material", "common/directives/mainwrap/mainwrap", "common/directives/compile.directive", "./featsList.controller", "./featsSingle.controller", "./featsList.tpl", "./featsSingle.tpl", "./feats.header.tpl", "./feats.css!", "./feats.json!", "common/services/link.service"], function (_export, _context) {
  "use strict";

  var angular, mainwrap, compileDirective, FeatsListCtrl, FeatsSingleCtrl, feats, linkService, featsModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap.default;
    }, function (_commonDirectivesCompileDirective) {
      compileDirective = _commonDirectivesCompileDirective.default;
    }, function (_featsListController) {
      FeatsListCtrl = _featsListController.default;
    }, function (_featsSingleController) {
      FeatsSingleCtrl = _featsSingleController.default;
    }, function (_featsListTpl) {}, function (_featsSingleTpl) {}, function (_featsHeaderTpl) {}, function (_featsCss) {}, function (_featsJson) {
      feats = _featsJson.default;
    }, function (_commonServicesLinkService) {
      linkService = _commonServicesLinkService.default;
    }],
    execute: function () {
      featsModule = angular.module('feats', [mainwrap, compileDirective, 'app/feats/featsList.tpl.html', 'app/feats/featsSingle.tpl.html', 'app/feats/feats.header.tpl.html', linkService]);
      featsModule.filter('unsafe', ["$sce", function ($sce) {
        return $sce.trustAsHtml;
      }]);
      featsModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('feats', {
          url: '/feats',
          templateUrl: 'app/feats/featsList.tpl.html',
          controller: FeatsListCtrl,
          controllerAs: 'featsCtrl',
          authenticate: false
        }).state('featsSingle', {
          url: '/feats/:name',
          templateUrl: 'app/feats/featsSingle.tpl.html',
          controller: FeatsSingleCtrl,
          controllerAs: 'featsCtrl',
          authenticate: false,
          resolve: {
            name: ["$stateParams", function name($stateParams) {
              return $stateParams.name;
            }]
          }
        });
      }]);

      _export("default", featsModule);
    }
  };
});
//# sourceMappingURL=feats.js.map
