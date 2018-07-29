'use strict';

const transferredOwnership = function (aggregateInstance, event) {
  aggregateInstance.setState({
    isAuthorized: {
      owner: event.data.to
    }
  });
};

module.exports = transferredOwnership;
