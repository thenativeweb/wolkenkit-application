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
  start (peerGroup, command) {
    // ...
  },

  join (peerGroup, command) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

const events = {
  /* eslint-disable no-unused-vars */
  started (peerGroup, event) {
    // ...
  },

  joined (peerGroup, event) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

module.exports = { initialState, commands, events };
