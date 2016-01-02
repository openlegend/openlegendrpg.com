System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("common/directives/mainwrap/mainwrap.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("common/directives/mainwrap/mainwrap.tpl.html", "<md-toolbar class=\"main md-accent\" md-scroll-shrink=\"\"><div class=\"md-toolbar-tools\"><md-button class=\"md-icon-button menu-left\" ng-click=\"mainwrapCtrl.toggleSidenav('left')\" aria-label=\"Show Menu\"><md-icon class=\"md-primary-icon\" md-svg-icon=\"_menu\" alt=\"Menu\"></md-icon></md-button><h1>Open Legend</h1><md-button ng-if=\"mainwrapCtrl.Auth.isLoggedIn()\" ng-click=\"mainwrapCtrl.toggleSidenav('left')\" class=\"menu-right\" aria-label=\"Show Menu\"><md-icon class=\"md-primary-icon\" md-svg-icon=\"account-circle\" alt=\"My Account\"></md-icon><span hide=\"\" show-gt-md=\"\">{{ mainwrapCtrl.Auth.getCurrentUser().firstName }} {{ mainwrapCtrl.Auth.getCurrentUser().lastName }}</span></md-button></div></md-toolbar><md-toolbar ng-if=\"toolbarTemplate\" class=\"md-accent\" md-scroll-shrink=\"\"><extra-toolbar template=\"{{ toolbarTemplate }}\"></extra-toolbar></md-toolbar><md-sidenav md-theme=\"dark\" ng-class=\"{'menu-open':mainwrapCtrl.navIsOpen('left')}\" class=\"main-sidenav md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\"><md-content><md-list class=\"button-list\"><md-item layout=\"row\" ui-sref=\"banes\"><md-button><span><md-icon size=\"lg\" md-svg-icon=\"lightning\" alt=\"Bane Icon\"></md-icon>&nbsp;Banes</span></md-button></md-item><md-item layout=\"row\" ui-sref=\"boons\"><md-button><span><md-icon size=\"lg\" md-svg-icon=\"account-level-up\" alt=\"Boon Icon\"></md-icon>&nbsp;Boons</span></md-button></md-item></md-list></md-content></md-sidenav><md-content layout=\"row\" flex=\"\" ng-if=\"!mainwrapCtrl.Auth.isWaitingForInitialAuth()\"><div ng-transclude=\"\" layout=\"column\" flex=\"\" layout-fill=\"\"></div></md-content><md-sidenav ng-class=\"{'menu-open':mainwrapCtrl.navIsOpen('right')}\" class=\"main-sidenav md-sidenav-right md-whiteframe-z2\" md-component-id=\"right\"></md-sidenav>");
      }]);
    }
  };
});