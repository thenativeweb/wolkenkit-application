'use strict';

const fs = require('fs'),
      path = require('path'),
      { promisify } = require('util');

const access = promisify(fs.access),
      readdir = promisify(fs.readdir),
      stat = promisify(fs.stat);

const loadFlows = async function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const flows = {
    configuration: {},
    implementation: {}
  };

  const flowsDirectory = path.join(directory, 'server', 'flows');

  try {
    await access(flowsDirectory, fs.constants.R_OK);
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      return flows;
    }

    throw ex;
  }

  const flowFiles = await readdir(flowsDirectory);

  for (const flowFile of flowFiles) {
    if (path.extname(flowFile) !== '.js') {
      continue;
    }

    const flowFileFull = path.join(flowsDirectory, flowFile);

    const stats = await stat(flowFileFull);

    if (!stats.isFile()) {
      continue;
    }

    const flowName = path.basename(flowFile, '.js');

    /* eslint-disable global-require */
    const implementation = require(flowFileFull);
    /* eslint-enable global-require */

    if (!implementation.reactions) {
      throw new Error(`Reactions are missing in flows/${flowName}.`);
    }

    if (
      implementation.identity ||
      implementation.initialState ||
      implementation.transitions
    ) {
      if (!implementation.identity) {
        throw new Error(`Identity is missing from flows/${flowName}.`);
      }
      if (!implementation.initialState) {
        throw new Error(`Initial state is missing from flows/${flowName}.`);
      }
      if (!implementation.transitions) {
        throw new Error(`Transitions are missing from flows/${flowName}.`);
      }
    }

    const configuration = {};

    flows.configuration[flowName] = configuration;
    flows.implementation[flowName] = implementation;
  }

  return flows;
};

module.exports = loadFlows;
