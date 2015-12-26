System.register(["angular", "angular-mocks", "chai", "app/home/home"], function (_export) {
  var angular, chai, home, assert;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai["default"];
    }, function (_appHomeHome) {
      home = _appHomeHome["default"];
    }],
    execute: function () {
      "use strict";

      assert = chai.assert;

      describe("home", function () {
        it("exists", function () {
          assert.isDefined(home);
        });

        // @TODO - work this out with tristan

        // beforeEach(inject((_$rootScope_, _$controller) => {
        //   $rootScope = _$rootScope_;
        //   $controller = _$controller_;
        // }));

        // beforeEach(inject(($rootScope, $controller) => {
        //   scope = $rootScope.$new();
        //   ctrl = $controller('HomeCtrl', {$scope: scope});
        // }));

        // describe('the home route', () => {
        //   it('has a controller called HomeCtrl', () => {
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
//# sourceMappingURL=../../app/home/home.spec.js.map