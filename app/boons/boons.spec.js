"use strict";

System.register(["angular", "angular-mocks", "chai", "app/boons/boons"], function (_export, _context) {
  "use strict";

  var angular, chai, boons, assert;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai.default;
    }, function (_appBoonsBoons) {
      boons = _appBoonsBoons.default;
    }],
    execute: function () {
      assert = chai.assert;
      describe('boons', function () {
        it('exists', function () {
          assert.isDefined(boons);
        }); // @TODO - work this out with tristan
        // beforeEach(inject((_$rootScope_, _$controller) => {
        //   $rootScope = _$rootScope_;
        //   $controller = _$controller_;
        // }));
        // beforeEach(inject(($rootScope, $controller) => {
        //   scope = $rootScope.$new();
        //   ctrl = $controller('BoonsCtrl', {$scope: scope});
        // }));
        // describe('the boons route', () => {
        //   it('has a controller called BoonsCtrl', () => {
        //     console.log(ctrl);
        //     expect(ctrl).not.to.be.empty;
        //   });
        // });
        // uncomment for a sanity check
        //it('can fail', function() {
        //assert.fail();
        //});
      });
    }
  };
});
//# sourceMappingURL=boons.spec.js.map
