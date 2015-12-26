System.register(["angular"], function (_export) {
  var angular, dragIndicatorDirective;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      dragIndicatorDirective = angular.module("dragIndicator.js", []);

      dragIndicatorDirective.directive("dragIndicator", function () {

        return {
          restrict: "EA",
          controller: ["$scope", "$document", "$element", function controller($scope, $document, $element) {

            var dropTarget = $element;
            var $body = $document.find("body");
            var showDrag = false;
            var timeout = -1;
            // $body.addClass('file-dragging');
            $body.bind("dragstart dragenter", function () {
              dropTarget.addClass("dragging-target");
              $body.addClass("file-dragging");
              showDrag = true;
            });
            $body.bind("dragover", function () {
              showDrag = true;
            });
            $body.bind("dragleave drop", function () {
              showDrag = false;
              clearTimeout(timeout);
              // remove the dragging classes on a timeout to prevent UI flicker
              timeout = setTimeout(function () {
                if (!showDrag) {
                  dropTarget.removeClass("dragging-target");
                  $body.removeClass("file-dragging");
                }
              }, 100);
            });

            $scope.$on("$destroy", function () {
              // prevent memory leaks by cleaning up event bindings
              $body.unbind("dragenter dragover dragleave drop");
            });
          }]
        };
      });

      _export("default", dragIndicatorDirective);
    }
  };
});
//# sourceMappingURL=../../common/directives/dragIndicator.js.map