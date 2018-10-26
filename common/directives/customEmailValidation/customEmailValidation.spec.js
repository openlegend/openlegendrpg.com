"use strict";

System.register(["angular", "angular-mocks", "./customEmailValidation", "chai", "chai-jq"], function (_export, _context) {
  "use strict";

  var angular, customEmailValidation, chai, chaiJq, expect;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMocks) {}, function (_customEmailValidation) {
      customEmailValidation = _customEmailValidation.default;
    }, function (_chai) {
      chai = _chai.default;
    }, function (_chaiJq) {
      chaiJq = _chaiJq.default;
    }],
    execute: function () {
      chai.use(chaiJq);
      expect = chai.expect;
      describe('directive: customEmailValidation', function () {
        var element;
        var compiled;
        var scope;
        beforeEach(angular.mock.module(customEmailValidation.name));
        beforeEach(inject(function ($rootScope, $compile) {
          scope = $rootScope.$new();
          var elementTemplate = '<input type="email" custom-email-validation required name="testSignup" ng-model="email">';
          element = angular.element(elementTemplate);
          compiled = $compile(element)(scope);
          scope.$digest();
        }));

        var checkValid = function checkValid(email) {
          it("is valid for ".concat(email), function () {
            scope.email = email;
            scope.$digest();
            expect(element).to.have.$class('ng-valid');
          });
        };

        var checkInvalid = function checkInvalid(email) {
          it("is invalid for ".concat(email), function () {
            scope.email = email;
            scope.$digest();
            expect(element).to.have.$class('ng-invalid');
          });
        };

        checkValid('foo@gmail.com');
        checkValid('foo.bar.baz@yahoo.net');
        checkValid('foo&^(@gmail.com');
        checkValid('z@z.z');
        checkInvalid('');
        checkInvalid('foo');
        checkInvalid('foo@gmail');
      });
    }
  };
});
//# sourceMappingURL=customEmailValidation.spec.js.map
