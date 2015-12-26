System.register(["angular", "angular-ui-router", "common/services/user.service", "common/services/url.service"], function (_export) {
  var angular, userService, urlService, authServiceModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularUiRouter) {}, function (_commonServicesUserService) {
      userService = _commonServicesUserService["default"];
    }, function (_commonServicesUrlService) {
      urlService = _commonServicesUrlService["default"];
    }],
    execute: function () {
      "use strict";

      authServiceModule = angular.module("auth.service.js", ["ui.router", userService.name, urlService.name]);

      authServiceModule.factory("Auth", ["$state", "$timeout", "$rootScope", "$http", "User", "URL", "$cookieStore", "$q", function ($state, $timeout, $rootScope, $http, User, URL, $cookieStore, $q) {
        var currentUser = {};
        var isWaitingForInitialAuth = true;
        var nextRoute = false;

        if ($cookieStore.get("token")) {

          User.get(function (data) {
            // update currentUser, toggle waiting for Auth bool, route
            currentUser = data;
            isWaitingForInitialAuth = false;
            // if the user API response was slow and the UI has pushed the user
            // to /login while waiting for a response, forward them to their
            // intended route
            if ($state.current.name === "login") {
              $state.go(nextRoute.name || "content", {}, { reload: true });
            }
          }, function () {
            // error, so we remove the token and redirect to login
            isWaitingForInitialAuth = false;
            $cookieStore.remove("token");
            currentUser = {};
            $state.go("login", {}, { reload: true });
          });
        } else {
          isWaitingForInitialAuth = false;
        }

        return {

          /**
           * Authenticate user and save token
           *
           * @param  {Object}   user     - login info
           * @param  {Function} callback - optional
           * @return {Promise}
           */
          login: function login(user, callback) {
            var _this = this;

            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post(URL.apiBase + "/api/auth/local", {
              username: user.username,
              password: user.password
            }).success(function (data) {
              $cookieStore.put("token", data.token);
              User.get(function (data) {
                currentUser = data;
                deferred.resolve(data);
                return cb();
              }, function (err) {
                deferred.reject(err);
                return cb(err);
              });
            }).error(function (err) {
              _this.logout();
              deferred.reject(err);
              return cb(err);
            });

            return deferred.promise;
          },

          /**
           * Delete access token and user info
           *
           * @param  {Function}
           */
          logout: function logout() {
            $cookieStore.remove("token");
            currentUser = {};
          },

          /**
           * Create a new user
           *
           * @param  {Object}   user     - user info
           * @param  {Function} callback - optional
           * @return {Promise}
           */
          createUser: function createUser(user, callback) {
            var _this = this;

            var cb = callback || angular.noop;

            // @FIXME when organizations are ready
            user.organization = "scala";

            return User.save(user, function (data) {
              if (currentUser.hasOwnProperty("role") && currentUser.role === "admin") {
                return cb(currentUser);
              }
              $cookieStore.put("token", data.token);
              currentUser = User.get();
              return cb(user);
            }, function (err) {
              _this.logout();
              return cb(err);
            }).$promise;
          },

          /**
           * Change password
           *
           * @param  {String}   oldPassword
           * @param  {String}   newPassword
           * @param  {Function} callback    - optional
           * @return {Promise}
           */
          changePassword: function changePassword(oldPassword, newPassword, callback) {
            var cb = callback || angular.noop;

            return User.changePassword({ id: currentUser._id }, {
              oldPassword: oldPassword,
              newPassword: newPassword
            }, function (user) {
              return cb(user);
            }, function (err) {
              return cb(err);
            }).$promise;
          },

          /**
           * Gets all available info on authenticated user
           *
           * @return {Object} user
           */
          getCurrentUser: function getCurrentUser() {
            return currentUser;
          },

          /**
           * Sets a property on the currentUser object
           *
           * @return {String} prop
           */
          setUserProperty: function setUserProperty(prop, val) {
            if (currentUser.hasOwnProperty(prop)) {
              currentUser[prop] = val;
            }
            return currentUser;
          },

          /**
           * Check if waiting for the initial Auth check
           *
           * @return {Boolean}
           */
          isWaitingForInitialAuth: (function (_isWaitingForInitialAuth) {
            var _isWaitingForInitialAuthWrapper = function isWaitingForInitialAuth() {
              return _isWaitingForInitialAuth.apply(this, arguments);
            };

            _isWaitingForInitialAuthWrapper.toString = function () {
              return _isWaitingForInitialAuth.toString();
            };

            return _isWaitingForInitialAuthWrapper;
          })(function () {
            return isWaitingForInitialAuth;
          }),

          /**
           * Check if a user is logged in
           *
           * @return {Boolean}
           */
          isLoggedIn: function isLoggedIn() {
            return currentUser.hasOwnProperty("role");
          },

          /**
           * Waits for currentUser to resolve before checking if user is logged in
           */
          isLoggedInAsync: function isLoggedInAsync(cb) {
            if (currentUser.hasOwnProperty("$promise")) {
              currentUser.$promise.then(function () {
                cb(true);
              })["catch"](function () {
                cb(false);
              });
            } else if (currentUser.hasOwnProperty("role")) {
              cb(true);
            } else {
              cb(false);
            }
          },

          /**
           * Save the next route user is attempting to navigate to
           *
           * @return {Object}
           */
          setNextRoute: function setNextRoute(route) {
            if (route.name !== "login" && route.name !== "logout") {
              nextRoute = route;
            }
            return nextRoute;
          },

          /**
           * Save the next route user is attempting to navigate to
           *
           * @return {Object}
           */
          getNextRoute: function getNextRoute() {
            return nextRoute;
          },

          /**
           * Check if a user is an admin
           *
           * @return {Boolean}
           */
          isAdmin: function isAdmin() {
            return currentUser.role === "admin";
          },

          /**
           * Get a list of user roles
           *
           * @return {Array}
           */
          getRoles: function getRoles() {
            return [{
              val: "user",
              name: "User"
            }, {
              val: "admin",
              name: "Admin"
            }];
          },

          /**
           * Get auth token
           */
          getToken: function getToken() {
            return $cookieStore.get("token");
          }
        };
      }]);

      _export("default", authServiceModule);
    }
  };
});
//# sourceMappingURL=../../common/services/auth.service.js.map