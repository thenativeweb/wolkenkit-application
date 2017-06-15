'use strict';

const fs = require('fs'),
      path = require('path');

const loadModels = function (modelsTypeDirectory, options) {
  const models = {};

  /* eslint-disable no-sync */
  fs.readdirSync(modelsTypeDirectory).forEach(model => {
    /* eslint-enable no-sync */
    const modelFile = path.join(modelsTypeDirectory, model);

    /* eslint-disable no-sync */
    if (!fs.statSync(modelFile).isFile()) {
      /* eslint-enable no-sync */
      return;
    }
    if (path.extname(modelFile) !== '.js') {
      return;
    }

    models[path.basename(modelFile, '.js')] = {};

    if (options && options.loadSource) {
      /* eslint-disable global-require */
      models[path.basename(modelFile, '.js')] = require(modelFile);
      /* eslint-enable global-require */
    }
  });

  return models;
};

const loadModelTypes = function (readModelDirectory, options) {
  const modelTypes = {};

  /* eslint-disable no-sync */
  fs.readdirSync(readModelDirectory).forEach(modelType => {
    /* eslint-enable no-sync */

    const modelsTypeDirectory = path.join(readModelDirectory, modelType);

    /* eslint-disable no-sync */
    if (!fs.statSync(modelsTypeDirectory).isDirectory()) {
      /* eslint-enable no-sync */
      return;
    }

    modelTypes[modelType] = loadModels(modelsTypeDirectory, options);
  });

  return modelTypes;
};

const loadReadModel = function (readModelDirectory, options) {
  if (!readModelDirectory) {
    throw new Error('Read model directory is missing.');
  }

  return loadModelTypes(readModelDirectory, options);
};

module.exports = loadReadModel;
