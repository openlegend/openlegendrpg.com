System.register(["angular", "moment"], function (_export) {
  var angular, moment, fromNowModule;

  function filter() {
    return function (milliseconds, _x, format) {
      var noSuffix = arguments[1] === undefined ? false : arguments[1];

      return format ? moment(milliseconds).format(format) : moment(milliseconds).fromNow(noSuffix);
    };
  }

  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_moment) {
      moment = _moment["default"];
    }],
    execute: function () {
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
      "use strict";

      fromNowModule = angular.module("fromNow.filter.js", []).filter("fromNow", filter);

      _export("default", fromNowModule);
    }
  };
});
//# sourceMappingURL=../../common/filters/fromNow.filter.js.map