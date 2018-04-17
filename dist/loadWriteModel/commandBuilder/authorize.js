'use strict';

var authorize = function authorize(aggregateInstance, command) {
  try {
    aggregateInstance.authorize(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = authorize;