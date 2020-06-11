"use strict";

System.register(["lodash"], function (_export, _context) {
  "use strict";

  _export("default", function (prereqs) {
    var output = '';
    var uniquePrereqs = [];
    var suppressIteration = false;

    function processAttrPrereq(val, key, parentKey, parentIndex, parentLength) {
      var string = '';

      if (key === 'Feat' || key === 'Other') {
        if (parentKey === 'any' && parentIndex === parentLength - 1) string += ', or  ';
        string += val;
        if (key === 'Feat') string += ' feat ';
        return string;
      }

      var attrStrings = val.map(function (attr, x) {
        var string = '';
        if (parentKey === 'any' && parentIndex === parentLength - 1) string += 'or ';

        if (key === 'Attribute') {
          var attrKey = Object.keys(attr)[0];

          if (x === val.length - 1) {
            string += " ".concat(val.length > 1 ? ' or ' : '').concat(attrKey, " ").concat(attr[attrKey]);
          } else {
            string += "".concat(attrKey, " ").concat(attr[attrKey]);
          }
        } else if (key === 'Feat') {
          string += "".concat(attr, " feat ");
        } else if (key === 'Other ') {
          string += attr;
        }

        return string;
      });
      return attrStrings.join(', ');
    }

    function processPrereqTier(prereq, key, index) {
      var prereqTiers = '';

      if (key === 'any') {
        Object.keys(prereqs[prereq][key]).forEach(function (subKey, subKeyIndex) {
          prereqTiers += processAttrPrereq(prereqs[prereq][key][subKey], subKey, key, index, prereqs[prereq][key][subKey].length);
        });
      } else {
        prereqTiers += processAttrPrereq(prereqs[prereq][key], key, index, prereqs[prereq][key].length);
      }

      return prereqTiers;
    }

    Object.keys(prereqs).forEach(function (key) {
      uniquePrereqs.push(prereqs[key]);
    });
    uniquePrereqs = _.uniqWith(uniquePrereqs, _.isEqual);

    if (Object.keys(prereqs).length > uniquePrereqs.length) {
      suppressIteration = true;
    }

    Object.keys(prereqs).forEach(function (prereq, x) {
      function processPrereq(key, i, localPrereqKeys, suppressIteration) {
        var output = '';

        if (i === 0) {
          output += "<strong>Tier ".concat(prereq.split('tier')[1]);
          var prereqArray = Object.keys(prereqs); // if we're suppressing iteration, get the tier number of the last tier
          // object key and put ` - X` where x is the final tier

          if (prereqArray.length && suppressIteration) {
            output += " - ".concat(prereqArray[prereqArray.length - 1].split('tier')[1]);
          }

          output += "</strong>: ";
        }

        if (localPrereqKeys.length > 1 && i === 0) {
          output += "<ul>";
        }

        if (localPrereqKeys.length > 1 && i === 0) {
          output += "<li>";
        }

        output += processPrereqTier(prereq, key, i);

        if (localPrereqKeys.length > 1 && i > 0) {
          output += "</li>";
        }

        if (localPrereqKeys.length > 1 && i === localPrereqKeys.length - 1) {
          output += "</ul>";
        }

        return output;
      }

      var prereqKeys = Object.keys(prereqs[prereq]);
      var localPrereqKeys = prereqKeys;

      if (suppressIteration && x > 0) {
        return;
      }

      output += '<ul>';
      prereqKeys.forEach(function (key, z) {
        output += "<li>".concat(processPrereq(key, z, localPrereqKeys, suppressIteration), "</li>");
      });
      output += '</ul>';
    });
    return output;
  });

  return {
    setters: [function (_lodash) {}],
    execute: function () {}
  };
});
//# sourceMappingURL=featPrereqOutput.js.map
