'use strict';

const authorized = function (aggregateInstance, event) {
  aggregateInstance.setState({
    isAuthorized: event.data
  });
};

module.exports = authorized;
