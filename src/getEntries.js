'use strict';

const path = require('path');

const getDirectoryTree = require('./getDirectoryTree');

const requireRecursive = function (directoryTree, currentPath) {
  const result = {};

  for (const key of Object.keys(directoryTree)) {
    const subTree = directoryTree[key];
    const nextPath = path.join(currentPath, key);

    if (Object.keys(subTree).length) {
      result[key] = requireRecursive(subTree, nextPath);
    } else {
      // eslint-disable-next-line global-require
      result[key] = require(nextPath);
    }
  }

  return result;
};

const getEntries = async function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const directoryTree = await getDirectoryTree({ directory });
  const entries = requireRecursive(directoryTree, directory);

  return entries;
};

module.exports = getEntries;
