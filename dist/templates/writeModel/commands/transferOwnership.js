'use strict';

var humanizeString = require('humanize-string');

var transferOwnership = function transferOwnership(aggregateInstance, command) {
  try {
    if (!aggregateInstance.exists()) {
      var aggregateName = humanizeString(command.aggregate.name);

      throw new Error(aggregateName + ' does not exist.');
    }

    aggregateInstance.transferOwnership(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = transferOwnership;