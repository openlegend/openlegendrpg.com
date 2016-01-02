System.register(["angular", "common/services/url.service"], function (_export) {
  var angular, urlService, _createClass, _classCallCheck, homeCtrlModule, HomeCtrl;

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_commonServicesUrlService) {
      urlService = _commonServicesUrlService["default"];
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      homeCtrlModule = angular.module("home.controller.js", [urlService.name]);

      HomeCtrl = (function () {

        // called once when the class is instantiated

        function HomeCtrl($scope, URL) {
          _classCallCheck(this, HomeCtrl);

          this.$scope = $scope;
          this.URL = URL;
        }

        _createClass(HomeCtrl, {
          deleteThisFunction: {

            // public class methods

            value: function deleteThisFunction() {}
          }
        });

        return HomeCtrl;
      })();

      homeCtrlModule.controller("HomeCtrl", ["$scope", "URL", HomeCtrl]);

      _export("default", homeCtrlModule);
    }
  };
});

// does nothing
//# sourceMappingURL=../../app/home/home.controller.js.map