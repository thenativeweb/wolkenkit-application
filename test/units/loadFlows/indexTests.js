'use strict';

const path = require('path');

const assert = require('assertthat');

const loadFlows = require('../../../src/loadFlows');

suite('loadFlows', () => {
  test('is a function.', async () => {
    assert.that(loadFlows).is.ofType('function');
  });

  test('throws an error if no flows directory is given.', async () => {
    assert.that(() => {
      loadFlows();
    }).is.throwing('Cannot destructure property `loadSource` of \'undefined\' or \'null\'.');
  });

  test('returns the flows configuration.', async () => {
    const flows = loadFlows(path.join(__dirname, '..', '..', 'shared', 'sampleApp', 'server', 'flows'), { loadSource: false });

    assert.that(flows).is.equalTo({
      stateless: {},
      stateful: {}
    });
  });

  test('returns the flows with source code if requested.', async () => {
    const flows = loadFlows(path.join(__dirname, '..', '..', 'shared', 'sampleApp', 'server', 'flows'), { loadSource: true });

    assert.that(flows.stateless).is.ofType('object');
    assert.that(flows.stateless.reactions).is.ofType('object');
    assert.that(flows.stateless.reactions['planning.peerGroup.started']).is.ofType('function');
    assert.that(flows.stateless.reactions['planning.peerGroup.joined']).is.ofType('function');

    assert.that(flows.stateful).is.ofType('object');
    assert.that(flows.stateful.identity).is.ofType('object');
    assert.that(flows.stateful.identity['planning.peerGroup.started']).is.ofType('function');
    assert.that(flows.stateful.identity['planning.peerGroup.joined']).is.ofType('function');
    assert.that(flows.stateful.initialState).is.equalTo({ is: 'pristine' });
    assert.that(flows.stateful.transitions).is.ofType('object');
    assert.that(flows.stateful.transitions.pristine).is.ofType('object');
    assert.that(flows.stateful.transitions.pristine['planning.peerGroup.started']).is.ofType('function');
    assert.that(flows.stateful.transitions.pristine['planning.peerGroup.joined']).is.ofType('function');
    assert.that(flows.stateful.reactions).is.ofType('object');
    assert.that(flows.stateful.reactions.pristine).is.ofType('object');
    assert.that(flows.stateful.reactions.pristine['another-state']).is.ofType('function');
  });
});
