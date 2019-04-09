'use strict';

const schemaStart = require('./schemas/start');

const initialState = {
  foo: 'bar'
};

const commands = {
  /* eslint-disable no-unused-vars */
  start: {
    schema: schemaStart,

    isAuthorized (folderAggregate, command) {
      return true;
    },

    handle (folderAggregate, command) {
      // ...
    }
  },

  join: {
    isAuthorized (folderAggregate, command) {
      return true;
    },

    handle (folderAggregate, command) {
      // ...
    }
  }
  /* eslint-enable no-unused-vars */
};

const events = {
  /* eslint-disable no-unused-vars */
  started: {
    handle (folderAggregate, event) {
      // ...
    },

    isAuthorized (folderAggregate, event) {
      return true;
    }
  },

  joined: {
    handle (folderAggregate, event) {
      // ...
    },

    isAuthorized (folderAggregate, command) {
      return true;
    }
  }
  /* eslint-enable no-unused-vars */
};

module.exports = { initialState, commands, events };
