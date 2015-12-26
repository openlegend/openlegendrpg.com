/* */ 
(function(process) {
  (function(angular, undefined) {
    "use strict";
    var mod_core = angular.module("ct.ui.router.extras.core", ["ui.router"]);
    var internalStates = {},
        stateRegisteredCallbacks = [];
    mod_core.config(['$stateProvider', '$injector', function($stateProvider, $injector) {
      $stateProvider.decorator('parent', function(state, parentFn) {
        internalStates[state.self.name] = state;
        state.self.$$state = function() {
          return internalStates[state.self.name];
        };
        angular.forEach(stateRegisteredCallbacks, function(callback) {
          callback(state);
        });
        return parentFn(state);
      });
    }]);
    var DEBUG = false;
    var forEach = angular.forEach;
    var extend = angular.extend;
    var isArray = angular.isArray;
    var map = function(collection, callback) {
      "use strict";
      var result = [];
      forEach(collection, function(item, index) {
        result.push(callback(item, index));
      });
      return result;
    };
    var keys = function(collection) {
      "use strict";
      return map(collection, function(collection, key) {
        return key;
      });
    };
    var filter = function(collection, callback) {
      "use strict";
      var result = [];
      forEach(collection, function(item, index) {
        if (callback(item, index)) {
          result.push(item);
        }
      });
      return result;
    };
    var filterObj = function(collection, callback) {
      "use strict";
      var result = {};
      forEach(collection, function(item, index) {
        if (callback(item, index)) {
          result[index] = item;
        }
      });
      return result;
    };
    function ancestors(first, second) {
      var path = [];
      for (var n in first.path) {
        if (first.path[n] !== second.path[n])
          break;
        path.push(first.path[n]);
      }
      return path;
    }
    function objectKeys(object) {
      if (Object.keys) {
        return Object.keys(object);
      }
      var result = [];
      angular.forEach(object, function(val, key) {
        result.push(key);
      });
      return result;
    }
    function protoKeys(object, ignoreKeys) {
      var result = [];
      for (var key in object) {
        if (!ignoreKeys || ignoreKeys.indexOf(key) === -1)
          result.push(key);
      }
      return result;
    }
    function arraySearch(array, value) {
      if (Array.prototype.indexOf) {
        return array.indexOf(value, Number(arguments[2]) || 0);
      }
      var len = array.length >>> 0,
          from = Number(arguments[2]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0)
        from += len;
      for (; from < len; from++) {
        if (from in array && array[from] === value)
          return from;
      }
      return -1;
    }
    function inheritParams(currentParams, newParams, $current, $to) {
      var parents = ancestors($current, $to),
          parentParams,
          inherited = {},
          inheritList = [];
      for (var i in parents) {
        if (!parents[i].params)
          continue;
        parentParams = isArray(parents[i].params) ? parents[i].params : objectKeys(parents[i].params);
        if (!parentParams.length)
          continue;
        for (var j in parentParams) {
          if (arraySearch(inheritList, parentParams[j]) >= 0)
            continue;
          inheritList.push(parentParams[j]);
          inherited[parentParams[j]] = currentParams[parentParams[j]];
        }
      }
      return extend({}, inherited, newParams);
    }
    function inherit(parent, extra) {
      return extend(new (extend(function() {}, {prototype: parent}))(), extra);
    }
    function onStateRegistered(callback) {
      stateRegisteredCallbacks.push(callback);
    }
    mod_core.provider("uirextras_core", function() {
      var core = {
        internalStates: internalStates,
        onStateRegistered: onStateRegistered,
        forEach: forEach,
        extend: extend,
        isArray: isArray,
        map: map,
        keys: keys,
        filter: filter,
        filterObj: filterObj,
        ancestors: ancestors,
        objectKeys: objectKeys,
        protoKeys: protoKeys,
        arraySearch: arraySearch,
        inheritParams: inheritParams,
        inherit: inherit
      };
      angular.extend(this, core);
      this.$get = function() {
        return core;
      };
    });
    var ignoreDsr;
    function resetIgnoreDsr() {
      ignoreDsr = undefined;
    }
    angular.module('ct.ui.router.extras.dsr', ['ct.ui.router.extras.core']).config(["$provide", function($provide) {
      var $state_transitionTo;
      $provide.decorator("$state", ['$delegate', '$q', function($state, $q) {
        $state_transitionTo = $state.transitionTo;
        $state.transitionTo = function(to, toParams, options) {
          if (options.ignoreDsr) {
            ignoreDsr = options.ignoreDsr;
          }
          return $state_transitionTo.apply($state, arguments).then(function(result) {
            resetIgnoreDsr();
            return result;
          }, function(err) {
            resetIgnoreDsr();
            return $q.reject(err);
          });
        };
        return $state;
      }]);
    }]);
    angular.module('ct.ui.router.extras.dsr').service("$deepStateRedirect", ['$rootScope', '$state', '$injector', function($rootScope, $state, $injector) {
      var lastSubstate = {};
      var deepStateRedirectsByName = {};
      var REDIRECT = "Redirect",
          ANCESTOR_REDIRECT = "AncestorRedirect";
      function computeDeepStateStatus(state) {
        var name = state.name;
        if (deepStateRedirectsByName.hasOwnProperty(name))
          return deepStateRedirectsByName[name];
        recordDeepStateRedirectStatus(name);
      }
      function getConfig(state) {
        var declaration = state.deepStateRedirect || state.dsr;
        if (!declaration)
          return {dsr: false};
        var dsrCfg = {dsr: true};
        if (angular.isFunction(declaration)) {
          dsrCfg.fn = declaration;
        } else if (angular.isObject(declaration)) {
          dsrCfg = angular.extend(dsrCfg, declaration);
        }
        if (angular.isString(dsrCfg.default)) {
          dsrCfg.default = {state: dsrCfg.default};
        }
        if (!dsrCfg.fn) {
          dsrCfg.fn = ['$dsr$', function($dsr$) {
            return $dsr$.redirect.state != $dsr$.to.state;
          }];
        }
        return dsrCfg;
      }
      function recordDeepStateRedirectStatus(stateName) {
        var state = $state.get(stateName);
        if (!state)
          return false;
        var cfg = getConfig(state);
        if (cfg.dsr) {
          deepStateRedirectsByName[state.name] = REDIRECT;
          if (lastSubstate[stateName] === undefined)
            lastSubstate[stateName] = {};
        }
        var parent = state.$$state && state.$$state().parent;
        if (parent) {
          var parentStatus = recordDeepStateRedirectStatus(parent.self.name);
          if (parentStatus && deepStateRedirectsByName[state.name] === undefined) {
            deepStateRedirectsByName[state.name] = ANCESTOR_REDIRECT;
          }
        }
        return deepStateRedirectsByName[state.name] || false;
      }
      function getMatchParams(params, dsrParams) {
        if (dsrParams === true)
          dsrParams = Object.keys(params);
        if (dsrParams === null || dsrParams === undefined)
          dsrParams = [];
        var matchParams = {};
        angular.forEach(dsrParams.sort(), function(name) {
          matchParams[name] = params[name];
        });
        return matchParams;
      }
      function getParamsString(params, dsrParams) {
        var matchParams = getMatchParams(params, dsrParams);
        function safeString(input) {
          return !input ? input : input.toString();
        }
        var paramsToString = {};
        angular.forEach(matchParams, function(val, name) {
          paramsToString[name] = safeString(val);
        });
        return angular.toJson(paramsToString);
      }
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        var cfg = getConfig(toState);
        if (ignoreDsr || (computeDeepStateStatus(toState) !== REDIRECT) && !cfg.default)
          return ;
        var key = getParamsString(toParams, cfg.params);
        var redirect = lastSubstate[toState.name][key] || cfg.default;
        if (!redirect)
          return ;
        var $dsr$ = {
          redirect: {
            state: redirect.state,
            params: redirect.params
          },
          to: {
            state: toState.name,
            params: toParams
          }
        };
        var result = $injector.invoke(cfg.fn, toState, {$dsr$: $dsr$});
        if (!result)
          return ;
        if (result.state)
          redirect = result;
        event.preventDefault();
        var redirectParams = getMatchParams(toParams, cfg.params);
        $state.go(redirect.state, angular.extend(redirectParams, redirect.params));
      });
      $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        var deepStateStatus = computeDeepStateStatus(toState);
        if (deepStateStatus) {
          var name = toState.name;
          angular.forEach(lastSubstate, function(redirect, dsrState) {
            var cfg = getConfig($state.get(dsrState));
            var key = getParamsString(toParams, cfg.params);
            if (name == dsrState || name.indexOf(dsrState + ".") != -1) {
              lastSubstate[dsrState][key] = {
                state: name,
                params: angular.copy(toParams)
              };
            }
          });
        }
      });
      return {reset: function(stateOrName, params) {
          if (!stateOrName) {
            angular.forEach(lastSubstate, function(redirect, dsrState) {
              lastSubstate[dsrState] = {};
            });
          } else {
            var state = $state.get(stateOrName);
            if (!state)
              throw new Error("Unknown state: " + stateOrName);
            if (lastSubstate[state.name]) {
              if (params) {
                var key = getParamsString(params, getConfig(state).params);
                delete lastSubstate[state.name][key];
              } else {
                lastSubstate[state.name] = {};
              }
            }
          }
        }};
    }]);
    angular.module('ct.ui.router.extras.dsr').run(['$deepStateRedirect', function($deepStateRedirect) {}]);
    angular.module("ct.ui.router.extras.sticky", ['ct.ui.router.extras.core']);
    var mod_sticky = angular.module("ct.ui.router.extras.sticky");
    $StickyStateProvider.$inject = ['$stateProvider', 'uirextras_coreProvider'];
    function $StickyStateProvider($stateProvider, uirextras_coreProvider) {
      var core = uirextras_coreProvider;
      var inheritParams = core.inheritParams;
      var protoKeys = core.protoKeys;
      var map = core.map;
      var inactiveStates = {};
      var stickyStates = {};
      var $state;
      var DEBUG = false;
      this.registerStickyState = function(state) {
        stickyStates[state.name] = state;
      };
      this.enableDebug = this.debugMode = function(enabled) {
        if (angular.isDefined(enabled))
          DEBUG = enabled;
        return DEBUG;
      };
      this.$get = ['$rootScope', '$state', '$stateParams', '$injector', '$log', function($rootScope, $state, $stateParams, $injector, $log) {
        function mapInactives() {
          var mappedStates = {};
          angular.forEach(inactiveStates, function(state, name) {
            var stickyAncestors = getStickyStateStack(state);
            for (var i = 0; i < stickyAncestors.length; i++) {
              var parent = stickyAncestors[i].parent;
              mappedStates[parent.name] = mappedStates[parent.name] || [];
              mappedStates[parent.name].push(state);
            }
            if (mappedStates['']) {
              mappedStates['__inactives'] = mappedStates[''];
            }
          });
          return mappedStates;
        }
        function getStickyStateStack(state) {
          var stack = [];
          if (!state)
            return stack;
          do {
            if (state.sticky)
              stack.push(state);
            state = state.parent;
          } while (state);
          stack.reverse();
          return stack;
        }
        function getStickyTransitionType(fromPath, toPath, keep) {
          if (fromPath[keep] === toPath[keep])
            return {
              from: false,
              to: false
            };
          var stickyFromState = keep < fromPath.length && fromPath[keep].self.sticky;
          var stickyToState = keep < toPath.length && toPath[keep].self.sticky;
          return {
            from: stickyFromState,
            to: stickyToState
          };
        }
        function getEnterTransition(state, stateParams, reloadStateTree, ancestorParamsChanged) {
          if (ancestorParamsChanged)
            return "updateStateParams";
          var inactiveState = inactiveStates[state.self.name];
          if (!inactiveState)
            return "enter";
          if (state.self === reloadStateTree)
            return "updateStateParams";
          var paramsMatch = equalForKeys(stateParams, inactiveState.locals.globals.$stateParams, state.ownParams);
          return paramsMatch ? "reactivate" : "updateStateParams";
        }
        function getInactivatedState(state, stateParams) {
          var inactiveState = inactiveStates[state.name];
          if (!inactiveState)
            return null;
          if (!stateParams)
            return inactiveState;
          var paramsMatch = equalForKeys(stateParams, inactiveState.locals.globals.$stateParams, state.ownParams);
          return paramsMatch ? inactiveState : null;
        }
        function equalForKeys(a, b, keys) {
          if (!angular.isArray(keys) && angular.isObject(keys)) {
            keys = protoKeys(keys, ["$$keys", "$$values", "$$equals", "$$validates", "$$new", "$$parent"]);
          }
          if (!keys) {
            keys = [];
            for (var n in a)
              keys.push(n);
          }
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (a[k] != b[k])
              return false;
          }
          return true;
        }
        var stickySupport = {
          getInactiveStates: function() {
            var states = [];
            angular.forEach(inactiveStates, function(state) {
              states.push(state);
            });
            return states;
          },
          getInactiveStatesByParent: function() {
            return mapInactives();
          },
          processTransition: function(transition) {
            var result = {
              inactives: [],
              enter: [],
              exit: [],
              keep: 0
            };
            var fromPath = transition.fromState.path,
                fromParams = transition.fromParams,
                toPath = transition.toState.path,
                toParams = transition.toParams,
                reloadStateTree = transition.reloadStateTree,
                options = transition.options;
            var keep = 0,
                state = toPath[keep];
            if (options.inherit) {
              toParams = inheritParams($stateParams, toParams || {}, $state.$current, transition.toState);
            }
            while (state && state === fromPath[keep] && equalForKeys(toParams, fromParams, state.ownParams)) {
              state = toPath[++keep];
            }
            result.keep = keep;
            var idx,
                deepestUpdatedParams,
                deepestReactivate,
                noLongerInactiveStates = {},
                pType = getStickyTransitionType(fromPath, toPath, keep);
            var ancestorUpdated = !!options.reload;
            for (idx = keep; idx < toPath.length; idx++) {
              var enterTrans = !pType.to ? "enter" : getEnterTransition(toPath[idx], toParams, reloadStateTree, ancestorUpdated);
              ancestorUpdated = (ancestorUpdated || enterTrans == 'updateStateParams');
              result.enter[idx] = enterTrans;
              if (enterTrans == 'reactivate')
                deepestReactivate = noLongerInactiveStates[toPath[idx].name] = toPath[idx];
              if (enterTrans == 'updateStateParams')
                deepestUpdatedParams = noLongerInactiveStates[toPath[idx].name] = toPath[idx];
            }
            deepestReactivate = deepestReactivate ? deepestReactivate.self.name + "." : "";
            deepestUpdatedParams = deepestUpdatedParams ? deepestUpdatedParams.self.name + "." : "";
            var inactivesByParent = mapInactives();
            var keptStateNames = [""].concat(map(fromPath.slice(0, keep), function(state) {
              return state.self.name;
            }));
            angular.forEach(keptStateNames, function(name) {
              var inactiveChildren = inactivesByParent[name];
              for (var i = 0; inactiveChildren && i < inactiveChildren.length; i++) {
                var child = inactiveChildren[i];
                if (!noLongerInactiveStates[child.name] && (!deepestReactivate || (child.self.name.indexOf(deepestReactivate) !== 0)) && (!deepestUpdatedParams || (child.self.name.indexOf(deepestUpdatedParams) !== 0)))
                  result.inactives.push(child);
              }
            });
            for (idx = keep; idx < fromPath.length; idx++) {
              var exitTrans = "exit";
              if (pType.from) {
                result.inactives.push(fromPath[idx]);
                exitTrans = "inactivate";
              }
              result.exit[idx] = exitTrans;
            }
            return result;
          },
          stateInactivated: function(state) {
            inactiveStates[state.self.name] = state;
            state.self.status = 'inactive';
            if (state.self.onInactivate)
              $injector.invoke(state.self.onInactivate, state.self, state.locals.globals);
          },
          stateReactivated: function(state) {
            if (inactiveStates[state.self.name]) {
              delete inactiveStates[state.self.name];
            }
            state.self.status = 'entered';
            if (state.self.onReactivate)
              $injector.invoke(state.self.onReactivate, state.self, state.locals.globals);
          },
          stateExiting: function(exiting, exitQueue, onExit) {
            var exitingNames = {};
            angular.forEach(exitQueue, function(state) {
              exitingNames[state.self.name] = true;
            });
            angular.forEach(inactiveStates, function(inactiveExiting, name) {
              if (!exitingNames[name] && inactiveExiting.includes[exiting.name]) {
                if (DEBUG)
                  $log.debug("Exiting " + name + " because it's a substate of " + exiting.name + " and wasn't found in ", exitingNames);
                if (inactiveExiting.self.onExit)
                  $injector.invoke(inactiveExiting.self.onExit, inactiveExiting.self, inactiveExiting.locals.globals);
                angular.forEach(inactiveExiting.locals, function(localval, key) {
                  delete inactivePseudoState.locals[key];
                });
                inactiveExiting.locals = null;
                inactiveExiting.self.status = 'exited';
                delete inactiveStates[name];
              }
            });
            if (onExit)
              $injector.invoke(onExit, exiting.self, exiting.locals.globals);
            exiting.locals = null;
            exiting.self.status = 'exited';
            delete inactiveStates[exiting.self.name];
          },
          stateEntering: function(entering, params, onEnter, updateParams) {
            var inactivatedState = getInactivatedState(entering);
            if (inactivatedState && (updateParams || !getInactivatedState(entering, params))) {
              var savedLocals = entering.locals;
              this.stateExiting(inactivatedState);
              entering.locals = savedLocals;
            }
            entering.self.status = 'entered';
            if (onEnter)
              $injector.invoke(onEnter, entering.self, entering.locals.globals);
          },
          reset: function reset(inactiveState, params) {
            var state = $state.get(inactiveState);
            var exiting = getInactivatedState(state, params);
            if (!exiting)
              return false;
            stickySupport.stateExiting(exiting);
            $rootScope.$broadcast("$viewContentLoading");
            return true;
          }
        };
        return stickySupport;
      }];
    }
    mod_sticky.provider("$stickyState", $StickyStateProvider);
    var _StickyState;
    var internalStates = {};
    var root,
        pendingTransitions = [],
        pendingRestore,
        inactivePseudoState,
        versionHeuristics = {hasParamSet: false};
    function SurrogateState(type) {
      return {
        resolve: {},
        locals: {globals: root && root.locals && root.locals.globals},
        views: {},
        self: {},
        params: {},
        ownParams: (versionHeuristics.hasParamSet ? {$$equals: function() {
            return true;
          }} : []),
        surrogateType: type
      };
    }
    angular.module("ct.ui.router.extras.sticky").run(["$stickyState", function($stickyState) {
      _StickyState = $stickyState;
    }]);
    angular.module("ct.ui.router.extras.sticky").config(["$provide", "$stateProvider", '$stickyStateProvider', '$urlMatcherFactoryProvider', 'uirextras_coreProvider', function($provide, $stateProvider, $stickyStateProvider, $urlMatcherFactoryProvider, uirextras_coreProvider) {
      var core = uirextras_coreProvider;
      var internalStates = core.internalStates;
      var inherit = core.inherit;
      var inheritParams = core.inheritParams;
      var map = core.map;
      var filterObj = core.filterObj;
      versionHeuristics.hasParamSet = !!$urlMatcherFactoryProvider.ParamSet;
      inactivePseudoState = angular.extend(new SurrogateState("__inactives"), {self: {name: '__inactives'}});
      root = pendingRestore = undefined;
      pendingTransitions = [];
      uirextras_coreProvider.onStateRegistered(function(state) {
        if (state.self.sticky === true) {
          $stickyStateProvider.registerStickyState(state.self);
        }
      });
      var $state_transitionTo;
      $provide.decorator("$state", ['$delegate', '$log', '$q', function($state, $log, $q) {
        root = $state.$current;
        internalStates[""] = root;
        root.parent = inactivePseudoState;
        inactivePseudoState.parent = undefined;
        root.locals = inherit(inactivePseudoState.locals, root.locals);
        delete inactivePseudoState.locals.globals;
        $state_transitionTo = $state.transitionTo;
        $state.transitionTo = function(to, toParams, options) {
          var DEBUG = $stickyStateProvider.debugMode();
          if (!inactivePseudoState.locals)
            inactivePseudoState.locals = root.locals;
          var idx = pendingTransitions.length;
          if (pendingRestore) {
            pendingRestore();
            if (DEBUG) {
              $log.debug("Restored paths from pending transition");
            }
          }
          var fromState = $state.$current,
              fromParams = $state.params;
          var rel = options && options.relative || $state.$current;
          var toStateSelf = $state.get(to, rel);
          var savedToStatePath,
              savedFromStatePath,
              stickyTransitions;
          var reactivated = [],
              exited = [],
              terminalReactivatedState;
          toParams = toParams || {};
          arguments[1] = toParams;
          var noop = function() {};
          var restore = function() {
            if (savedToStatePath) {
              toState.path = savedToStatePath;
              savedToStatePath = null;
            }
            if (savedFromStatePath) {
              fromState.path = savedFromStatePath;
              savedFromStatePath = null;
            }
            angular.forEach(restore.restoreFunctions, function(restoreFunction) {
              restoreFunction();
            });
            restore = noop;
            pendingRestore = null;
            pendingTransitions.splice(idx, 1);
          };
          restore.restoreFunctions = [];
          restore.addRestoreFunction = function addRestoreFunction(fn) {
            this.restoreFunctions.push(fn);
          };
          function stateReactivatedSurrogatePhase1(state) {
            var surrogate = angular.extend(new SurrogateState("reactivate_phase1"), {locals: state.locals});
            surrogate.self = angular.extend({}, state.self);
            return surrogate;
          }
          function stateReactivatedSurrogatePhase2(state) {
            var surrogate = angular.extend(new SurrogateState("reactivate_phase2"), state);
            var oldOnEnter = surrogate.self.onEnter;
            surrogate.resolve = {};
            surrogate.views = {};
            surrogate.self.onEnter = function() {
              surrogate.locals = state.locals;
              _StickyState.stateReactivated(state);
            };
            restore.addRestoreFunction(function() {
              state.self.onEnter = oldOnEnter;
            });
            return surrogate;
          }
          function stateInactivatedSurrogate(state) {
            var surrogate = new SurrogateState("inactivate");
            surrogate.self = state.self;
            var oldOnExit = state.self.onExit;
            surrogate.self.onExit = function() {
              _StickyState.stateInactivated(state);
            };
            restore.addRestoreFunction(function() {
              state.self.onExit = oldOnExit;
            });
            return surrogate;
          }
          function stateEnteredSurrogate(state, toParams) {
            var oldOnEnter = state.self.onEnter;
            state.self.onEnter = function() {
              _StickyState.stateEntering(state, toParams, oldOnEnter);
            };
            restore.addRestoreFunction(function() {
              state.self.onEnter = oldOnEnter;
            });
            return state;
          }
          function stateUpdateParamsSurrogate(state, toParams) {
            var oldOnEnter = state.self.onEnter;
            state.self.onEnter = function() {
              _StickyState.stateEntering(state, toParams, oldOnEnter, true);
            };
            restore.addRestoreFunction(function() {
              state.self.onEnter = oldOnEnter;
            });
            return state;
          }
          function stateExitedSurrogate(state) {
            var oldOnExit = state.self.onExit;
            state.self.onExit = function() {
              _StickyState.stateExiting(state, exited, oldOnExit);
            };
            restore.addRestoreFunction(function() {
              state.self.onExit = oldOnExit;
            });
            return state;
          }
          if (toStateSelf) {
            var toState = internalStates[toStateSelf.name];
            if (toState) {
              savedToStatePath = toState.path;
              savedFromStatePath = fromState.path;
              var reload = options && options.reload || false;
              var reloadStateTree = reload && (reload === true ? savedToStatePath[0].self : $state.get(reload, rel));
              if (options && reload && reload !== true)
                delete options.reload;
              var currentTransition = {
                toState: toState,
                toParams: toParams || {},
                fromState: fromState,
                fromParams: fromParams || {},
                options: options,
                reloadStateTree: reloadStateTree
              };
              pendingTransitions.push(currentTransition);
              pendingRestore = restore;
              if (reloadStateTree) {
                currentTransition.toParams.$$uirouterextrasreload = Math.random();
                var params = reloadStateTree.$$state().params;
                var ownParams = reloadStateTree.$$state().ownParams;
                if (versionHeuristics.hasParamSet) {
                  var tempParam = new $urlMatcherFactoryProvider.Param('$$uirouterextrasreload');
                  params.$$uirouterextrasreload = ownParams.$$uirouterextrasreload = tempParam;
                  restore.restoreFunctions.push(function() {
                    delete params.$$uirouterextrasreload;
                    delete ownParams.$$uirouterextrasreload;
                  });
                } else {
                  params.push('$$uirouterextrasreload');
                  ownParams.push('$$uirouterextrasreload');
                  restore.restoreFunctions.push(function() {
                    params.length = params.length - 1;
                    ownParams.length = ownParams.length - 1;
                  });
                }
              }
              stickyTransitions = _StickyState.processTransition(currentTransition);
              if (DEBUG)
                debugTransition($log, currentTransition, stickyTransitions);
              var surrogateToPath = toState.path.slice(0, stickyTransitions.keep);
              var surrogateFromPath = fromState.path.slice(0, stickyTransitions.keep);
              angular.forEach(inactivePseudoState.locals, function(local, name) {
                if (name.indexOf("@") != -1)
                  delete inactivePseudoState.locals[name];
              });
              for (var i = 0; i < stickyTransitions.inactives.length; i++) {
                var iLocals = stickyTransitions.inactives[i].locals;
                angular.forEach(iLocals, function(view, name) {
                  if (iLocals.hasOwnProperty(name) && name.indexOf("@") != -1) {
                    inactivePseudoState.locals[name] = view;
                  }
                });
              }
              angular.forEach(stickyTransitions.enter, function(value, idx) {
                var surrogate;
                var enteringState = toState.path[idx];
                if (value === "reactivate") {
                  surrogate = stateReactivatedSurrogatePhase1(enteringState);
                  surrogateToPath.push(surrogate);
                  surrogateFromPath.push(surrogate);
                  reactivated.push(stateReactivatedSurrogatePhase2(enteringState));
                  terminalReactivatedState = enteringState;
                } else if (value === "updateStateParams") {
                  surrogate = stateUpdateParamsSurrogate(enteringState);
                  surrogateToPath.push(surrogate);
                  terminalReactivatedState = enteringState;
                } else if (value === "enter") {
                  surrogateToPath.push(stateEnteredSurrogate(enteringState));
                }
              });
              angular.forEach(stickyTransitions.exit, function(value, idx) {
                var exiting = fromState.path[idx];
                if (value === "inactivate") {
                  surrogateFromPath.push(stateInactivatedSurrogate(exiting));
                  exited.push(exiting);
                } else if (value === "exit") {
                  surrogateFromPath.push(stateExitedSurrogate(exiting));
                  exited.push(exiting);
                }
              });
              if (reactivated.length) {
                angular.forEach(reactivated, function(surrogate) {
                  surrogateToPath.push(surrogate);
                });
              }
              if (toState === terminalReactivatedState) {
                var prefix = terminalReactivatedState.self.name + ".";
                var inactiveStates = _StickyState.getInactiveStates();
                var inactiveOrphans = [];
                inactiveStates.forEach(function(exiting) {
                  if (exiting.self.name.indexOf(prefix) === 0) {
                    inactiveOrphans.push(exiting);
                  }
                });
                inactiveOrphans.sort();
                inactiveOrphans.reverse();
                surrogateFromPath = surrogateFromPath.concat(map(inactiveOrphans, function(exiting) {
                  return stateExitedSurrogate(exiting);
                }));
                exited = exited.concat(inactiveOrphans);
              }
              toState.path = surrogateToPath;
              fromState.path = surrogateFromPath;
              var pathMessage = function(state) {
                return (state.surrogateType ? state.surrogateType + ":" : "") + state.self.name;
              };
              if (DEBUG)
                $log.debug("SurrogateFromPath: ", map(surrogateFromPath, pathMessage));
              if (DEBUG)
                $log.debug("SurrogateToPath:   ", map(surrogateToPath, pathMessage));
            }
          }
          var transitionPromise = $state_transitionTo.apply($state, arguments);
          return transitionPromise.then(function transitionSuccess(state) {
            restore();
            if (DEBUG)
              debugViewsAfterSuccess($log, internalStates[state.name], $state);
            state.status = 'active';
            return state;
          }, function transitionFailed(err) {
            restore();
            if (DEBUG && err.message !== "transition prevented" && err.message !== "transition aborted" && err.message !== "transition superseded") {
              $log.debug("transition failed", err);
              console.log(err.stack);
            }
            return $q.reject(err);
          });
        };
        return $state;
      }]);
      function debugTransition($log, currentTransition, stickyTransition) {
        function message(path, index, state) {
          return (path[index] ? path[index].toUpperCase() + ": " + state.self.name : "(" + state.self.name + ")");
        }
        var inactiveLogVar = map(stickyTransition.inactives, function(state) {
          return state.self.name;
        });
        var enterLogVar = map(currentTransition.toState.path, function(state, index) {
          return message(stickyTransition.enter, index, state);
        });
        var exitLogVar = map(currentTransition.fromState.path, function(state, index) {
          return message(stickyTransition.exit, index, state);
        });
        var transitionMessage = currentTransition.fromState.self.name + ": " + angular.toJson(currentTransition.fromParams) + ": " + " -> " + currentTransition.toState.self.name + ": " + angular.toJson(currentTransition.toParams);
        $log.debug("   Current transition: ", transitionMessage);
        $log.debug("Before transition, inactives are:   : ", map(_StickyState.getInactiveStates(), function(s) {
          return s.self.name;
        }));
        $log.debug("After transition,  inactives will be: ", inactiveLogVar);
        $log.debug("Transition will exit:  ", exitLogVar);
        $log.debug("Transition will enter: ", enterLogVar);
      }
      function debugViewsAfterSuccess($log, currentState, $state) {
        $log.debug("Current state: " + currentState.self.name + ", inactive states: ", map(_StickyState.getInactiveStates(), function(s) {
          return s.self.name;
        }));
        var viewMsg = function(local, name) {
          return "'" + name + "' (" + local.$$state.name + ")";
        };
        var statesOnly = function(local, name) {
          return name != 'globals' && name != 'resolve';
        };
        var viewsForState = function(state) {
          var views = map(filterObj(state.locals, statesOnly), viewMsg).join(", ");
          return "(" + (state.self.name ? state.self.name : "root") + ".locals" + (views.length ? ": " + views : "") + ")";
        };
        var message = viewsForState(currentState);
        var parent = currentState.parent;
        while (parent && parent !== currentState) {
          if (parent.self.name === "") {
            message = viewsForState($state.$current.path[0]) + " / " + message;
          }
          message = viewsForState(parent) + " / " + message;
          currentState = parent;
          parent = currentState.parent;
        }
        $log.debug("Views: " + message);
      }
    }]);
    (function(angular, undefined) {
      var app = angular.module('ct.ui.router.extras.future', ['ct.ui.router.extras.core']);
      _futureStateProvider.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', 'uirextras_coreProvider'];
      function _futureStateProvider($stateProvider, $urlRouterProvider, $urlMatcherFactory, uirextras_coreProvider) {
        var core = uirextras_coreProvider;
        var internalStates = core.internalStates;
        var stateFactories = {},
            futureStates = {};
        var lazyloadInProgress = false,
            resolveFunctions = [],
            initPromise,
            initDone = false;
        var provider = this;
        this.addResolve = function(promiseFn) {
          resolveFunctions.push(promiseFn);
        };
        this.stateFactory = function(futureStateType, factory) {
          stateFactories[futureStateType] = factory;
        };
        this.futureState = function(futureState) {
          if (futureState.stateName)
            futureState.name = futureState.stateName;
          if (futureState.urlPrefix)
            futureState.url = "^" + futureState.urlPrefix;
          futureStates[futureState.name] = futureState;
          var parentMatcher,
              parentName = futureState.name.split(/\./).slice(0, -1).join("."),
              realParent = findState(futureState.parent || parentName);
          if (realParent) {
            parentMatcher = realParent.url || realParent.navigable.url;
          } else if (parentName === "") {
            parentMatcher = $urlMatcherFactory.compile("");
          } else {
            var futureParent = findState((futureState.parent || parentName), true);
            if (!futureParent)
              throw new Error("Couldn't determine parent state of future state. FutureState:" + angular.toJson(futureState));
            var pattern = futureParent.urlMatcher.source.replace(/\*rest$/, "");
            parentMatcher = $urlMatcherFactory.compile(pattern);
            futureState.parentFutureState = futureParent;
          }
          if (futureState.url) {
            futureState.urlMatcher = futureState.url.charAt(0) === "^" ? $urlMatcherFactory.compile(futureState.url.substring(1) + "*rest") : parentMatcher.concat(futureState.url + "*rest");
          }
        };
        this.get = function() {
          return angular.extend({}, futureStates);
        };
        function findState(stateOrName, findFutureState) {
          var statename = angular.isObject(stateOrName) ? stateOrName.name : stateOrName;
          return !findFutureState ? internalStates[statename] : futureStates[statename];
        }
        function findFutureState($state, options) {
          if (options.name) {
            var nameComponents = options.name.split(/\./);
            if (options.name.charAt(0) === '.')
              nameComponents[0] = $state.current.name;
            while (nameComponents.length) {
              var stateName = nameComponents.join(".");
              if ($state.get(stateName, {relative: $state.current}))
                return null;
              if (futureStates[stateName])
                return futureStates[stateName];
              nameComponents.pop();
            }
          }
          if (options.url) {
            var matches = [];
            for (var future in futureStates) {
              var matcher = futureStates[future].urlMatcher;
              if (matcher && matcher.exec(options.url)) {
                matches.push(futureStates[future]);
              }
            }
            var copy = matches.slice(0);
            for (var i = matches.length - 1; i >= 0; i--) {
              for (var j = 0; j < copy.length; j++) {
                if (matches[i] === copy[j].parentFutureState)
                  matches.splice(i, 1);
              }
            }
            return matches[0];
          }
        }
        function lazyLoadState($injector, futureState) {
          lazyloadInProgress = true;
          var $q = $injector.get("$q");
          if (!futureState) {
            var deferred = $q.defer();
            deferred.reject("No lazyState passed in " + futureState);
            return deferred.promise;
          }
          var promise = $q.when([]),
              parentFuture = futureState.parentFutureState;
          if (parentFuture && futureStates[parentFuture.name]) {
            promise = lazyLoadState($injector, futureStates[parentFuture.name]);
          }
          var type = futureState.type;
          var factory = stateFactories[type];
          if (!factory)
            throw Error("No state factory for futureState.type: " + (futureState && futureState.type));
          return promise.then(function(array) {
            var injectorPromise = $injector.invoke(factory, factory, {futureState: futureState});
            return injectorPromise.then(function(fullState) {
              if (fullState) {
                array.push(fullState);
              }
              return array;
            });
          })["finally"](function() {
            delete(futureStates[futureState.name]);
          });
        }
        var otherwiseFunc = ['$log', '$location', function otherwiseFunc($log, $location) {
          $log.debug("Unable to map " + $location.path());
        }];
        function futureState_otherwise($injector, $location) {
          var resyncing = false;
          var lazyLoadMissingState = ['$rootScope', '$urlRouter', '$state', function lazyLoadMissingState($rootScope, $urlRouter, $state) {
            function resync() {
              resyncing = true;
              $urlRouter.sync();
              resyncing = false;
            }
            if (!initDone) {
              initPromise().then(resync);
              initDone = true;
              return ;
            }
            var futureState = findFutureState($state, {url: $location.path()});
            if (!futureState) {
              return $injector.invoke(otherwiseFunc);
            }
            lazyLoadState($injector, futureState).then(function lazyLoadedStateCallback(states) {
              states.forEach(function(state) {
                if (state && (!$state.get(state) || (state.name && !$state.get(state.name))))
                  $stateProvider.state(state);
              });
              lazyloadInProgress = false;
              resync();
            }, function lazyLoadStateAborted() {
              lazyloadInProgress = false;
              resync();
            });
          }];
          if (lazyloadInProgress)
            return ;
          var nextFn = resyncing ? otherwiseFunc : lazyLoadMissingState;
          return $injector.invoke(nextFn);
        }
        $urlRouterProvider.otherwise(futureState_otherwise);
        $urlRouterProvider.otherwise = function(rule) {
          if (angular.isString(rule)) {
            var redirect = rule;
            rule = function() {
              return redirect;
            };
          } else if (!angular.isFunction(rule))
            throw new Error("'rule' must be a function");
          otherwiseFunc = ['$injector', '$location', rule];
          return $urlRouterProvider;
        };
        var serviceObject = {getResolvePromise: function() {
            return initPromise();
          }};
        this.$get = ['$injector', '$state', '$q', '$rootScope', '$urlRouter', '$timeout', '$log', function futureStateProvider_get($injector, $state, $q, $rootScope, $urlRouter, $timeout, $log) {
          function init() {
            $rootScope.$on("$stateNotFound", function futureState_notFound(event, unfoundState, fromState, fromParams) {
              if (lazyloadInProgress)
                return ;
              $log.debug("event, unfoundState, fromState, fromParams", event, unfoundState, fromState, fromParams);
              var futureState = findFutureState($state, {name: unfoundState.to});
              if (!futureState)
                return ;
              event.preventDefault();
              var promise = lazyLoadState($injector, futureState);
              promise.then(function(states) {
                states.forEach(function(state) {
                  if (state && (!$state.get(state) || (state.name && !$state.get(state.name))))
                    $stateProvider.state(state);
                });
                $state.go(unfoundState.to, unfoundState.toParams);
                lazyloadInProgress = false;
              }, function(error) {
                console.log("failed to lazy load state ", error);
                $state.go(fromState, fromParams);
                lazyloadInProgress = false;
              });
            });
            if (!initPromise) {
              var promises = [];
              angular.forEach(resolveFunctions, function(promiseFn) {
                promises.push($injector.invoke(promiseFn));
              });
              initPromise = function() {
                return $q.all(promises);
              };
            }
            initPromise().then(function retryInitialState() {
              $timeout(function() {
                if ($state.transition) {
                  $state.transition.then($urlRouter.sync, $urlRouter.sync);
                } else {
                  $urlRouter.sync();
                }
              });
            });
          }
          init();
          serviceObject.state = $stateProvider.state;
          serviceObject.futureState = provider.futureState;
          serviceObject.get = provider.get;
          return serviceObject;
        }];
      }
      app.provider('$futureState', _futureStateProvider);
      var statesAddedQueue = {
        state: function(state) {
          if (statesAddedQueue.$rootScope)
            statesAddedQueue.$rootScope.$broadcast("$stateAdded", state);
        },
        itsNowRuntimeOhWhatAHappyDay: function($rootScope) {
          statesAddedQueue.$rootScope = $rootScope;
        },
        $rootScope: undefined
      };
      app.config(['$stateProvider', function($stateProvider) {
        var realStateFn = $stateProvider.state;
        $stateProvider.state = function state_announce() {
          var val = realStateFn.apply($stateProvider, arguments);
          var state = angular.isObject(arguments[0]) ? arguments[0] : arguments[1];
          statesAddedQueue.state(state);
          return val;
        };
      }]);
      app.run(['$futureState', function($futureState, $rootScope) {
        statesAddedQueue.itsNowRuntimeOhWhatAHappyDay($rootScope);
      }]);
    })(angular);
    angular.module('ct.ui.router.extras.previous', ['ct.ui.router.extras.core', 'ct.ui.router.extras.transition']).service("$previousState", ['$rootScope', '$state', function($rootScope, $state) {
      var previous = null,
          lastPrevious = null,
          memos = {};
      $rootScope.$on("$transitionStart", function(evt, $transition$) {
        var from = $transition$.from;
        var fromState = from.state && from.state.$$state && from.state.$$state();
        if (fromState && fromState.navigable) {
          lastPrevious = previous;
          previous = $transition$.from;
        }
        $transition$.promise.then(commit).catch(revert);
        function commit() {
          lastPrevious = null;
        }
        function revert() {
          previous = lastPrevious;
        }
      });
      var $previousState = {
        get: function(memoName) {
          return memoName ? memos[memoName] : previous;
        },
        go: function(memoName, options) {
          var to = $previousState.get(memoName);
          return $state.go(to.state, to.params, options);
        },
        memo: function(memoName, defaultStateName, defaultStateParams) {
          memos[memoName] = previous || {
            state: $state.get(defaultStateName),
            params: defaultStateParams
          };
        },
        forget: function(memoName) {
          if (memoName) {
            delete memos[memoName];
          } else {
            previous = undefined;
          }
        }
      };
      return $previousState;
    }]);
    angular.module('ct.ui.router.extras.previous').run(['$previousState', function($previousState) {}]);
    angular.module("ct.ui.router.extras.transition", ['ct.ui.router.extras.core']).config(["$provide", function($provide) {
      $provide.decorator("$state", ['$delegate', '$rootScope', '$q', '$injector', function($state, $rootScope, $q, $injector) {
        var $state_transitionTo = $state.transitionTo;
        var transitionDepth = -1;
        var tDataStack = [];
        var restoreFnStack = [];
        function decorateInjector(tData) {
          var oldinvoke = $injector.invoke;
          var oldinstantiate = $injector.instantiate;
          $injector.invoke = function(fn, self, locals) {
            return oldinvoke(fn, self, angular.extend({$transition$: tData}, locals));
          };
          $injector.instantiate = function(fn, locals) {
            return oldinstantiate(fn, angular.extend({$transition$: tData}, locals));
          };
          return function restoreItems() {
            $injector.invoke = oldinvoke;
            $injector.instantiate = oldinstantiate;
          };
        }
        function popStack() {
          restoreFnStack.pop()();
          tDataStack.pop();
          transitionDepth--;
        }
        function transitionSuccess(deferred, tSuccess) {
          return function successFn(data) {
            popStack();
            $rootScope.$broadcast("$transitionSuccess", tSuccess);
            deferred.resolve(data);
            return data;
          };
        }
        function transitionFailure(deferred, tFail) {
          return function failureFn(error) {
            popStack();
            $rootScope.$broadcast("$transitionError", tFail, error);
            deferred.reject(error);
            return $q.reject(error);
          };
        }
        $state.transitionTo = function(to, toParams, options) {
          var deferred = $q.defer();
          var tData = tDataStack[++transitionDepth] = {promise: deferred.promise};
          restoreFnStack[transitionDepth] = function() {};
          var tPromise = $state_transitionTo.apply($state, arguments);
          return tPromise.then(transitionSuccess(deferred, tData), transitionFailure(deferred, tData));
        };
        $rootScope.$on("$stateChangeStart", function(evt, toState, toParams, fromState, fromParams) {
          var depth = transitionDepth;
          var tData = angular.extend(tDataStack[depth], {
            to: {
              state: toState,
              params: toParams
            },
            from: {
              state: fromState,
              params: fromParams
            }
          });
          var restoreFn = decorateInjector(tData);
          restoreFnStack[depth] = restoreFn;
          $rootScope.$broadcast("$transitionStart", tData);
        });
        return $state;
      }]);
    }]);
    (function() {
      "use strict";
      var app = angular.module("ct.ui.router.extras.statevis", ['ct.ui.router.extras.core', 'ct.ui.router.extras.sticky']);
      app.directive('stateVis', ['$state', '$timeout', '$interval', stateVisDirective]);
      function stateVisDirective($state, $timeout, $interval) {
        return {
          scope: {
            width: '@',
            height: '@'
          },
          restrict: 'AE',
          template: '<svg></svg>',
          link: function(_scope, _elem, _attrs) {
            var stateMap = {};
            var width = _scope.width || 400,
                height = _scope.height || 400;
            var tree = d3.layout.tree().size([width - 20, height - 20]).separation(function(a, b) {
              return a.parent == b.parent ? 10 : 25;
            });
            var root = $state.get().filter(function(state) {
              return state.name === "";
            })[0];
            var nodes = tree(root);
            root.parent = root;
            root.px = root.x = width / 2;
            root.py = root.y = height / 2;
            var activeNode = {};
            activeNode.px = activeNode.x = root.px;
            activeNode.py = activeNode.y = root.py;
            var diagonal = d3.svg.diagonal();
            var svg = d3.select(_elem.find("svg")[0]).attr("width", width).attr("height", height).append("g").attr("transform", "translate(10, 10)");
            var node = svg.selectAll(".node"),
                link = svg.selectAll(".link"),
                active = svg.selectAll(".active");
            ;
            var updateInterval = 200,
                transLength = 200,
                timer = setInterval(update, updateInterval);
            function addStates(data) {
              data = data.map(function(node) {
                return node.name === "" ? root : angular.copy(node);
              });
              angular.extend(stateMap, data.reduce(function(map, node) {
                map[node.name] = node;
                return map;
              }, {}));
              data.forEach(function(node) {
                var parentName = node.name.split(/\./).slice(0, -1).join(".");
                var parent = node.name != parentName && stateMap[parentName];
                if (parent) {
                  (parent.children || (parent.children = [])).push(node);
                  node.px = parent.px;
                  node.py = parent.py;
                  nodes.push(node);
                }
              });
            }
            $interval(function() {
              _scope.states = $state.get();
              angular.forEach(nodes, function(n) {
                var s = $state.get(n.name);
                if (s) {
                  n.status = s.status || 'exited';
                }
              });
            }, 250);
            _scope.$watchCollection("states", function(newval, oldval) {
              var oldstates = (oldval || []).map(function(s) {
                return s.name;
              });
              addStates((newval || []).filter(function(state) {
                return oldstates.indexOf(state.name) == -1;
              }));
            });
            update(updateInterval);
            function update() {
              node = node.data(tree.nodes(root), function(d) {
                return d.name;
              });
              link = link.data(tree.links(nodes), function(d) {
                return d.target.name;
              });
              active = active.data(activeNode);
              nodes.forEach(function(d) {
                d.y = d.depth * 70;
              });
              var nodeEnter = node.enter();
              function stateName(node) {
                var name = node.name.split(".").pop();
                if (node.sticky) {
                  name += " (STICKY)";
                }
                if (node.deepStateRedirect) {
                  name += " (DSR)";
                }
                return name;
              }
              active.enter().append("circle").attr("class", "active").attr("r", 13).attr("cx", function(d) {
                return d.parent.px || 100;
              }).attr("cy", function(d) {
                return d.parent.py || 100;
              });
              ;
              nodeEnter.append("circle").attr("class", "node").attr("r", 9).attr("cx", function(d) {
                return d.parent.px;
              }).attr("cy", function(d) {
                return d.parent.py;
              });
              nodeEnter.append("text").attr("class", "label").attr("x", function(d) {
                return d.parent.px;
              }).attr("y", function(d) {
                return d.parent.py;
              }).attr("text-anchor", function(d) {
                return "middle";
              }).text(stateName).style("fill-opacity", 1);
              link.enter().insert("path", ".node").attr("class", "link").attr("d", function(d) {
                var o = {
                  x: d.source.px,
                  y: d.source.py
                };
                return diagonal({
                  source: o,
                  target: o
                });
              });
              var t = svg.transition().duration(transLength);
              t.selectAll(".link").attr("d", diagonal);
              var circleColors = {
                entered: '#AF0',
                exited: '#777',
                active: '#0f0',
                inactive: '#55F',
                future: '#009'
              };
              t.selectAll(".node").attr("cx", function(d) {
                return d.px = d.x;
              }).attr("cy", function(d) {
                return d.py = d.y;
              }).attr("r", function(d) {
                return d.status === 'active' ? 15 : 10;
              }).style("fill", function(d) {
                return circleColors[d.status] || "#FFF";
              });
              t.selectAll(".label").attr("x", function(d) {
                return d.px = d.x;
              }).attr("y", function(d) {
                return d.py = d.y - 15;
              }).attr("transform", function(d) {
                return "rotate(-25 " + d.x + " " + d.y + ")";
              });
              ;
              t.selectAll(".active").attr("x", function(d) {
                return d.px = d.x;
              }).attr("y", function(d) {
                return d.py = d.y - 15;
              });
            }
          }
        };
      }
    })();
    angular.module("ct.ui.router.extras", ['ct.ui.router.extras.core', 'ct.ui.router.extras.dsr', 'ct.ui.router.extras.future', 'ct.ui.router.extras.previous', 'ct.ui.router.extras.statevis', 'ct.ui.router.extras.sticky', 'ct.ui.router.extras.transition']);
  })(angular);
})(require("process"));
