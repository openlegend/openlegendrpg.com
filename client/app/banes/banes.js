System.register(["angular","angular-material","common/directives/mainwrap/mainwrap","./banesList.controller","./banesSingle.controller","./banesList.tpl","./banesSingle.tpl","./banes.header.tpl","./banes.css!","common/services/link.service"],function(_export){var angular,mainwrap,BanesListCtrl,BanesSingleCtrl,linkService,banesModule;return{setters:[function(_angular){angular=_angular["default"]},function(_angularMaterial){},function(_commonDirectivesMainwrapMainwrap){mainwrap=_commonDirectivesMainwrapMainwrap["default"]},function(_banesListController){BanesListCtrl=_banesListController["default"]},function(_banesSingleController){BanesSingleCtrl=_banesSingleController["default"]},function(_banesListTpl){},function(_banesSingleTpl){},function(_banesHeaderTpl){},function(_banesCss){},function(_commonServicesLinkService){linkService=_commonServicesLinkService["default"]}],execute:function(){"use strict";banesModule=angular.module("banes",[mainwrap,"app/banes/banesList.tpl.html","app/banes/banesSingle.tpl.html","app/banes/banes.header.tpl.html",linkService]),banesModule.filter("unsafe",["$sce",function($sce){return $sce.trustAsHtml}]),banesModule.config(["$stateProvider",function($stateProvider){$stateProvider.state("banes",{url:"/banes",templateUrl:"app/banes/banesList.tpl.html",controller:BanesListCtrl,controllerAs:"banesCtrl",authenticate:!1}).state("banesSingle",{url:"/banes/:name",templateUrl:"app/banes/banesSingle.tpl.html",controller:BanesSingleCtrl,controllerAs:"banesCtrl",authenticate:!1,resolve:{name:["$stateParams",function($stateParams){return $stateParams.name}]}})}]),_export("default",banesModule)}}});