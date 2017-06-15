'use strict';

const path = require('path');

const assert = require('assertthat');

const loadReadModel = require('../../lib/loadReadModel');

suite('loadReadModel', () => {
  test('is a function.', done => {
    assert.that(loadReadModel).is.ofType('function');
    done();
  });

  test('throws an error if no read model directory is given.', done => {
    assert.that(() => {
      loadReadModel();
    }).is.throwing('Read model directory is missing.');
    done();
  });

  test('returns the read model configuration.', done => {
    const readModel = loadReadModel(path.join(__dirname, '..', 'sampleApp', 'server', 'readModel'));

    assert.that(readModel).is.equalTo({
      lists: {
        peerGroups: {}
      }
    });
    done();
  });

  test('returns the read model with source code if requested.', done => {
    const readModel = loadReadModel(path.join(__dirname, '..', 'sampleApp', 'server', 'readModel'), { loadSource: true });

    assert.that(readModel.lists.peerGroups).is.ofType('object');
    assert.that(readModel.lists.peerGroups.fields).is.ofType('object');
    assert.that(readModel.lists.peerGroups.fields.foo).is.equalTo('bar');
    assert.that(readModel.lists.peerGroups.when).is.ofType('object');
    assert.that(readModel.lists.peerGroups.when['planning.peerGroup.started']).is.ofType('function');
    assert.that(readModel.lists.peerGroups.when['planning.peerGroup.joined']).is.ofType('function');

    done();
  });
});
