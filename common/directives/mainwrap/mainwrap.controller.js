'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var MainwrapCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      _export("default", MainwrapCtrl =
      /*#__PURE__*/
      function () {
        function MainwrapCtrl($scope, $timeout, $state, $mdMedia, $mdSidenav, $sce, Auth, Config) {
          _classCallCheck(this, MainwrapCtrl);

          this.$scope = $scope;
          this.$state = $state;
          this.$timeout = $timeout;
          this.$mdMedia = $mdMedia;
          this.$mdSidenav = $mdSidenav;

          if ($state.current.name === 'core') {
            this.$scope.chapterListExpanded = true;
          }

          this.Auth = Auth;
          this.Config = Config;
          this.Date = Date;
          this.profileSubnavOpen = false;
          $timeout(function () {
            if (_.has(window, 'twttr')) twttr.widgets.load();
          });
        }

        _createClass(MainwrapCtrl, [{
          key: "toggleSidenav",
          value: function toggleSidenav(menuId) {
            this.$mdSidenav(menuId).toggle();
          }
        }, {
          key: "navIsOpen",
          value: function navIsOpen(menuId) {
            return this.$mdSidenav(menuId).isOpen();
          }
        }]);

        return MainwrapCtrl;
      }());
    }
  };
});
//# sourceMappingURL=mainwrap.controller.js.map
