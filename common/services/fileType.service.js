'use strict';

System.register(["angular"], function (_export, _context) {
  "use strict";

  var angular, fileTypeModule;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }],
    execute: function () {
      fileTypeModule = angular.module('fileType.js', []);
      fileTypeModule.factory('FileType', function () {
        var map = {
          'folder': {
            name: 'Folder',
            icon: 'folder'
          },
          'image': {
            name: 'Image',
            icon: 'file-image'
          },
          'video': {
            name: 'Video',
            icon: 'file-video'
          },
          'pdf': {
            name: 'PDF',
            icon: 'file-pdf'
          },
          'file': {
            name: 'File',
            icon: 'file'
          }
        };

        var getType = function getType(item) {
          if (item.primaryType === 'scala:folder') {
            return map.folder;
          }

          if (item.primaryType === 'scala:file') {
            if (/\.jpg|\.jpeg|\.png|\.gif/.test(item.name)) {
              return map.image;
            } else if (/\.mpg|\.mpeg|\.mp4|\.mov/.test(item.name)) {
              return map.video;
            } else if (/\.pdf/.test(item.name)) {
              return map.pdf;
            } else {
              return map.file;
            }
          }
        };

        return {
          map: map,
          getType: getType,
          getName: function getName(item) {
            return getType(item).name;
          },
          getIcon: function getIcon(item) {
            return getType(item).icon;
          }
        };
      });

      _export("default", fileTypeModule);
    }
  };
});
//# sourceMappingURL=fileType.service.js.map
