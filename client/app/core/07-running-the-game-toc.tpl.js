System.register(["angular"], function (_export) {
  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      "use strict";

      angular.module("app/core/07-running-the-game-toc.tpl.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app/core/07-running-the-game-toc.tpl.html", "<div id=\"toc\"><ul><li><a href=\"#chapter-7-running-the-game\">Chapter 7: Running the Game</a><ul><li><a href=\"#the-game-masters-calling\">The Game Master’s Calling</a></li><li><a href=\"#creating-adventures\">Creating Adventures</a><ul><li><a href=\"#what-every-adventure-needs\">What Every Adventure Needs</a></li><li><a href=\"#the-sequential-adventure\">The Sequential Adventure</a></li><li><a href=\"#the-sandbox-adventure\">The Sandbox Adventure</a></li></ul></li><li><a href=\"#creating-a-campaign\">Creating a Campaign</a><ul><li><a href=\"#plan-the-big-secret\">Plan The Big Secret</a></li><li><a href=\"#plan-the-campaign-arcs\">Plan The Campaign Arcs</a></li><li><a href=\"#plan-enough-to-get-started\">Plan Enough to Get Started</a></li><li><a href=\"#rewarding-the-players\">Rewarding the Players</a></li></ul></li><li><a href=\"#monsters-and-npcs\">Monsters and NPCs</a><ul><li><a href=\"#henchmen\">Henchmen</a></li><li><a href=\"#villains\">Villains</a></li><li><a href=\"#allies\">Allies</a></li><li><a href=\"#monsters-and-npc-statistics\">Monsters and NPC Statistics</a></li></ul></li><li><a href=\"#planning-combat-encounters\">Planning Combat Encounters</a><ul><li><a href=\"#encounter-difficulty\">Encounter Difficulty</a></li><li><a href=\"#encounter-setting\">Encounter Setting</a></li><li><a href=\"#encounter-consequences\">Encounter Consequences</a></li><li><a href=\"#on-balance-and-fairness\">On Balance and Fairness</a></li><li><a href=\"#ad-hoc-damage\">Ad Hoc Damage</a></li></ul></li></ul></li></ul></div>");
      }]);
    }
  };
});