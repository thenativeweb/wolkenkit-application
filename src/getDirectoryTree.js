'use strict';

const fs = require('fs'),
      path = require('path'),
      { promisify } = require('util');

const access = promisify(fs.access);

const directoryTree = require('directory-tree');

const MAX_TREE_TRANSFORM_DEPTH = {
  // flows/flow[.js, /index.js]
  flows: 1,

  // readModel/api/projection[.js, /index.js]
  readModel: 2,

  // writeModel/context/aggregate[.js, /index.js]
  writeModel: 2
};
const transformTree = function (nodes, maxDepth = 0, currentDepth = 0) {
  if (!nodes) {
    throw new Error('Nodes are missing.');
  }

  const result = {};

  for (const node of nodes) {
    const name = path.basename(node.name, '.js');

    const maxTreeTransformDepth = MAX_TREE_TRANSFORM_DEPTH[name];

    if (maxTreeTransformDepth) {
      result[name] = transformTree(node.children, maxTreeTransformDepth, 1);
    } else if (node.children) {
      if (maxDepth) {
        if (currentDepth + 1 <= maxDepth) {
          result[name] = transformTree(node.children, maxDepth, currentDepth + 1);
        } else {
          result[name] = {};
        }
      } else {
        result[name] = transformTree(node.children);
      }
    } else {
      result[name] = {};
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
