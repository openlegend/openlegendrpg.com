System.register(["angular", "angular-material", "./mainwrap.tpl", "./mainwrap.css!", "./mainwrap.controller", "common/services/auth.service", "app/config/config", "common/filters/fromNow.filter"], function (_export) {
  var angular, MainwrapCtrl, authService, configService, fromNowFilter, mainwrapModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMaterial) {}, function (_mainwrapTpl) {}, function (_mainwrapCss) {}, function (_mainwrapController) {
      MainwrapCtrl = _mainwrapController["default"];
    }, function (_commonServicesAuthService) {
      authService = _commonServicesAuthService["default"];
    }, function (_appConfigConfig) {
      configService = _appConfigConfig["default"];
    }, function (_commonFiltersFromNowFilter) {
      fromNowFilter = _commonFiltersFromNowFilter["default"];
    }],
    execute: function () {
      "use strict";

      ;

      mainwrapModule = angular.module("mainwrap.js", ["common/directives/mainwrap/mainwrap.tpl.html", authService.name, configService.name, fromNowFilter.name]);

      mainwrapModule.directive("mainWrap", function () {
        return {
          templateUrl: "common/directives/mainwrap/mainwrap.tpl.html",
          restrict: "EA",
          transclude: true,
          controller: MainwrapCtrl,
          controllerAs: "mainwrapCtrl",
          link: function link(scope, element, attrs, controller) {
            attrs.$observe("toolbarTemplate", function (value) {
              scope.toolbarTemplate = value;
            });
          } };
      });

      mainwrapModule.directive("extraToolbar", ["$http", "$templateCache", "$compile", function ($http, $templateCache, $compile) {
        return {
          transclude: true,
          controller: MainwrapCtrl,
          controllerAs: "mainwrapCtrl",
          link: function link(scope, element, attrs) {
            function loadTemplate(template) {
              $http.get(template, { cache: $templateCache }).success(function (templateContent) {
                element.replaceWith($compile(templateContent)(scope));
              });
            }

            scope.$watch(attrs.template, function (value) {
              if (value) {
                loadTemplate(value);
              }
            });

            if (attrs.template) {
              loadTemplate(attrs.template);
            }
          }
        };
      }]);

      _export("default", mainwrapModule);
    }
  };
});
//# sourceMappingURL=../../../common/directives/mainwrap/mainwrap.js.map