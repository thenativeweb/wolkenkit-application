'use strict';

var authorized = function authorized(aggregateInstance, event) {
  aggregateInstance.setState({
    isAuthorized: event.data
  });
};

module.exports = authorized;