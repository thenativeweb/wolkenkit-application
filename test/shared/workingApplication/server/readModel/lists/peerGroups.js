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

module.exports = { fields, projections };
