'use strict';

const fields = {
  foo: { initialState: '' }
};

const projections = {
  /* eslint-disable no-unused-vars */
  'planning.peerGroup.started' (event) {
    // ...
  },

  'planning.peerGroup.joined' (event) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

const queries = {
  readList: {
    /* eslint-disable no-unused-vars */
    isAuthorized (peerGroup, query) {
      // ...
    }
    /* eslint-enable no-unused-vars */
  },

  readItem: {
    /* eslint-disable no-unused-vars */
    isAuthorized (peerGroup, query) {
      // ...
    },

    filter (peerGroup, query) {
      // ...
    },

    map (peerGroup, query) {
      // ...
    }
    /* eslint-enable no-unused-vars */
  }
};

module.exports = { fields, projections, queries };
