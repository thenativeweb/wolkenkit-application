'use strict';

var path = require('path');

var requireDir = require('require-dir');

var getEntries = function getEntries(_ref) {
  var directory = _ref.directory;

  if (!directory) {
    throw new Error('Directory is missing.');
  }

  var serverDirectory = path.join(directory, 'server');
  var entries = requireDir(serverDirectory, {
    recurse: true
  });
  return {
    server: entries
  };
};

module.exports = getEntries;