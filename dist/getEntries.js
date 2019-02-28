'use strict';

var path = require('path');

var requireDir = require('require-dir');

var getEntries = function getEntries(_ref) {
  var directory = _ref.directory;

  if (!directory) {
    throw new Error('Directory is missing.');
  }

  var entries = requireDir(directory, {
    filter: function filter(entryPath) {
      var serverPath = path.join(directory, 'server');
      return entryPath.startsWith(serverPath);
    },
    recurse: true
  });
  return entries;
};

module.exports = getEntries;