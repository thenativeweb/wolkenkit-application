'use strict';

const path = require('path');

const assert = require('assertthat');

const loadReadModel = require('../../../src/loadReadModel');

suite('loadReadModel', () => {
  test('is a function.', async () => {
    assert.that(loadReadModel).is.ofType('function');
  });

  test('throws an error if no read model directory is given.', async () => {
    assert.that(() => {
      loadReadModel();
    }).is.throwing('Cannot destructure property `loadSource` of \'undefined\' or \'null\'.');
  });

  test('returns the read model configuration.', async () => {
    const readModel = loadReadModel(path.join(__dirname, '..', '..', 'shared', 'sampleApp', 'server', 'readModel'), { loadSource: false });

    assert.that(readModel).is.equalTo({
      lists: {
        peerGroups: {}
      }
    });
  });

  test('returns the read model with source code if requested.', async () => {
    const readModel = loadReadModel(path.join(__dirname, '..', '..', 'shared', 'sampleApp', 'server', 'readModel'), { loadSource: true });

    assert.that(readModel.lists.peerGroups).is.ofType('object');
    assert.that(readModel.lists.peerGroups.fields).is.ofType('object');
    assert.that(readModel.lists.peerGroups.fields.foo).is.equalTo('bar');
    assert.that(readModel.lists.peerGroups.projections).is.ofType('object');
    assert.that(readModel.lists.peerGroups.projections['planning.peerGroup.started']).is.ofType('function');
    assert.that(readModel.lists.peerGroups.projections['planning.peerGroup.joined']).is.ofType('function');
  });
});
