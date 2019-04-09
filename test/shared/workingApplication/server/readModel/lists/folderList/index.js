'use strict';

const fields = {
  foo: { initialState: '' }
};

const projections = {
  /* eslint-disable no-unused-vars */
  'planning.folderAggregate.started' (event) {
    // ...
  },

  'planning.folderAggregate.joined' (event) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

const queries = {
  readItem: {
    /* eslint-disable no-unused-vars */
    isAuthorized (obj, query) {
      // ...
    },

    filter (obj, query) {
      // ...
    },

    map (obj, query) {
      // ...
    }
    /* eslint-enable no-unused-vars */
  }
};

module.exports = { fields, projections, queries };
