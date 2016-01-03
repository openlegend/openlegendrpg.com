System.register(["angular", "lodash", "./feats.json!"], function (_export) {
  var angular, feats, _createClass, _classCallCheck, featsCtrlModule, FeatsCtrl;

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_lodash) {}, function (_featsJson) {
      feats = _featsJson["default"];
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      featsCtrlModule = angular.module("feats.controller.js", []);

      featsCtrlModule.filter("unsafe", ["$sce", function ($sce) {
        return $sce.trustAsHtml;
      }]);

      FeatsCtrl = (function () {

        // called once when the class is instantiated

        function FeatsCtrl($scope, $http, $filter, $sce, URL) {
          _classCallCheck(this, FeatsCtrl);

          this.$scope = $scope;
          this.URL = URL;
          this.powers = [];
          this.powers = feats;
          this.attributes = ["All", "Creation", "Entropy", "Divination", "Psychic", "Alteration", "Spirit", "Illusion", "Movement", "Abjuration", "Fortitude", "Energy"];
          this.selectedPowers = [];
          this.selectedAttributes = ["All"];
          this.searchQuery = "";
          this.attackAttrSearchText = "";
          this.powerLevelValue = 0;
          this.powerAboveBelow = "or Greater";
        }

        _createClass(FeatsCtrl, {
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

            // @TODO - come up with place to store numeric values for filtering list
            // powerLevelFilter () {
            //   return (thisPower) => {
            //     var item = thisPower;
            //     const powerAbove = ( this.powerAboveBelow === 'or Greater' );
            //     var include = false;
            //     for (var i = 0; i <= item.power.length; i++) {
            //       if ( powerAbove && item.power[i] > this.powerLevelValue ) {
            //         include = true;
            //         break;
            //       } else if ( !powerAbove && item.power[i] <= this.powerLevelValue ) {
            //         include = true;
            //         break;
            //       }
            //     };
            //     return include;
            //   }
            // }

          }
        });

        return FeatsCtrl;
      })();

      featsCtrlModule.controller("FeatsCtrl", ["$scope", "URL", FeatsCtrl]);

      _export("default", featsCtrlModule);
    }
  };
});
//# sourceMappingURL=../../app/feats/feats.controller.js.map