'use strict';

const path = require('path');

const assert = require('assertthat');

const applicationManager = require('../../../lib/applicationManager');

suite('invalidWithContextsMissing', () => {
  test('throws an error.', async () => {
    await assert.that(async () => {
      await applicationManager.load({
        directory: path.join(__dirname, '..', '..', 'shared', 'invalidWithContextsMissing')
      });
    }).is.throwingAsync('Too few properties defined (0), minimum 1 (at ./server/writeModel).');
  });
});
