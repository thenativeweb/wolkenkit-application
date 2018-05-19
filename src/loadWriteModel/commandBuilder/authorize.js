'use strict';

const humanizeString = require('humanize-string');

const authorize = function (aggregateInstance, command) {
  try {
    if (!aggregateInstance.exists()) {
      const aggregateName = humanizeString(command.aggregate.name);

      throw new Error(`${aggregateName} does not exist.`);
    }

    aggregateInstance.authorize(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = authorize;
