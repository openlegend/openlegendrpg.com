"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('common/directives/loginModal/loginModal.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('common/directives/loginModal/loginModal.tpl.html', '<md-dialog md-theme="default" aria-label="Rename Dialog for Rename {{ renameDialogCtrl.node.name }}" tabindex="-1"><md-content class="md-default-theme"><login-component></login-component></md-content></md-dialog>');
      }]);
    }
  };
});