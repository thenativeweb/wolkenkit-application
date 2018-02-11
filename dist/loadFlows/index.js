'use strict';

var fs = require('fs'),
    path = require('path');

var loadFlows = function loadFlows(flowsDirectory, _ref) {
  var _ref$loadSource = _ref.loadSource,
      loadSource = _ref$loadSource === undefined ? false : _ref$loadSource;

  var flows = {};

  if (!flowsDirectory) {
    throw new Error('Flows directory is missing.');
  }

  /* eslint-disable no-sync */
  fs.readdirSync(flowsDirectory).forEach(function (flow) {
    /* eslint-enable no-sync */

    var flowFile = path.join(flowsDirectory, flow);

    /* eslint-disable no-sync */
    if (!fs.statSync(flowFile).isFile()) {
      /* eslint-enable no-sync */
      return;
    }
    if (path.extname(flowFile) !== '.js') {
      return;
    }

    flows[path.basename(flowFile, '.js')] = {};

    if (loadSource) {
      /* eslint-disable global-require */
      flows[path.basename(flowFile, '.js')] = require(flowFile);
      /* eslint-enable global-require */
    }
  });

  return flows;
};

module.exports = loadFlows;