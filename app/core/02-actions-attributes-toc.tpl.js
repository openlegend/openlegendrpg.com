"use strict";

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      angular.module('app/core/02-actions-attributes-toc.tpl.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/02-actions-attributes-toc.tpl.html', '<div id="toc"><ul><li><a href="#chapter-2-actions-attributes">Chapter 2: Actions &amp; Attributes</a><ul><li><a href="#when-to-roll-the-dice">When to Roll the Dice</a></li><li><a href="#every-roll-matters">Every Roll Matters</a><ul><li><a href="#what-not-to-do">What NOT To Do</a></li><li><a href="#keep-it-simple-every-roll-matters-for-the-gm">Keep It Simple: Every Roll Matters for the GM</a></li></ul></li><li><a href="#interpreting-action-rolls">Interpreting Action Rolls</a><ul><li><a href="#interpreting-success">Interpreting Success</a></li><li><a href="#interpreting-success-with-a-twist">Interpreting Success with a Twist</a></li><li><a href="#interpreting-failure-but-the-story-progresses">Interpreting Failure, but the Story Progresses</a></li></ul></li><li><a href="#determining-challenge-rating">Determining Challenge Rating</a><ul><li><a href="#contested-actions">Contested Actions</a></li><li><a href="#group-action-rolls">Group Action Rolls</a></li></ul></li><li><a href="#advantage-disadvantage">Advantage &amp; Disadvantage</a><ul><li><a href="#effects-of-advantage-disadvantage">Effects of Advantage &amp; Disadvantage</a></li><li><a href="#advantage-disadvantage-are-only-applied-before-explosions">Advantage &amp; Disadvantage Are Only Applied BEFORE Explosions</a></li><li><a href="#advantage-disadvantage-without-attribute-dice">Advantage &amp; Disadvantage without Attribute Dice</a></li><li><a href="#assigning-advantage-disadvantage">Assigning Advantage &amp; Disadvantage</a></li></ul></li><li><a href="#legend-points">Legend Points</a><ul><li><a href="#spending-legend-points">Spending Legend Points</a></li></ul></li></ul></li></ul></div>');
      }]);
    }
  };
});