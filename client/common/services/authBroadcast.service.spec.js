System.register(["angular", "angular-mocks", "chai", "sinon", "sinon-chai", "./authBroadcast.service"], function (_export) {
  var angular, chai, sinon, sinonChai, authBroadcastModule, expect;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai["default"];
    }, function (_sinon) {
      sinon = _sinon["default"];
    }, function (_sinonChai) {
      sinonChai = _sinonChai["default"];
    }, function (_authBroadcastService) {
      authBroadcastModule = _authBroadcastService["default"];
    }],
    execute: function () {
      "use strict";

      chai.use(sinonChai);
      expect = chai.expect;

      describe("service: authBroadcast", function () {
        var $rootScope = undefined;
        var authBroadcast = undefined;
        var AUTH_EVENTS = undefined;

        beforeEach("mock module", angular.mock.module(authBroadcastModule.name));

        beforeEach(inject(function (_$rootScope_, _authBroadcast_, _AUTH_EVENTS_) {
          $rootScope = _$rootScope_;
          authBroadcast = _authBroadcast_;
          AUTH_EVENTS = _AUTH_EVENTS_;
        }));

        beforeEach("spy on the $broadcast method", function () {
          sinon.spy($rootScope, "$broadcast");
        });

        afterEach("release spy on $broadcast method", function () {
          $rootScope.$broadcast.restore();
        });

        it("foo bar!", function () {});

        describe("response method", function () {
          it("broadcasts the AUTH_EVENTS.loginSuccess event for status code 200", function () {
            var res = {
              data: { token: "123" },
              status: 200
            };
            authBroadcast.response(res);

            expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.loginSuccess, res);
          });

          it("broadcasts nothing for status code other than 200", function () {
            var res = {
              data: {},
              status: 201
            };
            authBroadcast.response(res);

            expect($rootScope.$broadcast).not.to.have.been.called;
          });
        });

        describe("responseError method", function () {
          it("broadcasts a server error if status code is 500 and no code is recognized", function () {
            var res = {
              data: {},
              status: 500
            };
            authBroadcast.responseError(res);

            expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.serverError, res);
          });

          it("broadcasts a loginFailed error if the code is 'authentication.failed'", function () {
            var res = {
              data: { code: "authentication.failed" },
              status: 500
            };
            authBroadcast.responseError(res);

            expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.loginFailed, res);
          });

          it("broadcasts a sessionTimeout error if the code is 'authentication.invalid'", function () {
            var res = {
              data: { code: "authentication.invalid" },
              status: 500
            };
            authBroadcast.responseError(res);

            expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.sessionTimeout, res);
          });

          it("does nothing if there is no status on the res", function () {
            var res = {
              data: { code: "authentication.invalid" }
            };
            authBroadcast.responseError(res);

            expect($rootScope.$broadcast).not.to.have.been.called;
          });
        });
      });
    }
  };
});
//# sourceMappingURL=../../common/services/authBroadcast.service.spec.js.map