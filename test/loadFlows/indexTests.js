'use strict';

const path = require('path');

const assert = require('assertthat');

const loadFlows = require('../../lib/loadFlows');

suite('loadFlows', () => {
  test('is a function.', done => {
    assert.that(loadFlows).is.ofType('function');
    done();
  });

  test('throws an error if no flows directory is given.', done => {
    assert.that(() => {
      loadFlows();
    }).is.throwing('Flows directory is missing.');
    done();
  });

  test('returns the flows configuration.', done => {
    const flows = loadFlows(path.join(__dirname, '..', 'sampleApp', 'server', 'flows'));

    assert.that(flows).is.equalTo({
      stateless: {},
      stateful: {}
    });
    done();
  });

  test('returns the flows with source code if requested.', done => {
    const flows = loadFlows(path.join(__dirname, '..', 'sampleApp', 'server', 'flows'), { loadSource: true });

    assert.that(flows.stateless).is.ofType('object');
    assert.that(flows.stateless.when).is.ofType('object');
    assert.that(flows.stateless.when['planning.peerGroup.started']).is.ofType('function');
    assert.that(flows.stateless.when['planning.peerGroup.joined']).is.ofType('function');

    assert.that(flows.stateful).is.ofType('object');
    assert.that(flows.stateful.identity).is.ofType('object');
    assert.that(flows.stateful.identity['planning.peerGroup.started']).is.ofType('function');
    assert.that(flows.stateful.identity['planning.peerGroup.joined']).is.ofType('function');
    assert.that(flows.stateful.initialState).is.equalTo({ foo: 'bar' });
    assert.that(flows.stateful.when).is.ofType('object');
    assert.that(flows.stateful.when['planning.peerGroup.started']).is.ofType('function');
    assert.that(flows.stateful.when['planning.peerGroup.joined']).is.ofType('function');

    done();
  });
});
