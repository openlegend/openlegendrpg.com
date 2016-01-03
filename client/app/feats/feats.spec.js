System.register(["angular", "angular-mocks", "chai", "app/feats/feats"], function (_export) {
  var angular, chai, feats, assert;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai["default"];
    }, function (_appFeatsFeats) {
      feats = _appFeatsFeats["default"];
    }],
    execute: function () {
      "use strict";

      assert = chai.assert;

      describe("feats", function () {
        it("exists", function () {
          assert.isDefined(feats);
        });

        // @TODO - work this out with tristan

        // beforeEach(inject((_$rootScope_, _$controller) => {
        //   $rootScope = _$rootScope_;
        //   $controller = _$controller_;
        // }));

        // beforeEach(inject(($rootScope, $controller) => {
        //   scope = $rootScope.$new();
        //   ctrl = $controller('BoonsCtrl', {$scope: scope});
        // }));

        // describe('the feats route', () => {
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
//# sourceMappingURL=../../app/feats/feats.spec.js.map