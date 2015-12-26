/* */ 
(function() {
  'use strict';
  var code = require("./code");
  function isStrictModeReservedWordES6(id) {
    switch (id) {
      case 'implements':
      case 'interface':
      case 'package':
      case 'private':
      case 'protected':
      case 'public':
      case 'static':
      case 'let':
        return true;
      default:
        return false;
    }
  }
  function isKeywordES5(id, strict) {
    if (!strict && id === 'yield') {
      return false;
    }
    return isKeywordES6(id, strict);
  }
  function isKeywordES6(id, strict) {
    if (strict && isStrictModeReservedWordES6(id)) {
      return true;
    }
    switch (id.length) {
      case 2:
        return (id === 'if') || (id === 'in') || (id === 'do');
      case 3:
        return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
      case 4:
        return (id === 'this') || (id === 'else') || (id === 'case') || (id === 'void') || (id === 'with') || (id === 'enum');
      case 5:
        return (id === 'while') || (id === 'break') || (id === 'catch') || (id === 'throw') || (id === 'const') || (id === 'yield') || (id === 'class') || (id === 'super');
      case 6:
        return (id === 'return') || (id === 'typeof') || (id === 'delete') || (id === 'switch') || (id === 'export') || (id === 'import');
      case 7:
        return (id === 'default') || (id === 'finally') || (id === 'extends');
      case 8:
        return (id === 'function') || (id === 'continue') || (id === 'debugger');
      case 10:
        return (id === 'instanceof');
      default:
        return false;
    }
  }
  function isReservedWordES5(id, strict) {
    return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
  }
  function isReservedWordES6(id, strict) {
    return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
  }
  function isRestrictedWord(id) {
    return id === 'eval' || id === 'arguments';
  }
  function isIdentifierName(id) {
    var i,
        iz,
        ch;
    if (id.length === 0) {
      return false;
    }
    ch = id.charCodeAt(0);
    if (!code.isIdentifierStart(ch) || ch === 92) {
      return false;
    }
    for (i = 1, iz = id.length; i < iz; ++i) {
      ch = id.charCodeAt(i);
      if (!code.isIdentifierPart(ch) || ch === 92) {
        return false;
      }
    }
    return true;
  }
  function isIdentifierES5(id, strict) {
    return isIdentifierName(id) && !isReservedWordES5(id, strict);
  }
  function isIdentifierES6(id, strict) {
    return isIdentifierName(id) && !isReservedWordES6(id, strict);
  }
  module.exports = {
    isKeywordES5: isKeywordES5,
    isKeywordES6: isKeywordES6,
    isReservedWordES5: isReservedWordES5,
    isReservedWordES6: isReservedWordES6,
    isRestrictedWord: isRestrictedWord,
    isIdentifierName: isIdentifierName,
    isIdentifierES5: isIdentifierES5,
    isIdentifierES6: isIdentifierES6
  };
}());
