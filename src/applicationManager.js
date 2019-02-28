'use strict';

const Application = require('./Application'),
      ApplicationCache = require('./ApplicationCache'),
      extendEntries = require('./extendEntries'),
      getEntries = require('./getEntries'),
      validateStructure = require('./validateStructure');

const applicationCache = new ApplicationCache();

const applicationManager = {
  async load ({ directory }) {
    if (!directory) {
      throw new Error('Directory is missing.');
    }

    const cachedApplication = applicationCache.get({ directory });

    if (cachedApplication) {
      return cachedApplication;
    }

    const entries = getEntries({ directory });

    validateStructure({ entries });

    const extendedEntries = extendEntries({ entries });
    const application = new Application({ entries: extendedEntries });

    applicationCache.set({ directory, application });

    return application;
  }
};

module.exports = applicationManager;
