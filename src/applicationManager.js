'use strict';

const fs = require('fs'),
      { promisify } = require('util');

const Application = require('./Application'),
      extendWriteModel = require('./extendWriteModel'),
      loadFlows = require('./loadFlows'),
      loadReadModel = require('./loadReadModel'),
      loadWriteModel = require('./loadWriteModel');

const access = promisify(fs.access);

const applicationCache = {};

const applicationManager = {
  async load ({ directory }) {
    if (!directory) {
      throw new Error('Directory is missing.');
    }

    const cachedApplication = applicationCache[directory];

    if (cachedApplication) {
      return cachedApplication;
    }

    await access(directory, fs.constants.R_OK);

    const flows = await loadFlows({ directory }),
          readModel = await loadReadModel({ directory }),
          writeModel = await loadWriteModel({ directory });

    const extendedWriteModel = extendWriteModel({ writeModel });

    const application = new Application({
      flows,
      readModel,
      writeModel: extendedWriteModel
    });

    applicationCache[directory] = application;

    return application;
  }
};

module.exports = applicationManager;
