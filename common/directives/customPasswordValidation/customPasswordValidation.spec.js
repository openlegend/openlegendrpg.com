"use strict";

System.register(["angular", "angular-mocks", "./customPasswordValidation", "chai", "chai-jq"], function (_export, _context) {
  "use strict";

  var angular, customPasswordValidation, chai, chaiJq, expect;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMocks) {}, function (_customPasswordValidation) {
      customPasswordValidation = _customPasswordValidation.default;
    }, function (_chai) {
      chai = _chai.default;
    }, function (_chaiJq) {
      chaiJq = _chaiJq.default;
    }],
    execute: function () {
      chai.use(chaiJq);
      expect = chai.expect;
      describe('directive: customPasswordValidation', function () {
        var element;
        var compiled;
        var scope;
        beforeEach(angular.mock.module(customPasswordValidation.name));
        beforeEach(inject(function ($rootScope, $compile) {
          scope = $rootScope.$new();
          var elementTemplate = '<input type="password" custom-password-validation required name="testSignup" ng-model="password">';
          element = angular.element(elementTemplate);
          compiled = $compile(element)(scope);
          scope.$digest();
        }));

        var checkValid = function checkValid(password) {
          it("is valid for ".concat(password), function () {
            scope.password = password;
            scope.$digest();
            expect(element).to.have.$class('ng-valid');
          });
        };

        var checkInvalid = function checkInvalid(password) {
          it("is invalid for ".concat(password), function () {
            scope.password = password;
            scope.$digest();
            expect(element).to.have.$class('ng-invalid');
          });
        };

        checkValid('FooBarBaz1');
        checkInvalid('FooBar1');
        checkInvalid('FooBarBaz');
        checkInvalid('foobarbaz1');
        checkInvalid('FOOBARBAZ1');
      });
    }
  };
});
//# sourceMappingURL=customPasswordValidation.spec.js.map
