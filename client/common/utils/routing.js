System.register(["app/routes.json!", "ui-router-extras"], function (_export) {
  var futureRoutes, routing;
  return {
    setters: [function (_appRoutesJson) {
      futureRoutes = _appRoutesJson["default"];
    }, function (_uiRouterExtras) {}],
    execute: function () {
      "use strict";

      routing = function routing(module) {

        module.requires.push("ct.ui.router.extras.future");

        var RouterConfig = ["$stateProvider", "$futureStateProvider", function ($stateProvider, $futureStateProvider) {

          $futureStateProvider.stateFactory("load", ["$q", "$ocLazyLoad", "futureState", function ($q, $ocLazyLoad, futureState) {
            var def = $q.defer();

            System["import"](futureState.src).then(function (loaded) {
              var newModule = loaded;
              if (!loaded.name) {
                var key = Object.keys(loaded);
                newModule = loaded[key[0]];
              }

              $ocLazyLoad.load(newModule).then(function () {
                def.resolve();
              });
            });

            return def.promise;
          }]);

          futureRoutes.forEach(function (r) {
            $futureStateProvider.futureState(r);
          });
        }];

        return RouterConfig;
      };

      _export("routing", routing);
    }
  };
});
//# sourceMappingURL=../../common/utils/routing.js.map