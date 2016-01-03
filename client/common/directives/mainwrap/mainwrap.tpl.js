System.register(["angular"],function(_export){var angular;return{setters:[function(_angular){angular=_angular["default"]}],execute:function(){"use strict";angular.module("common/directives/mainwrap/mainwrap.tpl.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("common/directives/mainwrap/mainwrap.tpl.html",'<div flex="" layout="column"><md-toolbar class="main md-accent" ng-if="mainwrapCtrl.$mdMedia(\'lt-lg\')" md-scroll-shrink=""><div class="md-toolbar-tools"><md-button class="md-icon-button menu-left" ng-click="mainwrapCtrl.toggleSidenav(\'left\')" aria-label="Show Menu"><md-icon class="md-primary-icon" md-svg-icon="_menu" alt="Menu"></md-icon></md-button><h1>Open Legend</h1><md-button ng-if="mainwrapCtrl.Auth.isLoggedIn()" ng-click="mainwrapCtrl.toggleSidenav(\'left\')" class="menu-right" aria-label="Show Menu"><md-icon class="md-primary-icon" md-svg-icon="account-circle" alt="My Account"></md-icon><span hide="" show-gt-md="">{{ mainwrapCtrl.Auth.getCurrentUser().firstName }} {{ mainwrapCtrl.Auth.getCurrentUser().lastName }}</span></md-button></div></md-toolbar><md-toolbar ng-if="toolbarTemplate && mainwrapCtrl.$mdMedia(\'lt-lg\')" class="md-accent" md-scroll-shrink=""><br hide-lt-md=""><extra-toolbar template="{{ toolbarTemplate }}"></extra-toolbar></md-toolbar><section layout="row" flex=""><md-sidenav md-theme="dark" ng-class="{\'menu-open\':mainwrapCtrl.navIsOpen(\'left\')}" class="main-sidenav md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="mainwrapCtrl.$mdMedia(\'gt-md\')" flex="" layout="column" layout-align="start"><md-content><h1 ng-if="mainwrapCtrl.$state.current.name !== \'home\'" ng-click="mainwrapCtrl.$state.go(\'home\')" class="banner-logo clickable">Open Legend | Open-source Role-playing Game <img src="/assets/img/open_legend_lg_logo.png" alt="Open Legend Logo"></h1><md-list class="button-list"><md-item layout="row" ui-sref="home"><md-button><span><md-icon size="lg" md-svg-icon="home" alt="Home Icon"></md-icon>&nbsp;Home</span></md-button></md-item><md-item layout="row" ui-sref="banes"><md-button><span><md-icon size="lg" md-svg-icon="lightning" alt="Bane Icon"></md-icon>&nbsp;Banes</span></md-button></md-item><md-item layout="row" ui-sref="boons"><md-button><span><md-icon size="lg" md-svg-icon="account-level-up" alt="Boon Icon"></md-icon>&nbsp;Boons</span></md-button></md-item><md-item layout="row" ui-sref="feats"><md-button><span><md-icon size="lg" md-svg-icon="trending-up" alt="Feats Icon"></md-icon>&nbsp;Feats</span></md-button></md-item></md-list></md-content><md-content class="copyright" layout-padding="md" layout="column" layout-align="start"><small>Copyright &copy; {{ mainwrapCtrl.Date.now() | fromNow:false:\'YYYY\' }} Open Legend RPG | Rules Content of Open Legend is licensed under <a ng-href="http://creativecommons.org/licenses/by/3.0/us/" target="_blank">Creative Commons CC-BY</a>, Enjoy! Artwork by <a href="http://saryth.deviantart.com/gallery/" target="_blank">Saryth</a><br>Last updated: <strong>{{ mainwrapCtrl.Config.timestamp | fromNow:false:\'MMM Do YYYY, h:mm a\' }}</strong></small></md-content></md-sidenav><md-content layout="column" flex="" ng-if="!mainwrapCtrl.Auth.isWaitingForInitialAuth()"><md-toolbar hide-xs="" hide-sm="" hide-md="" show-gt-md="" ng-if="toolbarTemplate" class="md-accent" md-scroll-shrink=""><br hide-lt-md=""><extra-toolbar template="{{ toolbarTemplate }}"></extra-toolbar></md-toolbar><div ng-transclude="" layout="column" flex="" layout-fill=""></div></md-content><md-sidenav ng-class="{\'menu-open\':mainwrapCtrl.navIsOpen(\'right\')}" class="md-sidenav-right md-whiteframe-z2" md-component-id="right"></md-sidenav></section></div>')}])}}});