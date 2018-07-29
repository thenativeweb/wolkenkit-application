'use strict';

const fs = require('fs'),
      path = require('path'),
      { promisify } = require('util');

const access = promisify(fs.access),
      readdir = promisify(fs.readdir),
      stat = promisify(fs.stat);

const loadWriteModel = async function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const writeModel = {
    configuration: {},
    implementation: {}
  };

  const writeModelDirectory = path.join(directory, 'server', 'writeModel');

  try {
    await access(writeModelDirectory, fs.constants.R_OK);
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      return writeModel;
    }

    throw ex;
  }

  const contexts = await readdir(writeModelDirectory);

  for (const context of contexts) {
    const contextDirectory = path.join(writeModelDirectory, context);

    const statsContext = await stat(contextDirectory);

    if (!statsContext.isDirectory()) {
      continue;
    }

    writeModel.configuration[context] = {};
    writeModel.implementation[context] = {};

    const aggregateFiles = await readdir(contextDirectory);

    for (const aggregateFile of aggregateFiles) {
      if (path.extname(aggregateFile) !== '.js') {
        continue;
      }

      const aggregateFileFull = path.join(contextDirectory, aggregateFile);

      const statsAggregate = await stat(aggregateFileFull);

      if (!statsAggregate.isFile()) {
        continue;
      }

      const aggregateName = path.basename(aggregateFile, '.js');

      /* eslint-disable global-require */
      const implementation = require(aggregateFileFull);
      /* eslint-enable global-require */

      if (!implementation.initialState) {
        throw new Error(`Initial state is missing from writeModel/${context}/${aggregateName}.`);
      }
      if (!implementation.commands) {
        throw new Error(`Commands are missing from writeModel/${context}/${aggregateName}.`);
      }
      if (!implementation.events) {
        throw new Error(`Events are missing from writeModel/${context}/${aggregateName}.`);
      }

      const configuration = {
        commands: {},
        events: {}
      };

      for (const command of Object.keys(implementation.commands)) {
        configuration.commands[command] = {};
      }
      for (const event of Object.keys(implementation.events)) {
        configuration.events[event] = {};
      }

      writeModel.configuration[context][aggregateName] = configuration;
      writeModel.implementation[context][aggregateName] = implementation;
    }
  }

  return writeModel;
};

module.exports = loadWriteModel;
