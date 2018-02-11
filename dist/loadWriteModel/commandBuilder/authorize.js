'use strict';

var authorize = function authorize(aggregateInstance, command, mark) {
  try {
    aggregateInstance.authorize(command.data);
  } catch (err) {
    return mark.asRejected(err.message);
  }

  mark.asDone();
};

module.exports = authorize;