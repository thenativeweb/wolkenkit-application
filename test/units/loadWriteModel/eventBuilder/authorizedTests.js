'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const authorized = require('../../../../lib/loadWriteModel/eventBuilder/authorized'),
      buildEvent = require('../../../helpers/buildEvent');

suite('authorized', () => {
  test('is a function.', done => {
    assert.that(authorized).is.ofType('function');
    done();
  });

  test('sets the authorization options.', done => {
    const peerGroup = {
      setState (state) {
        assert.that(state).is.equalTo({
          isAuthorized: { commands: { join: { forAuthenticated: true }}}
        });
        done();
      }
    };

    const authorizedEvent = buildEvent('planning', 'peerGroup', uuid(), 'authorized', {
      commands: { join: { forAuthenticated: true }}
    });

    authorized(peerGroup, authorizedEvent);
  });
});
