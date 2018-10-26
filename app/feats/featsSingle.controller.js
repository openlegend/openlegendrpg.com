'use strict';

System.register(["angular", "lodash", "./feats.json!", "./featPrereqOutput"], function (_export, _context) {
  "use strict";

  var angular, feats, featPrereqOutput, FeatsSingleCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {}, function (_featsJson) {
      feats = _featsJson.default;
    }, function (_featPrereqOutput) {
      featPrereqOutput = _featPrereqOutput.default;
    }],
    execute: function () {
      FeatsSingleCtrl = // called once when the class is instantiated
      function FeatsSingleCtrl($scope, $sce, $state, Config, Link, name) {
        _classCallCheck(this, FeatsSingleCtrl);

        this.$scope = $scope;
        this.Config = Config;
        this.Link = Link;
        this.featPrereqOutput = featPrereqOutput;
        this.feats = feats;
        var regex = new RegExp("\\b".concat(name.toLowerCase().replace(/_/gi, ' ')), 'gi');

        var currentFeatIndex = _.findIndex(feats, function (feat) {
          return feat.name.toLowerCase().match(regex) ? true : false;
        });

        this.feat = [feats[currentFeatIndex]];
      };

      _export("default", FeatsSingleCtrl);
    }
  };
});
//# sourceMappingURL=featsSingle.controller.js.map
