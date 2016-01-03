System.register(["angular", "lodash", "./boons.json!"], function (_export) {
  var angular, boons, _createClass, _classCallCheck, boonsCtrlModule, BoonsCtrl;

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_lodash) {}, function (_boonsJson) {
      boons = _boonsJson["default"];
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      boonsCtrlModule = angular.module("boons.controller.js", []);

      boonsCtrlModule.filter("unsafe", ["$sce", function ($sce) {
        return $sce.trustAsHtml;
      }]);

      BoonsCtrl = (function () {

        // called once when the class is instantiated

        function BoonsCtrl($scope, $http, $filter, $sce, URL) {
          _classCallCheck(this, BoonsCtrl);

          this.$scope = $scope;
          this.URL = URL;
          this.powers = [];
          this.powers = boons;
          this.attributes = ["All", "Creation", "Entropy", "Divination", "Psychic", "Alteration", "Spirit", "Illusion", "Movement", "Abjuration", "Fortitude", "Energy"];
          this.selectedPowers = [];
          this.selectedAttributes = ["All"];
          this.searchQuery = "";
          this.attackAttrSearchText = "";
          this.powerLevelValue = 0;
          this.powerAboveBelow = "or Greater";
        }

        _createClass(BoonsCtrl, {
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
              return (function (item) {
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
                    var searchAttrs = angular.copy(_this.selectedAttributes);
                    var inAttackFilter = _.intersection(item.attribute, searchAttrs).length > 0;
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

        return BoonsCtrl;
      })();

      boonsCtrlModule.controller("BoonsCtrl", ["$scope", "URL", BoonsCtrl]);

      _export("default", boonsCtrlModule);
    }
  };
});
//# sourceMappingURL=../../app/feats/boons.controller.js.map