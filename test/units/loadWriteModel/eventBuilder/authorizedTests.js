'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const authorized = require('../../../../src/loadWriteModel/eventBuilder/authorized'),
      buildEvent = require('../../../shared/buildEvent');

suite('authorized', () => {
  test('is a function.', async () => {
    assert.that(authorized).is.ofType('function');
  });

  test('sets the authorization options.', async () => {
    await new Promise((resolve, reject) => {
      try {
        const peerGroup = {
          setState (state) {
            assert.that(state).is.equalTo({
              isAuthorized: { commands: { join: { forAuthenticated: true }}}
            });
            resolve();
          }
        };

        const authorizedEvent = buildEvent('planning', 'peerGroup', uuid(), 'authorized', {
          commands: { join: { forAuthenticated: true }}
        });

        authorized(peerGroup, authorizedEvent);
      } catch (ex) {
        reject(ex);
      }
    });
  });
});
