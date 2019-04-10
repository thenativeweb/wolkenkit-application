'use strict';

const path = require('path');

const assert = require('assertthat');

const applicationManager = require('../../../lib/applicationManager');

suite('invalidWithWriteModelMissing', () => {
  test('throws an error.', async () => {
    await assert.that(async () => {
      await applicationManager.load({
        directory: path.join(__dirname, '..', '..', 'shared', 'invalidWithWriteModelMissing')
      });
    }).is.throwingAsync('Missing required property: writeModel (at ./server/writeModel).');
  });
});
