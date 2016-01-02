System.register(["angular", "lodash", "./banes.json!"], function (_export) {
  var angular, banes, _createClass, _classCallCheck, banesCtrlModule, BanesCtrl;

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_lodash) {}, function (_banesJson) {
      banes = _banesJson["default"];
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      banesCtrlModule = angular.module("banes.controller.js", []);

      banesCtrlModule.filter("unsafe", ["$sce", function ($sce) {
        return $sce.trustAsHtml;
      }]);

      BanesCtrl = (function () {

        // called once when the class is instantiated

        function BanesCtrl($scope, $http, $filter, $sce, URL) {
          _classCallCheck(this, BanesCtrl);

          this.$scope = $scope;
          this.URL = URL;
          this.powers = [];
          this.powers = banes;
          this.attackAttributes = ["All", "Agility", "Enchantment", "Entropy", "Might", "Energy", "Illusion", "Psychic", "Divination"];
          this.selectedPowers = [];
          this.selectedAttributes = ["All"];
          this.searchQuery = "";
          this.attackAttrSearchText = "";
          this.powerLevelValue = 0;
          this.powerAboveBelow = "or Greater";
        }

        _createClass(BanesCtrl, {
          updateSearchTextModel: {

            // public class methods

            value: function updateSearchTextModel(val) {
              this.attackAttrSearchText = val;
            }
          },
          attackAttrSearchFilter: {
            value: function attackAttrSearchFilter() {
              var _this = this;

              // return all the options if the user hasn't selected a filter
              var self = this;
              return (function (item, attackAttrSearchText) {
                if (_this.attackAttrSearchText === "") {
                  return true;
                } else {
                  return item.toLowerCase().match(_this.attackAttrSearchText.toLowerCase());
                }
              }).bind(this);
            }
          },
          textSearchFilter: {
            value: function textSearchFilter() {
              var _this = this;

              // if `searchQuery` is empty, we want to show all list items
              return function (thisPower) {
                // debugger;
                var item = thisPower;
                if (_this.searchQuery === "" && _.contains(_this.selectedAttributes, "All")) {
                  return true;
                }
                var regex = new RegExp(_this.searchQuery, "gi");
                var show = false; // initially we assume that we won't show a given result
                var inAttackFilter = true;
                // now we look for matches in the following object properties
                show = item.name.match(regex) || item.description.match(regex) || item.effect.match(regex);
                // if the selectedAttributes array is longer than 0, we need to show
                // only results that match one of the selected properties
                if (_this.selectedAttributes.length > 0) {
                  var inAttackFilter = false;
                  if (_this.selectedAttributes.indexOf("All") !== -1) {
                    inAttackFilter = true;
                  } else {
                    var searchAttrs = angular.copy(_.without(_this.selectedAttributes, "All"));
                    var inAttackFilter = _.intersection(item.attackAttributes, searchAttrs).length > 0;
                    // console.log( inAttackFilter );
                  }
                }
                // return the result (either `true` or `false`)
                return show && inAttackFilter;
              };
            }
          },
          powerLevelFilter: {
            value: function powerLevelFilter() {
              var _this = this;

              return function (thisPower) {
                var item = thisPower;
                var powerAbove = _this.powerAboveBelow === "or Greater";
                var include = false;
                for (var i = 0; i <= item.power.length; i++) {
                  if (powerAbove && item.power[i] > _this.powerLevelValue) {
                    include = true;
                    break;
                  } else if (!powerAbove && item.power[i] <= _this.powerLevelValue) {
                    include = true;
                    break;
                  }
                };
                return include;
              };
            }
          }
        });

        return BanesCtrl;
      })();

      banesCtrlModule.controller("BanesCtrl", ["$scope", "$http", "$filter", "$sce", "URL", BanesCtrl]);

      _export("default", banesCtrlModule);
    }
  };
});
//# sourceMappingURL=../../app/banes/banes.controller.js.map