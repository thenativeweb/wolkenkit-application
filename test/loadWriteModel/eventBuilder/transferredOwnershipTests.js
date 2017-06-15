'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const buildEvent = require('../../helpers/buildEvent'),
      transferredOwnership = require('../../../lib/loadWriteModel/eventBuilder/transferredOwnership');

suite('transferredOwnership', () => {
  test('is a function.', done => {
    assert.that(transferredOwnership).is.ofType('function');
    done();
  });

  test('sets the new owner.', done => {
    const peerGroup = {
      setState (state) {
        assert.that(state).is.equalTo({
          isAuthorized: { owner: 'Jane Doe' }
        });
        done();
      }
    };

    const transferredOwnershipEvent = buildEvent('planning', 'peerGroup', uuid(), 'transferredOwnership', {
      to: 'Jane Doe'
    });

    transferredOwnership(peerGroup, transferredOwnershipEvent);
  });
});
