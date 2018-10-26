'use strict';

System.register(["angular", "lodash", "./boons.json!"], function (_export, _context) {
  "use strict";

  var angular, boons, BoonsSingleCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {}, function (_boonsJson) {
      boons = _boonsJson.default;
    }],
    execute: function () {
      BoonsSingleCtrl = // called once when the class is instantiated
      function BoonsSingleCtrl($scope, $sce, $state, Config, Link, name) {
        _classCallCheck(this, BoonsSingleCtrl);

        this.$scope = $scope;
        this.Config = Config;
        this.Link = Link;
        this.boons = boons;
        var regex = new RegExp("\\b".concat(name.toLowerCase().replace(/_/gi, ' ')), 'gi');

        var currentItemIndex = _.findIndex(boons, function (boon) {
          return boon.name.toLowerCase().match(regex) ? true : false;
        });

        this.boon = [boons[currentItemIndex]];
      };

      _export("default", BoonsSingleCtrl);
    }
  };
});
//# sourceMappingURL=boonsSingle.controller.js.map
