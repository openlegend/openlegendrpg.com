'use strict';

System.register(["angular", "lodash", "./feats.json!", "./featPrereqOutput"], function (_export, _context) {
  "use strict";

  var angular, feats, featPrereqOutput, FeatsListCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {}, function (_featsJson) {
      feats = _featsJson.default;
    }, function (_featPrereqOutput) {
      featPrereqOutput = _featPrereqOutput.default;
    }],
    execute: function () {
      FeatsListCtrl =
      /*#__PURE__*/
      function () {
        // called once when the class is instantiated
        function FeatsListCtrl($scope, $sce, $state, $mdMedia, Config, Link) {
          _classCallCheck(this, FeatsListCtrl);

          this.$scope = $scope;
          this.$scope.$mdMedia = $mdMedia;
          this.Config = Config;
          this.Link = Link;
          this.featPrereqOutput = featPrereqOutput;
          this.powers = [];
          this.powers = feats;
          this.attributes = ['All', 'Alteration', 'Creation', 'Fortitude', 'Energy', 'Entropy', 'Movement', 'Influence', 'Prescience', 'Protection'];
          this.selectedPowers = [];
          this.selectedAttributes = ['All'];
          this.searchQuery = '';
          this.attackAttrSearchText = '';
          this.powerLevelValue = 1; // this.powerComparator = 'or Greater';

          this.powerComparator = 'gte';
        } // public class methods


        _createClass(FeatsListCtrl, [{
          key: "updateSearchTextModel",
          value: function updateSearchTextModel(val) {
            this.attackAttrSearchText = val;
          }
        }, {
          key: "attackAttrSearchFilter",
          value: function attackAttrSearchFilter() {
            var _this = this;

            // return all the options if the user hasn't selected a filter
            return function (item) {
              return true; // @TODO - Make this work!

              if (_this.attackAttrSearchText === '') {
                return true;
              } else {
                if (!Array.isArray(item.prerequisite)) return false;
                var prereqsAsString = item.prerequisite.join().toLowerCase();
                var matchedSelectWithPrereq = [];

                _this.selectedAttributes.forEach(function (attr) {
                  if (prereqsAsString.split(attr).length > 1) {
                    matchedSelectWithPrereq.push(attr);
                  }
                });

                return matchedSelectWithPrereq.length > 0;
              }
            }; // .bind(this);
          }
        }, {
          key: "textSearchFilter",
          value: function textSearchFilter() {
            var _this2 = this;

            // if `searchQuery` is empty, we want to show all list items
            return function (thisPower) {
              // debugger;
              var item = thisPower;

              if (_this2.searchQuery === '' && _.includes(_this2.selectedAttributes, 'All')) {
                return true;
              }

              var regex = new RegExp(_this2.searchQuery, 'gi');
              var show = false; // initially we assume that we won't show a given result

              var inAttackFilter = true; // now we look for matches in the following object properties

              show = item.name.match(regex) || item.description.match(regex) || item.effect.match(regex); // if the selectedAttributes array is longer than 0, we need to show
              // only results that match one of the selected properties

              if (_this2.selectedAttributes.length > 0) {
                var inAttackFilter = false;

                if (_this2.selectedAttributes.indexOf('All') !== -1) {
                  inAttackFilter = true;
                } else {
                  var searchAttrs = angular.copy(_this2.selectedAttributes);
                  var inAttackFilter = _.intersection(item.attribute, searchAttrs).length > 0;
                }
              } // return the result (either `true` or `false`)


              return show && inAttackFilter;
            };
          }
        }, {
          key: "powerLevelFilter",
          value: function powerLevelFilter() {
            var _this3 = this;

            return function (thisPower) {
              var item = thisPower; // const powerAbove = ( this.powerComparator === 'or Greater' );
              // const powerAbove = ( this.powerComparator === 'or Greater' );
              // if ( this.powerComparator === 'greater' ) {
              // }

              var include = false;

              for (var i = 0; i <= item.cost.length; i++) {
                switch (_this3.powerComparator) {
                  case 'gte':
                    if (item.cost[i] >= parseInt(_this3.powerLevelValue)) {
                      include = true;
                    }

                    break;

                  case 'eq':
                    if (item.cost[i] === parseInt(_this3.powerLevelValue)) {
                      include = true;
                    }

                    break;

                  case 'lte':
                    if (item.cost[i] <= parseInt(_this3.powerLevelValue)) {
                      include = true;
                    }

                    break;
                } // if ( powerAbove && item.cost[i] > this.powerLevelValue ) {
                //   include = true;
                //   break;
                // } else if ( !powerAbove && item.cost[i] <= this.powerLevelValue ) {
                //   include = true;
                //   break;
                // }

              }

              ;
              return include;
            };
          }
        }, {
          key: "getCost",
          value: function getCost(costs) {
            var output = '';

            if (costs.length > 1) {
              costs.splice(costs.length - 1, 1, ' or ' + costs.length);
              costs.forEach(function (cost, i) {
                output += "".concat(cost).concat(i !== costs.length - 1 ? ', ' : ' points');
              });
              return output;
            } else {
              return "".concat(costs[0], " ").concat(costs[0] > 1 ? 'points' : 'point');
            }
          }
        }]);

        return FeatsListCtrl;
      }();

      _export("default", FeatsListCtrl);
    }
  };
});
//# sourceMappingURL=featsList.controller.js.map
