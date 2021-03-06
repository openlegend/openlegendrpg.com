"use strict";

System.register(["angular", "angular-mocks", "chai", "sinon", "sinon-chai", "./signup.controller"], function (_export, _context) {
  "use strict";

  var angular, chai, sinon, sinonChai, signupController, expect;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai.default;
    }, function (_sinon) {
      sinon = _sinon.default;
    }, function (_sinonChai) {
      sinonChai = _sinonChai.default;
    }, function (_signupController) {
      signupController = _signupController.default;
    }],
    execute: function () {
      chai.use(sinonChai);
      expect = chai.expect;
      describe('controller: SignupCtrl', function () {
        var $rootScope;
        var controller;
        var $state;
        var $animate;
        var Auth;
        beforeEach(angular.mock.module(signupController.name));
        beforeEach(inject(function ($controller, _$rootScope_) {
          $rootScope = _$rootScope_;
          $state = {
            go: sinon.stub()
          };
          $animate = {};
          Auth = {
            createUser: sinon.stub().returns(Promise.resolve())
          };
          controller = $controller('SignupCtrl', {
            $state: $state,
            $animate: $animate,
            Auth: Auth
          });
        }));
        describe('signup method', function () {
          beforeEach(function () {
            controller.signupForm.$valid = true;
            controller.signupForm.$submitted = false;
            controller.user = {
              firstname: 'firstName',
              lastname: 'lastName',
              email: 'anEmail',
              password: 'aPassword'
            };
          });
          it('does nothing if signupForm is not $valid', function () {
            controller.signupForm.$valid = false;
            controller.signup();
            expect(Auth.createUser).not.to.have.been.called;
          });
          it('does nothing if signupForm has already been $submitted', function () {
            controller.signupForm.$submitted = true;
            controller.signup();
            expect(Auth.createUser).not.to.have.been.called;
          });
          it('creates the user for a valid form', function () {
            controller.signup();
            expect(Auth.createUser.args[0][0]).to.deep.equal({
              firstName: controller.user.firstname,
              lastName: controller.user.lastname,
              email: controller.user.email,
              password: controller.user.password
            });
          });
          it('goes to the content state after saving user', function (done) {
            var createUserPromise = new Promise.resolve();
            Auth.createUser = sinon.stub().returns(createUserPromise);
            controller.signup();
            createUserPromise.then(function () {
              expect($state.go).to.have.been.calledWith('content', null, {
                reload: true
              });
              done();
            }).catch(done);
          });
          it('catches errors when saving a user', function (done) {
            var err = {
              data: {
                code: 401,
                message: 'Not Authorized'
              }
            };
            var createUserPromise = new Promise.reject(err);
            Auth.createUser = sinon.stub().returns(createUserPromise);
            controller.signup();
            createUserPromise.catch(function () {
              expect(controller.errors[401]).to.deep.equal(err.data);
              done();
            }).catch(done);
          });
          it('allows the form to be submitted again after an error', function (done) {
            var err = {
              data: {
                code: 401,
                message: 'Not Authorized'
              }
            };
            var createUserPromise = new Promise.reject(err);
            Auth.createUser = sinon.stub().returns(createUserPromise);
            controller.signup();
            createUserPromise.catch(function () {
              expect(controller.signupForm.$submitted).to.be.false;
              done();
            }).catch(done);
          });
        });
      });
    }
  };
});
//# sourceMappingURL=signup.controller.spec.js.map
