'use strict';

var path = require('path');

var loadFlows = require('./loadFlows'),
    loadReadModel = require('./loadReadModel'),
    loadWriteModel = require('./loadWriteModel');

var cachedApplications = {};

var WolkenkitApplication = function WolkenkitApplication(applicationDirectory) {
  if (!applicationDirectory) {
    throw new Error('Application directory is missing.');
  }

  if (cachedApplications[applicationDirectory]) {
    return cachedApplications[applicationDirectory];
  }

  var flowsDirectory = path.join(applicationDirectory, 'server', 'flows'),
      readModelDirectory = path.join(applicationDirectory, 'server', 'readModel'),
      writeModelDirectory = path.join(applicationDirectory, 'server', 'writeModel');

  this.configuration = {};
  this.configuration.flows = loadFlows(flowsDirectory, { loadSource: false });
  this.configuration.readModel = loadReadModel(readModelDirectory, { loadSource: false });
  this.configuration.writeModel = loadWriteModel(writeModelDirectory, { loadSource: false });

  this.flows = loadFlows(flowsDirectory, { loadSource: true });
  this.readModel = loadReadModel(readModelDirectory, { loadSource: true });
  this.writeModel = loadWriteModel(writeModelDirectory, { loadSource: true });

  cachedApplications[applicationDirectory] = this;
};

module.exports = WolkenkitApplication;