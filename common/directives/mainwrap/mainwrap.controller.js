System.register([], function (_export) {
  var _classCallCheck, ContentCtrl;

  return {
    setters: [],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      ContentCtrl = function ContentCtrl($scope, $mdSidenav, Auth) {
        _classCallCheck(this, ContentCtrl);

        this.$mdSidenav = $mdSidenav;

        this.toggleSidenav = function (menuId) {
          this.$mdSidenav(menuId).toggle();
        };

        this.navIsOpen = function (menuId) {
          return this.$mdSidenav(menuId).isOpen();
        };

        this.Auth = Auth;

        this.profileSubnavOpen = false;
      }

      // non-constructor methods
      ;

      _export("default", ContentCtrl);
    }
  };
});
//# sourceMappingURL=../../../common/directives/mainwrap/mainwrap.controller.js.map