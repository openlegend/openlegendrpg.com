"use strict";

System.register(["angular", "angular-mocks", "./reverse.filter", "chai"], function (_export, _context) {
  "use strict";

  var angular, reverseFilterModule, chai, expect;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMocks) {}, function (_reverseFilter) {
      reverseFilterModule = _reverseFilter.default;
    }, function (_chai) {
      chai = _chai.default;
    }],
    execute: function () {
      expect = chai.expect;
      describe('filter: reverse', function () {
        var reverseFilter;
        beforeEach(angular.mock.module(reverseFilterModule.name));
        beforeEach(inject(function (_reverseFilter_) {
          reverseFilter = _reverseFilter_;
        }));
        it('reverses the order of a list', function () {
          var firstObj = {};
          var secondObj = {};
          var thirdObj = {};
          var list = [firstObj, secondObj, thirdObj];
          expect(reverseFilter(list)).to.deep.equal([thirdObj, secondObj, firstObj]);
        });
        it('leaves an empty list alone', function () {
          expect(reverseFilter([])).to.deep.equal([]);
        });
      });
    }
  };
});
//# sourceMappingURL=reverse.filter.spec.js.map
