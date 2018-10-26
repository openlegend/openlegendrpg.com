"use strict";

System.register(["angular", "moment"], function (_export, _context) {
  "use strict";

  var angular, moment, fromNowModule;

  /*
   * Simple wrapper for moment.js's fromNow() function, basically. Put in
   * milliseconds from epoch, get a readable string like "3 hours ago".
   *
   * Just as with moment.js's fromNow(), you may pass a Boolean 'noSuffix'
   * which if true will return a string without the suffix.
   *
   * {{ 12345 | fromNow }}      => "4 years ago"
   * {{ 12345 | fromNow:true }} => "4 years"
   *
   * See http://momentjs.com/docs/#/displaying/fromnow/
   */
  function filter() {
    return function (milliseconds, noSuffix, format) {
      noSuffix = noSuffix ? noSuffix : false;
      return format ? moment(milliseconds).format(format) : moment(milliseconds).fromNow(noSuffix);
    };
  }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      fromNowModule = angular.module('fromNow.filter.js', []).filter('fromNow', filter);

      _export("default", fromNowModule);
    }
  };
});
//# sourceMappingURL=fromNow.filter.js.map
