System.register(["lodash"], function (_export) {
  return {
    setters: [function (_lodash) {}],
    execute: function () {
      "use strict";

      _export("default", function (prereqs) {
        var output = "";
        var uniquePrereqs = [];
        var suppressIteration = false;

        function processAttrPrereq(arr, multi) {
          var attrStrings = arr.map(function (attr, x) {
            var attrKey = Object.keys(attr)[0];
            if (multi) {
              return "<li>" + attrKey + " " + attr[attrKey] + "</li>";
            } else {
              return x === arr.length - 1 ? "" + (arr.length > 1 ? " or " : "") + "" + attrKey + " " + attr[attrKey] : "" + attrKey;
            }
          });
          return multi ? attrStrings.join("") : attrStrings;
        }

        function processPrereqTier(localPrereqKeys, prereq, key, index) {

          var prereqTiers = "";

          if (key === "any") {
            Object.keys(prereqs[prereq][key]).forEach(function (subKey, subKeyIndex) {
              if (subKey === "Attribute") {
                prereqTiers += processAttrPrereq(prereqs[prereq][key][subKey]) + " ";
              } else if (subKey === "Feat") {
                prereqTiers += "" + prereqs[prereq][key][subKey] + " feat ";
              }
            });
          } else if (key === "Attribute") {
            prereqTiers += processAttrPrereq(prereqs[prereq][key]);
          } else if (key === "Feat") {
            prereqTiers += "" + prereqs[prereq][key] + " feat";
          } else if (key === "Other") {
            prereqTiers += prereqs[prereq][key][index];
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

          function processPrereq(key, i, suppressIteration) {
            var output = "";
            if (i === 0) {
              output += "<strong>Tier " + prereq.split("tier")[1] + "</strong>: ";
            }

            if (localPrereqKeys.length > 1 && i === 0) {
              output += "<ul>";
            }

            if (localPrereqKeys.length > 1) {
              output += "<li>";
            }

            output += processPrereqTier(localPrereqKeys, prereq, key, i);

            if (suppressIteration) {
              output += "</li></ul>";
            }

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
            output += "</ul></li>";
            return;
          }

          prereqKeys.forEach(function (key, z) {
            output += processPrereq(key, z);
          });

          output += "</li>";
        });

        return output;
      });
    }
  };
});
//# sourceMappingURL=featPrereqOutput.js.map
