"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/07-combat-toc.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/07-combat-toc.tpl.html', '<div id="toc"><ul><li><a href="#chapter-7-combat">Chapter 7: Combat</a><ul><li><a href="#when-combat-ensues">When Combat Ensues</a></li><li><a href="#starting-combat">Starting Combat</a><ul><li><a href="#determining-surprise">Determining Surprise</a></li><li><a href="#roll-for-initiative">Roll for Initiative</a></li><li><a href="#waiting-to-act">Waiting to Act</a></li></ul></li><li><a href="#taking-your-turn">Taking Your Turn</a><ul><li><a href="#major-actions">Major Actions</a></li><li><a href="#move-actions">Move Actions</a></li><li><a href="#minor-actions">Minor Actions</a></li><li><a href="#focus-actions">Focus Actions</a></li><li><a href="#interrupt-actions">Interrupt Actions</a></li><li><a href="#free-actions">Free Actions</a></li></ul></li><li><a href="#damage-and-healing">Damage and Healing</a><ul><li><a href="#finishing-blows">Finishing Blows</a></li><li><a href="#reaching-zero-hit-points">Reaching Zero Hit Points</a></li><li><a href="#healing-after-combat">Healing After Combat</a></li><li><a href="#lethal-damage">Lethal Damage</a></li></ul></li><li><a href="#the-core-mechanic-in-combat">The Core Mechanic in Combat</a><ul><li><a href="#why-succeed-on-a-failed-roll">Why Succeed on a Failed Roll?</a></li><li><a href="#interpreting-twists-and-failures-in-combat">Interpreting Twists and Failures in Combat</a></li></ul></li></ul></li></ul></div>');
      }]);
    }
  };
});