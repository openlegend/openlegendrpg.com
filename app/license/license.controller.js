'use strict';

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular, LicenseCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      LicenseCtrl =
      /*#__PURE__*/
      function () {
        // called once when the class is instantiated
        function LicenseCtrl($scope, $mdMedia, Config) {
          _classCallCheck(this, LicenseCtrl);

          this.$scope = $scope;
          this.$mdMedia = $mdMedia;
          this.Config = Config;
        } // public class methods


        _createClass(LicenseCtrl, [{
          key: "deleteThisFunction",
          value: function deleteThisFunction() {// does nothing
          }
        }]);

        return LicenseCtrl;
      }();

      _export("default", LicenseCtrl);
    }
  };
});
//# sourceMappingURL=license.controller.js.map
