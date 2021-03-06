'use strict';

System.register(["angular", "angular-material", "common/directives/mainwrap/mainwrap", "config/config", "./core.controller", "./core.tpl", "./core.css!", "./00-introduction-toc.tpl", "./01-character-creation-toc.tpl", "./02-actions-attributes-toc.tpl", "./03-banes-boons-toc.tpl", "./04-feats-toc.tpl", "./05-perks-flaws-toc.tpl", "./06-wealth-equipment-toc.tpl", "./07-combat-toc.tpl", "./08-running-the-game-toc.tpl", "./09-special-equipment-toc.tpl", "./00-introduction.tpl", "./01-character-creation.tpl", "./02-actions-attributes.tpl", "./03-banes-boons.tpl", "./04-feats.tpl", "./05-perks-flaws.tpl", "./06-wealth-equipment.tpl", "./07-combat.tpl", "./08-running-the-game.tpl", "./09-special-equipment.tpl"], function (_export, _context) {
  "use strict";

  var angular, mainwrap, configService, CoreCtrl, coreModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_angularMaterial) {}, function (_commonDirectivesMainwrapMainwrap) {
      mainwrap = _commonDirectivesMainwrapMainwrap.default;
    }, function (_configConfig) {
      configService = _configConfig.default;
    }, function (_coreController) {
      CoreCtrl = _coreController.default;
    }, function (_coreTpl) {}, function (_coreCss) {}, function (_introductionTocTpl) {}, function (_characterCreationTocTpl) {}, function (_actionsAttributesTocTpl) {}, function (_banesBoonsTocTpl) {}, function (_featsTocTpl) {}, function (_perksFlawsTocTpl) {}, function (_wealthEquipmentTocTpl) {}, function (_combatTocTpl) {}, function (_runningTheGameTocTpl) {}, function (_specialEquipmentTocTpl) {}, function (_introductionTpl) {}, function (_characterCreationTpl) {}, function (_actionsAttributesTpl) {}, function (_banesBoonsTpl) {}, function (_featsTpl) {}, function (_perksFlawsTpl) {}, function (_wealthEquipmentTpl) {}, function (_combatTpl) {}, function (_runningTheGameTpl) {}, function (_specialEquipmentTpl) {}],
    execute: function () {
      coreModule = angular.module('core', [mainwrap.name, configService.name, 'app/core/core.tpl.html', 'app/core/00-introduction-toc.tpl.html', 'app/core/01-character-creation-toc.tpl.html', 'app/core/02-actions-attributes-toc.tpl.html', 'app/core/03-banes-boons-toc.tpl.html', 'app/core/04-feats-toc.tpl.html', 'app/core/05-perks-flaws-toc.tpl.html', 'app/core/06-wealth-equipment-toc.tpl.html', 'app/core/07-combat-toc.tpl.html', 'app/core/08-running-the-game-toc.tpl.html', 'app/core/09-special-equipment-toc.tpl.html', 'app/core/00-introduction.tpl.html', 'app/core/01-character-creation.tpl.html', 'app/core/02-actions-attributes.tpl.html', 'app/core/03-banes-boons.tpl.html', 'app/core/04-feats.tpl.html', 'app/core/05-perks-flaws.tpl.html', 'app/core/06-wealth-equipment.tpl.html', 'app/core/07-combat.tpl.html', 'app/core/08-running-the-game.tpl.html', 'app/core/09-special-equipment.tpl.html']);
      coreModule.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('core', {
          url: '/core-rules/:chapter',
          templateUrl: 'app/core/core.tpl.html',
          controller: CoreCtrl,
          controllerAs: 'coreCtrl',
          onEnter: ["$state", "chapter", function onEnter($state, chapter) {
            if (_.isEmpty(chapter)) {
              $state.go('core', {
                chapter: '00-introduction'
              }, {
                reload: true
              });
            }
          }],
          resolve: {
            chapter: ["$stateParams", function chapter($stateParams) {
              return $stateParams.chapter;
            }]
          }
        });
      }]);

      _export("default", coreModule);
    }
  };
});
//# sourceMappingURL=core.js.map
