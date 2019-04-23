'use strict';

const path = require('path');

const assert = require('assertthat');

const applicationManager = require('../../../lib/applicationManager');

suite('invalidWithDirectoriesWithoutIndex', () => {
  test('throws an error.', async () => {
    await assert.that(async () => {
      await applicationManager.load({
        directory: path.join(__dirname, '..', '..', 'shared', 'invalidWithDirectoriesWithoutIndex')
      });
    }).is.throwingAsync('Missing required property: initialState (at ./server/writeModel/planning/peerGroup/initialState).');
  });
});
