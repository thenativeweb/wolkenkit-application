'use strict';

const identity = {
  /* eslint-disable no-unused-vars */
  'planning.peerGroup.started' (event) {
    // ...
  },

  'planning.peerGroup.joined' (event) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

const initialState = {
  foo: 'bar'
};

const when = {
  /* eslint-disable no-unused-vars */
  'planning.peerGroup.started' (event, done) {
    // ...
  },

  'planning.peerGroup.joined' (event, done) {
    // ...
  }
  /* eslint-enable no-unused-vars */
};

module.exports = { identity, initialState, when };
