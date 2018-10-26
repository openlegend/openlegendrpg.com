'use strict';

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular, CoreCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      CoreCtrl =
      /*#__PURE__*/
      function () {
        // called once when the class is instantiated
        function CoreCtrl($scope, $mdMedia, $stateParams, Config, chapter) {
          _classCallCheck(this, CoreCtrl);

          this.$scope = $scope;
          this.$scope.chapter = chapter;
          this.$mdMedia = $mdMedia;
          this.Config = Config;
          this.$scope.sections = ['00-introduction', '01-character-creation', '02-actions-attributes', '03-banes-boons', '04-feats', '05-perks-flaws', '06-wealth-equipment', '07-combat', '08-running-the-game', '09-special-equipment'];
        }

        _createClass(CoreCtrl, [{
          key: "getChapterIndex",
          value: function getChapterIndex(chapter) {
            return this.$scope.sections.indexOf(chapter);
          }
        }]);

        return CoreCtrl;
      }();

      _export("default", CoreCtrl);
    }
  };
});
//# sourceMappingURL=core.controller.js.map
