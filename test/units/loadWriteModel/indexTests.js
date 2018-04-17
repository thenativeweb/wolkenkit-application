'use strict';

const path = require('path');

const assert = require('assertthat');

const loadWriteModel = require('../../../src/loadWriteModel');

suite('loadWriteModel', () => {
  test('is a function.', async () => {
    assert.that(loadWriteModel).is.ofType('function');
  });

  test('throws an error if no write model directory is given.', async () => {
    assert.that(() => {
      loadWriteModel();
    }).is.throwing('Cannot destructure property `loadSource` of \'undefined\' or \'null\'.');
  });

  test('returns the write model configuration.', async () => {
    const writeModel = loadWriteModel(path.join(__dirname, '..', '..', 'shared', 'sampleApp', 'server', 'writeModel'), { loadSource: false });

    assert.that(writeModel).is.equalTo({
      planning: {
        peerGroup: {
          commands: {
            start: {},
            join: {},
            transferOwnership: {},
            authorize: {}
          },
          events: {
            started: {},
            joined: {},
            transferredOwnership: {},
            authorized: {},
            startFailed: {},
            startRejected: {},
            joinFailed: {},
            joinRejected: {},
            transferOwnershipFailed: {},
            transferOwnershipRejected: {},
            authorizeFailed: {},
            authorizeRejected: {}
          }
        }
      }
    });
  });

  test('returns the write model with source code if requested.', async () => {
    const writeModel = loadWriteModel(path.join(__dirname, '..', '..', 'shared', 'sampleApp', 'server', 'writeModel'), { loadSource: true });

    assert.that(writeModel.planning.peerGroup).is.ofType('object');
    assert.that(writeModel.planning.peerGroup.commands).is.ofType('object');
    assert.that(writeModel.planning.peerGroup.commands.start).is.ofType('function');
    assert.that(writeModel.planning.peerGroup.commands.join).is.ofType('function');
    assert.that(writeModel.planning.peerGroup.events).is.ofType('object');
    assert.that(writeModel.planning.peerGroup.events.started).is.ofType('function');
    assert.that(writeModel.planning.peerGroup.events.joined).is.ofType('function');
  });
});
