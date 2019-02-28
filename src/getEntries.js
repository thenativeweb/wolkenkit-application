'use strict';

const path = require('path');

const requireDir = require('require-dir');

const getEntries = function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const entries = requireDir(directory, {
    filter (entryPath) {
      const serverPath = path.join(directory, 'server');

      return entryPath.startsWith(serverPath);
    },
    recurse: true
  });

  return entries;
};

module.exports = getEntries;
