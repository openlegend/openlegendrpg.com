System.register(["angular", "angular-mocks", "chai", "sinon", "sinon-chai", "./loginComponent.controller"], function (_export) {
  var angular, chai, sinon, sinonChai, loginComponentController, expect;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularMocks) {}, function (_chai) {
      chai = _chai["default"];
    }, function (_sinon) {
      sinon = _sinon["default"];
    }, function (_sinonChai) {
      sinonChai = _sinonChai["default"];
    }, function (_loginComponentController) {
      loginComponentController = _loginComponentController["default"];
    }],
    execute: function () {
      "use strict";

      chai.use(sinonChai);
      expect = chai.expect;

      describe("controller: LoginComponentCtrl", function () {
        var $rootScope = undefined;
        var controller = undefined;
        var $state = undefined;
        var $animate = undefined;
        var Auth = undefined;

        beforeEach(angular.mock.module(loginComponentController.name));

        beforeEach(inject(function ($controller, _$rootScope_) {
          $rootScope = _$rootScope_;
          $state = {
            go: sinon.stub()
          };
          $animate = {};
          Auth = {
            login: sinon.stub().returns(Promise.resolve())
          };

          controller = $controller("LoginComponentCtrl", { $state: $state, $animate: $animate, Auth: Auth });
        }));

        describe("login method", function () {
          beforeEach(function () {
            controller.loginForm.$valid = true;
            controller.loginForm.$submitted = false;
            controller.user = {
              email: "anEmail",
              password: "aPassword"
            };
          });

          it("does nothing if loginForm is not $valid", function () {
            controller.loginForm.$valid = false;
            controller.login();
            expect(Auth.login).not.to.have.been.called;
          });

          it("does nothing if loginForm has already been $submitted", function () {
            controller.loginForm.$submitted = true;
            controller.login();
            expect(Auth.login).not.to.have.been.called;
          });

          it("creates the user for a valid form", function () {
            controller.login();
            expect(Auth.login.args[0][0]).to.deep.equal({
              username: controller.user.email,
              password: controller.user.password
            });
          });

          it("goes to the content state after saving user", function (done) {
            var loginUserPromise = new Promise.resolve();
            Auth.login = sinon.stub().returns(loginUserPromise);

            controller.login();

            loginUserPromise.then(function () {
              expect($state.go).to.have.been.calledWith("content", null, { reload: true });
              done();
            })["catch"](done);
          });

          it("catches errors when saving a user", function (done) {
            var err = {
              code: 401,
              message: "Not Authorized"
            };
            var loginUserPromise = new Promise.reject(err);
            Auth.login = sinon.stub().returns(loginUserPromise);

            controller.login();

            loginUserPromise["catch"](function () {
              expect(controller.errors[401]).to.deep.equal(err);
              done();
            })["catch"](done);
          });

          it("allows the form to be submitted again after an error", function (done) {
            var err = {
              data: { code: 401, message: "Not Authorized" }
            };
            var loginUserPromise = new Promise.reject(err);
            Auth.login = sinon.stub().returns(loginUserPromise);

            controller.login();

            loginUserPromise["catch"](function () {
              expect(controller.loginForm.$submitted).to.be["false"];
              done();
            })["catch"](done);
          });
        });
      });
    }
  };
});
//# sourceMappingURL=../../../common/directives/loginComponent/loginComponent.controller.spec.js.map