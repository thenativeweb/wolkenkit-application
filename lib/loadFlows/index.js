'use strict';

const fs = require('fs'),
      path = require('path');

const loadFlows = function (flowsDirectory, options) {
  const flows = {};

  if (!flowsDirectory) {
    throw new Error('Flows directory is missing.');
  }

  /* eslint-disable no-sync */
  fs.readdirSync(flowsDirectory).forEach(flow => {
    /* eslint-enable no-sync */

    const flowFile = path.join(flowsDirectory, flow);

    /* eslint-disable no-sync */
    if (!fs.statSync(flowFile).isFile()) {
      /* eslint-enable no-sync */
      return;
    }
    if (path.extname(flowFile) !== '.js') {
      return;
    }

    flows[path.basename(flowFile, '.js')] = {};

    if (options && options.loadSource) {
      /* eslint-disable global-require */
      flows[path.basename(flowFile, '.js')] = require(flowFile);
      /* eslint-enable global-require */
    }
  });

  return flows;
};

module.exports = loadFlows;
