'use strict';

const humanizeString = require('humanize-string');

const transferOwnership = function (aggregateInstance, command) {
  try {
    if (!aggregateInstance.exists()) {
      const aggregateName = humanizeString(command.aggregate.name);

      throw new Error(`${aggregateName} does not exist.`);
    }

    aggregateInstance.transferOwnership(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = transferOwnership;
