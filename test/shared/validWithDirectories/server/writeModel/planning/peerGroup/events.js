'use strict';

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

module.exports = events;
