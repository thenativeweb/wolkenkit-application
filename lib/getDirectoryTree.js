'use strict';

const fs = require('fs'),
      path = require('path'),
      { promisify } = require('util');

const directoryTree = require('directory-tree');

const access = promisify(fs.access);

const nodeDepthLimits = {
  // writeModel/context/aggregate[.js, /index.js]
  writeModel: 2,

  // readModel/lists/model[.js, /index.js]
  readModel: 2,

  // flows/flow[.js, /index.js]
  flows: 1
};

const transformTree = function (nodes, depthLimit = 0, currentDepth = 0) {
  if (!nodes) {
    throw new Error('Nodes are missing.');
  }

  const result = {};

  for (const node of nodes) {
    const name = path.basename(node.name, '.js');
    const subtree = node.children;

    if (!subtree) {
      result[name] = {};
      continue;
    }

    const nodeDepthLimit = nodeDepthLimits[name];

    if (nodeDepthLimit) {
      // Get the node's subtree but don't go deeper than nodeDepthLimit
      result[name] = transformTree(subtree, nodeDepthLimit, 1);
    } else if (depthLimit) {
      if (currentDepth + 1 <= depthLimit) {
        // We can go one level deeper
        result[name] = transformTree(subtree, depthLimit, currentDepth + 1);
      } else {
        // Max depth has been reached
        result[name] = {};
      }
    } else {
      // Get the node's sub-tree w/o depth limit
      result[name] = transformTree(subtree);
    }
  }

  return result;
};

const getDirectoryTree = async function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const serverDirectory = path.join(directory, 'server');

  await access(serverDirectory, fs.constants.R_OK);

  const tree = directoryTree(serverDirectory, {
    extensions: /\.js$/
  });

  return transformTree([ tree ]);
};

module.exports = getDirectoryTree;
