'use strict';

var humanizeString = require('humanize-string');

var authorize = function authorize(aggregateInstance, command) {
  try {
    if (!aggregateInstance.exists()) {
      var aggregateName = humanizeString(command.aggregate.name);

      throw new Error(aggregateName + ' does not exist.');
    }

    aggregateInstance.authorize(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = authorize;