'use strict';

var fs = require('fs'),
    path = require('path');

var loadModels = function loadModels(modelsTypeDirectory, _ref) {
  var _ref$loadSource = _ref.loadSource,
      loadSource = _ref$loadSource === undefined ? false : _ref$loadSource;

  var models = {};

  /* eslint-disable no-sync */
  fs.readdirSync(modelsTypeDirectory).forEach(function (model) {
    /* eslint-enable no-sync */
    var modelFile = path.join(modelsTypeDirectory, model);

    /* eslint-disable no-sync */
    if (!fs.statSync(modelFile).isFile()) {
      /* eslint-enable no-sync */
      return;
    }
    if (path.extname(modelFile) !== '.js') {
      return;
    }

    models[path.basename(modelFile, '.js')] = {};

    if (loadSource) {
      /* eslint-disable global-require */
      models[path.basename(modelFile, '.js')] = require(modelFile);
      /* eslint-enable global-require */
    }
  });

  return models;
};

var loadModelTypes = function loadModelTypes(readModelDirectory, _ref2) {
  var _ref2$loadSource = _ref2.loadSource,
      loadSource = _ref2$loadSource === undefined ? false : _ref2$loadSource;

  var modelTypes = {};

  /* eslint-disable no-sync */
  fs.readdirSync(readModelDirectory).forEach(function (modelType) {
    /* eslint-enable no-sync */

    var modelsTypeDirectory = path.join(readModelDirectory, modelType);

    /* eslint-disable no-sync */
    if (!fs.statSync(modelsTypeDirectory).isDirectory()) {
      /* eslint-enable no-sync */
      return;
    }

    modelTypes[modelType] = loadModels(modelsTypeDirectory, { loadSource: loadSource });
  });

  return modelTypes;
};

var loadReadModel = function loadReadModel(readModelDirectory, _ref3) {
  var _ref3$loadSource = _ref3.loadSource,
      loadSource = _ref3$loadSource === undefined ? false : _ref3$loadSource;

  if (!readModelDirectory) {
    throw new Error('Read model directory is missing.');
  }

  return loadModelTypes(readModelDirectory, { loadSource: loadSource });
};

module.exports = loadReadModel;