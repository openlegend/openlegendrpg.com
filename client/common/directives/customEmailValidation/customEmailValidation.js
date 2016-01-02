System.register(["angular"], function (_export) {
  var angular, customEmailValidationDirective;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      customEmailValidationDirective = angular.module("customEmailValidation.js", []);

      customEmailValidationDirective.directive("customEmailValidation", function () {
        var EMAIL_REGEXP = /[^\s@]+@[^\s@]+\.[^\s@]+/;

        return {
          require: "ngModel",
          restrict: "",
          link: function link(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            if (ctrl && ctrl.$validators.email) {

              // this will overwrite the default Angular email validator
              ctrl.$validators.email = function (modelValue) {
                return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
              };
            }
          }
        };
      });

      _export("default", customEmailValidationDirective);
    }
  };
});
//# sourceMappingURL=../../../common/directives/customEmailValidation/customEmailValidation.js.map