'use strict';

const path = require('path');

const assert = require('assertthat');

const loadWriteModel = require('../../../lib/loadWriteModel');

suite('loadWriteModel', () => {
  test('is a function.', done => {
    assert.that(loadWriteModel).is.ofType('function');
    done();
  });

  test('throws an error if no write model directory is given.', done => {
    assert.that(() => {
      loadWriteModel();
    }).is.throwing('Cannot destructure property `loadSource` of \'undefined\' or \'null\'.');
    done();
  });

  test('returns the write model configuration.', done => {
    const writeModel = loadWriteModel(path.join(__dirname, '..', '..', 'sampleApp', 'server', 'writeModel'), { loadSource: false });

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
    done();
  });

  test('returns the write model with source code if requested.', done => {
    const writeModel = loadWriteModel(path.join(__dirname, '..', '..', 'sampleApp', 'server', 'writeModel'), { loadSource: true });

    assert.that(writeModel.planning.peerGroup).is.ofType('object');
    assert.that(writeModel.planning.peerGroup.commands).is.ofType('object');
    assert.that(writeModel.planning.peerGroup.commands.start).is.ofType('function');
    assert.that(writeModel.planning.peerGroup.commands.join).is.ofType('function');
    assert.that(writeModel.planning.peerGroup.events).is.ofType('object');
    assert.that(writeModel.planning.peerGroup.events.started).is.ofType('function');
    assert.that(writeModel.planning.peerGroup.events.joined).is.ofType('function');

    done();
  });
});
