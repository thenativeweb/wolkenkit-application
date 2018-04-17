'use strict';

const authorize = function (aggregateInstance, command) {
  try {
    aggregateInstance.authorize(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = authorize;
