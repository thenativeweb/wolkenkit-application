'use strict';

const transferOwnership = function (aggregateInstance, command) {
  try {
    aggregateInstance.transferOwnership(command.data);
  } catch (ex) {
    return command.reject(ex.message);
  }
};

module.exports = transferOwnership;
