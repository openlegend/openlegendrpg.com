'use strict';

System.register(["angular", "lodash", "./banes.json!"], function (_export, _context) {
  "use strict";

  var angular, banes, BanesCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {}, function (_banesJson) {
      banes = _banesJson.default;
    }],
    execute: function () {
      BanesCtrl =
      /*#__PURE__*/
      function () {
        // called once when the class is instantiated
        function BanesCtrl($scope, $location, $mdMedia, Config, Link) {
          var _this = this;

          _classCallCheck(this, BanesCtrl);

          this.$scope = $scope;
          this.$location = $location;
          this.$scope.$mdMedia = $mdMedia;
          this.Config = Config;
          this.Link = Link;
          this.items = banes || []; // actively generate a uniq array of all attributes used in the json resource

          this.filterAttributes = _.uniq(_.flatten(_.map(banes, 'attackAttributes'))).map(function (attr) {
            return {
              name: attr
            };
          });
          this.selectedAttributes = [];
          this.searchQuery = '';
          this.searchText = '';
          this.powerLevelValue = this.$location.$$search.All || 9;

          if (!_.isEmpty(this.$location.$$search)) {
            this.selectedAttributes = [];
            Object.keys(this.$location.$$search).forEach(function (val) {
              if (_.find(_this.filterAttributes, {
                name: val
              })) {
                _this.selectedAttributes.push({
                  name: val,
                  power: _this.$location.$$search[val]
                });
              }
            });
          }

          this.$scope.$watch('banesCtrl.powerLevelValue', function (newVal, oldVal) {
            if (_this.$location.$$search.All) {
              _this.$location.search('All', newVal);
            }
          }, true); // watch for changes to selectedItems filter, remove them from the querystring
          // if they are present

          this.$scope.$watch('banesCtrl.selectedAttributes', function (newVal, oldVal) {
            // clear all params
            _this.$location.$$search = {}; // store all of the standard attributes other than 'All'

            var newAttrs = newVal.filter(function (attr) {
              return attr.name !== 'All';
            }); // when adding a new item, always set it's power level to the value from
            // the UI dropdown

            if (newVal.length > oldVal.length) {
              var addedAttr = _.difference(_.map(newAttrs, 'name'), _.map(oldVal, 'name'));

              var addedAttrIndex = _.findIndex(newAttrs, {
                name: addedAttr[0]
              });

              if (addedAttrIndex > -1) {
                newAttrs.map(function (attr) {
                  if (addedAttr[0] === attr.name) {
                    attr.power = "".concat(_this.powerLevelValue);
                  }
                });
              }
            } // prevent duplicate instances of a given key


            newVal = _.uniqBy(newVal, 'name');

            if (_.isEmpty(newVal)) {
              newVal = [{
                name: 'All'
              }];
            } else if (newAttrs.length > 0) {
              newVal = newAttrs;
            }

            newVal.map(function (attr) {
              attr.power = attr.power || "".concat(_this.powerLevelValue);
              return attr;
            }); // set all incoming newVal params

            newVal.forEach(function (attr) {
              _this.$location.search(attr.name, attr.power);
            });
            _this.selectedAttributes = newVal;
          }, true);
        } // public class methods


        _createClass(BanesCtrl, [{
          key: "updateSearchTextModel",
          value: function updateSearchTextModel(val) {
            this.searchText = val;
          }
        }, {
          key: "attackAttrSearchFilter",
          value: function attackAttrSearchFilter() {
            var _this2 = this;

            // return all the options if the user hasn't selected a filter
            return Promise.resolve().then(function () {
              return _this2.filterAttributes.filter(function (attr) {
                var alreadyUsed = _this2.selectedAttributes.filter(function (selected) {
                  return selected.name === attr.name;
                });

                if (alreadyUsed.length > 0) {
                  return false;
                } else if (_this2.searchText === '') {
                  return true;
                } else {
                  return attr.name.toLowerCase().match(_this2.searchText.toLowerCase());
                }
              });
            });
          }
        }, {
          key: "textSearchFilter",
          value: function textSearchFilter() {
            var _this3 = this;

            // if `searchQuery` is empty, we want to show all list items
            return function (thisPower) {
              var item = thisPower;

              if (_this3.searchQuery === '' && _.includes(_this3.selectedAttributes, 'All')) {
                return true;
              }

              var regex = new RegExp(_this3.searchQuery, 'gi');
              var show = false; // initially we assume that we won't show a given result

              var inAttackFilter = true; // now we look for matches in the following object properties

              show = item.name.match(regex) || item.description.match(regex) || item.effect.match(regex); // if the selectedAttributes array is longer than 0, we need to show
              // only results that match one of the selected properties

              if (_this3.selectedAttributes.length > 0) {
                var inAttackFilter = false;

                if (_.find(_this3.selectedAttributes, {
                  name: 'All'
                })) {
                  inAttackFilter = true;
                } else {
                  var searchAttrs = angular.copy(_.without(_this3.selectedAttributes, 'All'));
                  var inAttackFilter = _.intersection(item.attackAttributes, _.map(searchAttrs, 'name')).length > 0;
                }
              } // return the result (either `true` or `false`)


              return show && inAttackFilter;
            };
          }
        }, {
          key: "powerLevelFilter",
          value: function powerLevelFilter() {
            var _this4 = this;

            return function (thisPower) {
              var item = thisPower;
              var include = false;
              if (_this4.$location.$$search.All === '9') return true; // if there are any querystring search params

              if (_.compact(_.map(_this4.selectedAttributes, 'power')).length > 0) {
                for (var i = 0; i <= item.power.length; i++) {
                  // find the intersection between attributes in this power and
                  // attributes that are also in active parameters
                  var intersectAttributes = _.intersection(item.attackAttributes, _.map(_this4.selectedAttributes, 'name'));

                  if (_this4.$location.$$search.All >= item.power[0]) {
                    include = true;
                    return include;
                  } else if (intersectAttributes.length > 0) {
                    intersectAttributes.forEach(function (attr) {
                      if (_this4.$location.$$search[attr] >= item.power[0] || _this4.$location.$$search[attr] >= item.power[0]) {
                        include = true;
                      }
                    });
                    return include;
                  }
                }

                ;
              }

              return include;
            };
          }
        }]);

        return BanesCtrl;
      }();

      _export("default", BanesCtrl);
    }
  };
});
//# sourceMappingURL=banesList.controller.js.map
