"use strict";

System.register(["angular", "angular-mocks", "chai", "sinon", "sinon-chai", "./authInterceptor.service"], function (_export, _context) {
  "use strict";

  var angular, chai, sinon, sinonChai, authInterceptorService, expect;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai.default;
    }, function (_sinon) {
      sinon = _sinon.default;
    }, function (_sinonChai) {
      sinonChai = _sinonChai.default;
    }, function (_authInterceptorService) {
      authInterceptorService = _authInterceptorService.default;
    }],
    execute: function () {
      chai.use(sinonChai);
      expect = chai.expect;
      describe('service: authInterceptor', function () {
        var $rootScope;
        var $cookieStore;
        var authInterceptor;
        beforeEach('mock module', angular.mock.module(authInterceptorService.name, function ($provide) {
          $cookieStore = {
            get: sinon.stub(),
            remove: sinon.stub()
          };
          $provide.value('$cookieStore', $cookieStore);
        }));
        beforeEach(inject(function (_$rootScope_, _authInterceptor_) {
          $rootScope = _$rootScope_;
          authInterceptor = _authInterceptor_;
        }));
        describe('request method', function () {
          it('sets the Authorization header to the token from $cookieStore', function () {
            var aToken = '123abc';
            $cookieStore.get.withArgs('token').returns(aToken);
            var request = authInterceptor.request({});
            expect(request.headers.Authorization).to.equal("Bearer ".concat(aToken));
          });
          it("does nothing if there's no cookie in the store", function () {
            $cookieStore.get.withArgs('token').returns();
            var request = authInterceptor.request({});
            expect(request.headers.Authorization).to.be.undefined;
          });
        });
        describe('responseError method', function () {
          it('removes the token from the $cookieStore if the error status was 401', function (done) {
            authInterceptor.responseError({
              status: 401
            }).catch(function (err) {
              expect($cookieStore.remove).to.have.been.calledWith('token');
              expect(err.status).to.equal(401);
              done();
            }).catch(done);
            $rootScope.$digest();
          });
        });
      });
    }
  };
});
//# sourceMappingURL=authInterceptor.service.spec.js.map
