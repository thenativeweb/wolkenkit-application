'use strict';

const path = require('path');

const requireDir = require('require-dir');

const getEntries = function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const serverDirectory = path.join(directory, 'server');
  const entries = requireDir(serverDirectory, { recurse: true });

  return { server: entries };
};

module.exports = getEntries;
