'use strict';

var transferOwnership = function transferOwnership(aggregateInstance, command) {
  try {
    aggregateInstance.transferOwnership(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = transferOwnership;