'use strict';

/* eslint-disable no-unused-vars */
const nonExistent = require('non-existent');
/* eslint-enable no-unused-vars */

const initialState = {
  foo: 'bar'
};

const commands = {
  /* eslint-disable no-unused-vars */
  start: {
    isAuthorized (peerGroup, command) {
      return true;
    },

    handle (peerGroup, command) {
      // ...
    }
  },

  join: {
    schema: {
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: true
    },

    isAuthorized (peerGroup, command) {
      return true;
    },

    handle (peerGroup, command) {
      // ...
    }
  }
  /* eslint-enable no-unused-vars */
};

const events = {
  /* eslint-disable no-unused-vars */
  started: {
    handle (peerGroup, event) {
      // ...
    },

    isAuthorized (peerGroup, event) {
      return true;
    }
  },

  joined: {
    handle (peerGroup, event) {
      // ...
    },

    isAuthorized (peerGroup, event) {
      return true;
    },

    filter (peerGroup, event) {
      return true;
    },

    map (peerGroup, event) {
      return event;
    }
  }
  /* eslint-enable no-unused-vars */
};

module.exports = { initialState, commands, events };
