'use strict';

var transferredOwnership = function transferredOwnership(aggregateInstance, event) {
  aggregateInstance.setState({
    isAuthorized: {
      owner: event.data.to
    }
  });
};

module.exports = transferredOwnership;