"use strict";

System.register(["angular", "angular-mocks", "chai", "sinon", "sinon-chai", "./auth.service"], function (_export, _context) {
  "use strict";

  var angular, chai, sinon, sinonChai, authServiceModule, expect;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai.default;
    }, function (_sinon) {
      sinon = _sinon.default;
    }, function (_sinonChai) {
      sinonChai = _sinonChai.default;
    }, function (_authService) {
      authServiceModule = _authService.default;
    }],
    execute: function () {
      chai.use(sinonChai);
      expect = chai.expect;
      describe('service: Auth', function () {
        var User;
        var Config;
        var $cookieStore;
        var $httpBackend;
        var Auth;
        var postData;
        var userInfo;
        var userObject;
        var anError;
        beforeEach('set up local test variables', function () {
          postData = {
            token: '123abc'
          };
          userInfo = {
            username: 'aUsername',
            password: 'aPassword'
          };
          userObject = {
            role: 'user'
          };
          anError = {
            code: 400,
            message: 'foo'
          };
        });
        beforeEach('inject mock modules', angular.mock.module(authServiceModule.name, function ($provide) {
          User = {
            get: function get(callback) {
              callback = callback || angular.noop;
              callback(userObject);
            },
            save: function save(data, successCallback) {
              successCallback({
                token: '123abc'
              });
              return {
                $promise: Promise.resolve()
              };
            }
          };
          $provide.value('User', User);
          Config = {
            urlBase: 'foo'
          };
          $provide.value('Config', Config);
          $cookieStore = {
            get: sinon.spy(),
            put: sinon.spy(),
            remove: sinon.spy()
          };
          $provide.value('$cookieStore', $cookieStore);
        }));
        beforeEach(inject(function (_$httpBackend_, _Auth_) {
          $httpBackend = _$httpBackend_;
          Auth = _Auth_;
        }));

        var verifyBackend = function verifyBackend() {
          $httpBackend.flush();
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
        };

        describe('login method', function () {
          it("posts to urlBase at '/api/auth/login'", function () {
            $httpBackend.expectPOST(Config.urlBase + '/api/auth/login').respond(postData);
            Auth.login(userInfo);
            verifyBackend();
          });
          describe('on successful POST', function () {
            it('calls callback with no arguments', function () {
              var callback = sinon.stub();
              $httpBackend.whenPOST(Config.urlBase + '/api/auth/login').respond(postData);
              Auth.login(userInfo, callback);
              $httpBackend.flush();
              expect(callback).to.have.been.called;
              expect(callback).to.have.been.calledWithExactly();
            });
            it('returns a promise that resolves to the user object', function (done) {
              $httpBackend.whenPOST(Config.urlBase + '/api/auth/login').respond(postData);
              Auth.login(userInfo).then(function (res) {
                expect(res).to.equal(userObject);
                done();
              }).catch(done);
              $httpBackend.flush();
            });
            it('adds the token to the $cookieStore', function (done) {
              var token = '123abc';
              $httpBackend.whenPOST(Config.urlBase + '/api/auth/login').respond({
                token: token
              });
              Auth.login(userInfo).then(function () {
                expect($cookieStore.put).to.have.been.calledWith('token', token);
                done();
              }).catch(done);
              $httpBackend.flush();
            });
          });
          describe('on failed POST', function () {
            it('calls Auth.logout()', function () {
              $httpBackend.whenPOST(Config.urlBase + '/api/auth/login').respond(400, anError);
              Auth.logout = sinon.spy();
              Auth.login(userInfo);
              $httpBackend.flush();
              expect(Auth.logout).to.have.been.called;
            });
            it('calls callback with an error', function () {
              var callback = sinon.stub();
              $httpBackend.whenPOST(Config.urlBase + '/api/auth/login').respond(400, anError);
              Auth.logout = angular.noop;
              Auth.login(userInfo, callback);
              $httpBackend.flush();
              expect(callback).to.have.been.calledWith(anError);
            });
            it('returns a promise that rejects with an error object', function (done) {
              $httpBackend.whenPOST(Config.urlBase + '/api/auth/login').respond(400, anError);
              Auth.logout = angular.noop;
              Auth.login(userInfo).then(null, function (err) {
                expect(err).to.deep.equal(anError);
                done();
              }).catch(done);
              $httpBackend.flush();
            });
          });
        });
        describe('logout method', function () {
          it('removes token from $cookieStore', function () {
            Auth.logout();
            expect($cookieStore.remove).to.have.been.calledWith('token');
          });
        });
        describe('createUser method', function () {
          it('calls User.save with the user data', function () {
            sinon.spy(User, 'save');
            Auth.createUser(userInfo);
            expect(User.save).to.have.been.called;
          });
          describe('on successful user creation', function () {
            it('calls the callback with the original user info', function () {
              var callback = sinon.spy();
              Auth.createUser(userInfo, callback);
              expect(callback).to.have.been.calledWith(userInfo);
            });
            it('adds the token to the $cookieStore', function (done) {
              Auth.createUser(userInfo, function () {
                expect($cookieStore.put).to.have.been.calledWith('token', '123abc');
                done();
              });
            });
          });
          describe('on failed user creation', function () {
            var userSaveErr;
            beforeEach('make User.save call the error callback and return a rejected promise', function () {
              userSaveErr = {};

              User.save = function (user, successCallback, errorCallback) {
                errorCallback(userSaveErr);
                return {
                  $promise: Promise.reject(userSaveErr)
                };
              };
            });
            it('calls the callback with the error', function () {
              var callback = sinon.spy();
              Auth.createUser(userInfo, callback);
              expect(callback).to.have.been.calledWith(userSaveErr);
            });
            it('calls the logout method', function () {
              sinon.spy(Auth, 'logout');
              Auth.createUser(userInfo);
              expect(Auth.logout).to.have.been.called;
            });
          });
        });
        describe('for a logged in user', function () {
          beforeEach('log in a user', function () {
            $httpBackend.expectPOST(Config.urlBase + '/api/auth/login').respond(postData);
            Auth.login(userInfo);
            $httpBackend.flush();
          });
          it('getCurrentUser() gets current user', function () {
            expect(Auth.getCurrentUser()).to.equal(userObject);
          });
          describe('setUserProperty method', function () {
            it('returns the current user', function () {
              expect(Auth.setUserProperty('foo', 'bar')).to.equal(userObject);
            });
            it("can set a property on the current user if it's previously defined", function () {
              var newRole = 'kingslayer';
              Auth.setUserProperty('role', newRole);
              expect(Auth.getCurrentUser()).to.have.property('role', newRole);
            });
            it("can't set a property on the current user if it wasn't previously defined", function () {
              Auth.setUserProperty('height', 10);
              expect(Auth.getCurrentUser()).not.to.have.property('height');
            });
          });
          it('isLoggedIn() is true', function () {
            expect(Auth.isLoggedIn()).to.be.true;
          });
          it('isAdmin() checks the currentUser.role', function () {
            userObject.role = 'admin';
            expect(Auth.isAdmin()).to.be.true;
            userObject.role = 'user';
            expect(Auth.isAdmin()).to.be.false;
          });
        });
      });
    }
  };
});
//# sourceMappingURL=auth.service.spec.js.map
