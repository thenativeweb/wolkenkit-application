'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const buildEvent = require('../../../shared/buildEvent'),
      transferredOwnership = require('../../../../src/loadWriteModel/eventBuilder/transferredOwnership');

suite('transferredOwnership', () => {
  test('is a function.', async () => {
    assert.that(transferredOwnership).is.ofType('function');
  });

  test('sets the new owner.', async () => {
    await new Promise((resolve, reject) => {
      try {
        const peerGroup = {
          setState (state) {
            assert.that(state).is.equalTo({
              isAuthorized: { owner: 'Jane Doe' }
            });
            resolve();
          }
        };

        const transferredOwnershipEvent = buildEvent('planning', 'peerGroup', uuid(), 'transferredOwnership', {
          to: 'Jane Doe'
        });

        transferredOwnership(peerGroup, transferredOwnershipEvent);
      } catch (ex) {
        reject(ex);
      }
    });
  });
});
