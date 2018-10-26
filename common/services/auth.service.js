'use strict';

System.register(["angular", "angular-ui-router", "common/services/user.service", "config/config"], function (_export, _context) {
  "use strict";

  var angular, userService, configService, authServiceModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularUiRouter) {}, function (_commonServicesUserService) {
      userService = _commonServicesUserService.default;
    }, function (_configConfig) {
      configService = _configConfig.default;
    }],
    execute: function () {
      authServiceModule = angular.module('auth.service.js', ['ui.router', userService.name, configService.name]);
      authServiceModule.factory('Auth', ["$state", "$timeout", "$rootScope", "$http", "User", "Config", "$cookieStore", "$q", function ($state, $timeout, $rootScope, $http, User, Config, $cookieStore, $q) {
        var currentUser = {};
        var _isWaitingForInitialAuth = true;
        var nextRoute = false;

        if ($cookieStore.get('token')) {
          User.get(function (data) {
            // update currentUser, toggle waiting for Auth bool, route
            currentUser = data;
            _isWaitingForInitialAuth = false; // if the user API response was slow and the UI has pushed the user
            // to /login while waiting for a response, forward them to their
            // intended route

            if ($state.current.name === 'login') {
              $state.go(nextRoute.name || 'content', {}, {
                reload: true
              });
            }
          }, function () {
            // error, so we remove the token and redirect to login
            _isWaitingForInitialAuth = false;
            $cookieStore.remove('token');
            currentUser = {};
            $state.go('login', {}, {
              reload: true
            });
          });
        } else {
          _isWaitingForInitialAuth = false;
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
            $http.post(Config.urlBase + '/api/auth/local', {
              username: user.username,
              password: user.password
            }).success(function (data) {
              $cookieStore.put('token', data.token);
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
            $cookieStore.remove('token');
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
            var _this2 = this;

            var cb = callback || angular.noop; // @FIXME when organizations are ready

            user.organization = 'scala';
            return User.save(user, function (data) {
              if (currentUser.hasOwnProperty('role') && currentUser.role === 'admin') {
                return cb(currentUser);
              }

              $cookieStore.put('token', data.token);
              currentUser = User.get();
              return cb(user);
            }, function (err) {
              _this2.logout();

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
            return User.changePassword({
              id: currentUser._id
            }, {
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
          isWaitingForInitialAuth: function isWaitingForInitialAuth() {
            return _isWaitingForInitialAuth;
          },

          /**
           * Check if a user is logged in
           *
           * @return {Boolean}
           */
          isLoggedIn: function isLoggedIn() {
            return currentUser.hasOwnProperty('role');
          },

          /**
           * Waits for currentUser to resolve before checking if user is logged in
           */
          isLoggedInAsync: function isLoggedInAsync(cb) {
            if (currentUser.hasOwnProperty('$promise')) {
              currentUser.$promise.then(function () {
                cb(true);
              }).catch(function () {
                cb(false);
              });
            } else if (currentUser.hasOwnProperty('role')) {
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
            if (route.name !== 'login' && route.name !== 'logout') {
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
            return currentUser.role === 'admin';
          },

          /**
           * Get a list of user roles
           *
           * @return {Array}
           */
          getRoles: function getRoles() {
            return [{
              val: 'user',
              name: 'User'
            }, {
              val: 'admin',
              name: 'Admin'
            }];
          },

          /**
           * Get auth token
           */
          getToken: function getToken() {
            return $cookieStore.get('token');
          }
        };
      }]);

      _export("default", authServiceModule);
    }
  };
});
//# sourceMappingURL=auth.service.js.map
