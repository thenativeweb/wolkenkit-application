'use strict';

var requireDir = require('require-dir');

var getEntries = function getEntries(_ref) {
  var directory = _ref.directory;

  if (!directory) {
    throw new Error('Directory is missing.');
  }

  var entries = requireDir(directory, {
    recurse: true
  });
  return entries;
};

module.exports = getEntries;