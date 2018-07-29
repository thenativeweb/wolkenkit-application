'use strict';

const fs = require('fs'),
      path = require('path'),
      { promisify } = require('util');

const access = promisify(fs.access),
      readdir = promisify(fs.readdir),
      stat = promisify(fs.stat);

const loadReadModel = async function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const readModel = {
    configuration: {},
    implementation: {}
  };

  const readModelDirectory = path.join(directory, 'server', 'readModel');

  try {
    await access(readModelDirectory, fs.constants.R_OK);
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      return readModel;
    }

    throw ex;
  }

  const modelTypes = await readdir(readModelDirectory);

  for (const modelType of modelTypes) {
    const modelTypeDirectory = path.join(readModelDirectory, modelType);

    const statsModelType = await stat(modelTypeDirectory);

    if (!statsModelType.isDirectory()) {
      continue;
    }

    readModel.configuration[modelType] = {};
    readModel.implementation[modelType] = {};

    const modelFiles = await readdir(modelTypeDirectory);

    for (const modelFile of modelFiles) {
      if (path.extname(modelFile) !== '.js') {
        continue;
      }

      const modelFileFull = path.join(modelTypeDirectory, modelFile);

      const statsModel = await stat(modelFileFull);

      if (!statsModel.isFile()) {
        continue;
      }

      const modelName = path.basename(modelFile, '.js');

      /* eslint-disable global-require */
      const implementation = require(modelFileFull);
      /* eslint-enable global-require */

      if (!implementation.fields) {
        throw new Error(`Fields are missing from readModel/${modelType}/${modelName}.`);
      }
      if (!implementation.projections) {
        throw new Error(`Projections are missing from readModel/${modelType}/${modelName}.`);
      }

      const configuration = {};

      readModel.configuration[modelType][modelName] = configuration;
      readModel.implementation[modelType][modelName] = implementation;
    }
  }

  return readModel;
};

module.exports = loadReadModel;
