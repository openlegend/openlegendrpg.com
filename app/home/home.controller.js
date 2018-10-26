'use strict';

System.register(["lodash", "angular"], function (_export, _context) {
  "use strict";

  var angular, HomeCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_lodash) {}, function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      HomeCtrl =
      /*#__PURE__*/
      function () {
        // called once when the class is instantiated
        function HomeCtrl($scope, $mdMedia, $http, Config) {
          var _this = this;

          _classCallCheck(this, HomeCtrl);

          this.$scope = $scope;
          this.$mdMedia = $mdMedia;
          this.$http = $http;
          this.Config = Config;

          (function () {
            var script = document.createElement('script');
            script.src = 'https://backerkit.com/assets/preorders.js';
            script.async = true;
            var entry = document.getElementsByTagName('script')[0];
            entry.parentNode.insertBefore(script, entry);
          })();

          this.$http.get('http://blog.openlegendrpg.com/wp-json/wp/v2/posts?per_page=5&_embed=wp:featuredmedia').then(function (res) {
            res.data.map(function (item) {
              if (_.get(item, 'post.excerpt.rendered')) {
                item.post.excerpt.rendered = item.post.excerpt.rendered + "<a href=\"".concat(item.link, "\">Read On &rarr;</a>");
              }

              return item;
            });
            _this.blogPosts = res.data;
          });
        } // public class methods


        _createClass(HomeCtrl, [{
          key: "deleteThisFunction",
          value: function deleteThisFunction() {// does nothing
          }
        }]);

        return HomeCtrl;
      }();

      _export("default", HomeCtrl);
    }
  };
});
//# sourceMappingURL=home.controller.js.map
