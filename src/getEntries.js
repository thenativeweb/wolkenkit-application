'use strict';

const requireDir = require('require-dir');

const getEntries = function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const entries = requireDir(directory, { recurse: true });

  return entries;
};

module.exports = getEntries;
