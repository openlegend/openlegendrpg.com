/* */ 
(function(process) {
  (function(window, angular, undefined) {
    'use strict';
    angular.module('ngMessages', []).directive('ngMessages', ['$compile', '$animate', '$templateRequest', function($compile, $animate, $templateRequest) {
      var ACTIVE_CLASS = 'ng-active';
      var INACTIVE_CLASS = 'ng-inactive';
      return {
        restrict: 'AE',
        controller: function() {
          this.$renderNgMessageClasses = angular.noop;
          var messages = [];
          this.registerMessage = function(index, message) {
            for (var i = 0; i < messages.length; i++) {
              if (messages[i].type == message.type) {
                if (index != i) {
                  var temp = messages[index];
                  messages[index] = messages[i];
                  if (index < messages.length) {
                    messages[i] = temp;
                  } else {
                    messages.splice(0, i);
                  }
                }
                return ;
              }
            }
            messages.splice(index, 0, message);
          };
          this.renderMessages = function(values, multiple) {
            values = values || {};
            var found;
            angular.forEach(messages, function(message) {
              if ((!found || multiple) && truthyVal(values[message.type])) {
                message.attach();
                found = true;
              } else {
                message.detach();
              }
            });
            this.renderElementClasses(found);
            function truthyVal(value) {
              return value !== null && value !== false && value;
            }
          };
        },
        require: 'ngMessages',
        link: function($scope, element, $attrs, ctrl) {
          ctrl.renderElementClasses = function(bool) {
            bool ? $animate.setClass(element, ACTIVE_CLASS, INACTIVE_CLASS) : $animate.setClass(element, INACTIVE_CLASS, ACTIVE_CLASS);
          };
          var multiple = angular.isString($attrs.ngMessagesMultiple) || angular.isString($attrs.multiple);
          var cachedValues,
              watchAttr = $attrs.ngMessages || $attrs['for'];
          $scope.$watchCollection(watchAttr, function(values) {
            cachedValues = values;
            ctrl.renderMessages(values, multiple);
          });
          var tpl = $attrs.ngMessagesInclude || $attrs.include;
          if (tpl) {
            $templateRequest(tpl).then(function processTemplate(html) {
              var after,
                  container = angular.element('<div/>').html(html);
              angular.forEach(container.children(), function(elm) {
                elm = angular.element(elm);
                after ? after.after(elm) : element.prepend(elm);
                after = elm;
                $compile(elm)($scope);
              });
              ctrl.renderMessages(cachedValues, multiple);
            });
          }
        }
      };
    }]).directive('ngMessage', ['$animate', function($animate) {
      var COMMENT_NODE = 8;
      return {
        require: '^ngMessages',
        transclude: 'element',
        terminal: true,
        restrict: 'AE',
        link: function($scope, $element, $attrs, ngMessages, $transclude) {
          var index,
              element;
          var commentNode = $element[0];
          var parentNode = commentNode.parentNode;
          for (var i = 0,
              j = 0; i < parentNode.childNodes.length; i++) {
            var node = parentNode.childNodes[i];
            if (node.nodeType == COMMENT_NODE && node.nodeValue.indexOf('ngMessage') >= 0) {
              if (node === commentNode) {
                index = j;
                break;
              }
              j++;
            }
          }
          ngMessages.registerMessage(index, {
            type: $attrs.ngMessage || $attrs.when,
            attach: function() {
              if (!element) {
                $transclude($scope, function(clone) {
                  $animate.enter(clone, null, $element);
                  element = clone;
                });
              }
            },
            detach: function(now) {
              if (element) {
                $animate.leave(element);
                element = null;
              }
            }
          });
        }
      };
    }]);
  })(window, window.angular);
})(require("process"));
