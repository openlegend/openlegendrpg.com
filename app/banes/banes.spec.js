System.register(["angular", "angular-mocks", "chai", "app/banes/banes"], function (_export) {
  var angular, chai, banes, assert;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai["default"];
    }, function (_appBanesBanes) {
      banes = _appBanesBanes["default"];
    }],
    execute: function () {
      "use strict";

      assert = chai.assert;

      describe("banes", function () {
        it("exists", function () {
          assert.isDefined(banes);
        });

        // @TODO - work this out with tristan

        // beforeEach(inject((_$rootScope_, _$controller) => {
        //   $rootScope = _$rootScope_;
        //   $controller = _$controller_;
        // }));

        // beforeEach(inject(($rootScope, $controller) => {
        //   scope = $rootScope.$new();
        //   ctrl = $controller('BanesCtrl', {$scope: scope});
        // }));

        // describe('the banes route', () => {
        //   it('has a controller called BanesCtrl', () => {
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
//# sourceMappingURL=../../app/banes/banes.spec.js.map