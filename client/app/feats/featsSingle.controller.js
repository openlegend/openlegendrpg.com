System.register(["angular","lodash","./feats.json!"],function(_export){var angular,feats,_classCallCheck,FeatsSingleCtrl;return{setters:[function(_angular){angular=_angular["default"]},function(_lodash){},function(_featsJson){feats=_featsJson["default"]}],execute:function(){"use strict";_classCallCheck=function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")},FeatsSingleCtrl=function FeatsSingleCtrl($scope,$sce,$state,Config,Link,name){_classCallCheck(this,FeatsSingleCtrl),this.$scope=$scope,this.Config=Config,this.Link=Link,this.feats=feats;var regex=new RegExp(name.toLowerCase().replace(/_/gi," "),"gi"),currentFeatIndex=_.findIndex(feats,function(feat){return feat.name.toLowerCase().match(regex)?!0:!1});this.feat=[feats[currentFeatIndex]]},_export("default",FeatsSingleCtrl)}}});