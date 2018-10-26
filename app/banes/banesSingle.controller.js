'use strict';

System.register(["angular", "lodash", "./banes.json!"], function (_export, _context) {
  "use strict";

  var angular, banes, BanesSingleCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {}, function (_banesJson) {
      banes = _banesJson.default;
    }],
    execute: function () {
      BanesSingleCtrl = // called once when the class is instantiated
      function BanesSingleCtrl($scope, $sce, $state, Config, Link, name) {
        _classCallCheck(this, BanesSingleCtrl);

        this.$scope = $scope;
        this.Config = Config;
        this.Link = Link;
        this.banes = banes;
        var regex = new RegExp("\\b".concat(name.toLowerCase().replace(/_/gi, ' ')), 'gi');

        var currentItemIndex = _.findIndex(banes, function (bane) {
          return bane.name.toLowerCase().match(regex) ? true : false;
        });

        this.bane = [banes[currentItemIndex]];
      };

      _export("default", BanesSingleCtrl);
    }
  };
});
//# sourceMappingURL=banesSingle.controller.js.map
