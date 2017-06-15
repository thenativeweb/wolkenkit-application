'use strict';

const transferOwnership = function (aggregateInstance, command, mark) {
  try {
    aggregateInstance.transferOwnership(command.data);
  } catch (err) {
    return mark.asRejected(err.message);
  }

  mark.asDone();
};

module.exports = transferOwnership;
