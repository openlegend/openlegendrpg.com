/* */ 
(function(process) {
  var generate = require("regjsgen").generate;
  var parse = require("regjsparser").parse;
  var regenerate = require("regenerate");
  var iuMappings = require("./data/iu-mappings.json!systemjs-json");
  var ESCAPE_SETS = require("./data/character-class-escape-sets");
  function getCharacterClassEscapeSet(character) {
    if (unicode) {
      if (ignoreCase) {
        return ESCAPE_SETS.UNICODE_IGNORE_CASE[character];
      }
      return ESCAPE_SETS.UNICODE[character];
    }
    return ESCAPE_SETS.REGULAR[character];
  }
  var object = {};
  var hasOwnProperty = object.hasOwnProperty;
  function has(object, property) {
    return hasOwnProperty.call(object, property);
  }
  var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
  var BMP_SET = regenerate().addRange(0x0, 0xFFFF);
  var DOT_SET_UNICODE = UNICODE_SET.clone().remove(0x000A, 0x000D, 0x2028, 0x2029);
  var DOT_SET = DOT_SET_UNICODE.clone().intersection(BMP_SET);
  regenerate.prototype.iuAddRange = function(min, max) {
    var $this = this;
    do {
      var folded = caseFold(min);
      if (folded) {
        $this.add(folded);
      }
    } while (++min <= max);
    return $this;
  };
  function assign(target, source) {
    for (var key in source) {
      target[key] = source[key];
    }
  }
  function update(item, pattern) {
    if (!pattern) {
      return ;
    }
    var tree = parse(pattern, '');
    switch (tree.type) {
      case 'characterClass':
      case 'group':
      case 'value':
        break;
      default:
        tree = wrap(tree, pattern);
    }
    assign(item, tree);
  }
  function wrap(tree, pattern) {
    return {
      'type': 'group',
      'behavior': 'ignore',
      'body': [tree],
      'raw': '(?:' + pattern + ')'
    };
  }
  function caseFold(codePoint) {
    return has(iuMappings, codePoint) ? iuMappings[codePoint] : false;
  }
  var ignoreCase = false;
  var unicode = false;
  function processCharacterClass(characterClassItem) {
    var set = regenerate();
    var body = characterClassItem.body.forEach(function(item) {
      switch (item.type) {
        case 'value':
          set.add(item.codePoint);
          if (ignoreCase && unicode) {
            var folded = caseFold(item.codePoint);
            if (folded) {
              set.add(folded);
            }
          }
          break;
        case 'characterClassRange':
          var min = item.min.codePoint;
          var max = item.max.codePoint;
          set.addRange(min, max);
          if (ignoreCase && unicode) {
            set.iuAddRange(min, max);
          }
          break;
        case 'characterClassEscape':
          set.add(getCharacterClassEscapeSet(item.value));
          break;
        default:
          throw Error('Unknown term type: ' + item.type);
      }
    });
    if (characterClassItem.negative) {
      set = (unicode ? UNICODE_SET : BMP_SET).clone().remove(set);
    }
    update(characterClassItem, set.toString());
    return characterClassItem;
  }
  function processTerm(item) {
    switch (item.type) {
      case 'dot':
        update(item, (unicode ? DOT_SET_UNICODE : DOT_SET).toString());
        break;
      case 'characterClass':
        item = processCharacterClass(item);
        break;
      case 'characterClassEscape':
        update(item, getCharacterClassEscapeSet(item.value).toString());
        break;
      case 'alternative':
      case 'disjunction':
      case 'group':
      case 'quantifier':
        item.body = item.body.map(processTerm);
        break;
      case 'value':
        var codePoint = item.codePoint;
        var set = regenerate(codePoint);
        if (ignoreCase && unicode) {
          var folded = caseFold(codePoint);
          if (folded) {
            set.add(folded);
          }
        }
        update(item, set.toString());
        break;
      case 'anchor':
      case 'empty':
      case 'group':
      case 'reference':
        break;
      default:
        throw Error('Unknown term type: ' + item.type);
    }
    return item;
  }
  ;
  module.exports = function(pattern, flags) {
    var tree = parse(pattern, flags);
    ignoreCase = flags ? flags.indexOf('i') > -1 : false;
    unicode = flags ? flags.indexOf('u') > -1 : false;
    assign(tree, processTerm(tree));
    return generate(tree);
  };
})(require("process"));
