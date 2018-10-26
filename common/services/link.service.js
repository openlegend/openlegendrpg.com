'use strict';

System.register(["angular", "config/config"], function (_export, _context) {
  "use strict";

  var angular, configService, linkServiceModule, Link;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_configConfig) {
      configService = _configConfig.default;
    }],
    execute: function () {
      linkServiceModule = angular.module('link.service.js', [configService]);

      Link =
      /*#__PURE__*/
      function () {
        function Link(Config, $mdDialog, $log) {
          _classCallCheck(this, Link);

          this.Config = Config;
          this.$mdDialog = $mdDialog;
          this.$log = $log;
        }

        _createClass(Link, [{
          key: "nameToUrlPath",
          value: function nameToUrlPath(name) {
            return name.split('(')[0].trim().split(' ').join('_').toLowerCase();
          }
        }, {
          key: "copyLinkToClip",
          value: function copyLinkToClip(items, path) {
            var _this = this;

            var urlString = '';
            items.forEach(function (item, i) {
              if (i > 0) {
                urlString += ',';
              }

              urlString += "".concat(_this.Config.urlBase).concat(path, "/").concat(_this.nameToUrlPath(item.name));
            });

            if (document.queryCommandSupported('copy')) {
              var copyTextToClipboard = function copyTextToClipboard(text) {
                // create a temporary textarea to give it focus and then copy to clipboard
                var textArea = document.createElement('textarea'); // Place in top-left corner of screen regardless of scroll position.

                textArea.style.position = 'fixed';
                textArea.style.top = 0;
                textArea.style.left = 0; // Ensure it has a small width and height. Setting to 1px / 1em
                // doesn't work as this gives a negative w/h on some browsers.

                textArea.style.width = '2em';
                textArea.style.height = '2em'; // We don't need padding, reducing the size if it does flash render.

                textArea.style.padding = 0; // Clean up any borders.

                textArea.style.border = 'none';
                textArea.style.outline = 'none';
                textArea.style.boxShadow = 'none'; // Avoid flash of white box if rendered for any reason.

                textArea.style.background = 'transparent';
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();

                try {
                  var successful = document.execCommand('copy');
                  var msg = successful ? 'successful' : 'unsuccessful';
                  this.$log.info('Copying text command was ' + msg);
                } catch (err) {
                  this.$log.info('Unable to copy');
                }

                document.body.removeChild(textArea);
              };

              copyTextToClipboard.bind(this)(urlString);
            } else {
              this.$mdDialog.show(this.$mdDialog.alert().clickOutsideToClose(true).title('Cannot Copy to Clipboard').textContent('Your browser doesn\'t support copying links to your system clipboard.').ariaLabel('Cannot Copy to Clipboard').ok('Got it!'));
              this.$log.info(urlString);
            } // end conditional for modal for browsers without clipboard copy

          }
        }]);

        return Link;
      }();

      linkServiceModule.service('Link', Link);

      _export("default", linkServiceModule);
    }
  };
});
//# sourceMappingURL=link.service.js.map
