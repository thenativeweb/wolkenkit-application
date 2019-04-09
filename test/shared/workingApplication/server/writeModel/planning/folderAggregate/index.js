'use strict';

const initialState = {
  foo: 'bar',

  isAuthorized: {
    commands: {
      start: { forPublic: true },
      join: { forAuthenticated: true }
    }
  }
};

const commands = {
  /* eslint-disable no-unused-vars */
  start (folderAggregate, command) {
    // ...
  },

  join (folderAggregate, command) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

const events = {
  /* eslint-disable no-unused-vars */
  started (folderAggregate, event) {
    // ...
  },

  joined (folderAggregate, event) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

module.exports = { initialState, commands, events };
