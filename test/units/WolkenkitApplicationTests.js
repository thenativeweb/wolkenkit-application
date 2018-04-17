'use strict';

const path = require('path');

const assert = require('assertthat');

const WolkenkitApplication = require('../../src/WolkenkitApplication');

suite('WolkenkitApplication', () => {
  let application;

  suiteSetup(() => {
    application = new WolkenkitApplication(path.join(__dirname, '..', 'shared', 'sampleApp'));
  });

  test('is a function.', async () => {
    assert.that(WolkenkitApplication).is.ofType('function');
  });

  test('throws an error if application directory is missing.', async () => {
    assert.that(() => {
      /* eslint-disable no-new */
      new WolkenkitApplication();
      /* eslint-enable no-new */
    }).is.throwing('Application directory is missing.');
  });

  test('returns the same instance if called twice with the same application directory.', async () => {
    assert.that(new WolkenkitApplication(path.join(__dirname, '..', 'shared', 'sampleApp'))).is.sameAs(application);
  });

  suite('configuration', () => {
    test('is an object.', async () => {
      assert.that(application.configuration).is.ofType('object');
    });

    suite('readModel', () => {
      test('returns the read model configuration.', async () => {
        assert.that(application.configuration.readModel).is.equalTo({
          lists: {
            peerGroups: {}
          }
        });
      });
    });

    suite('writeModel', () => {
      test('returns the write model configuration.', async () => {
        assert.that(application.configuration.writeModel).is.equalTo({
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
    });

    suite('flows', () => {
      test('returns the flows configuration.', async () => {
        assert.that(application.configuration.flows).is.equalTo({
          stateful: {},
          stateless: {}
        });
      });
    });
  });

  suite('readModel', () => {
    test('is an object.', async () => {
      assert.that(application.readModel).is.ofType('object');
    });

    test('returns the read model with source code.', async () => {
      assert.that(application.readModel.lists.peerGroups).is.ofType('object');
      assert.that(application.readModel.lists.peerGroups.fields).is.ofType('object');
      assert.that(application.readModel.lists.peerGroups.fields.foo).is.equalTo('bar');
      assert.that(application.readModel.lists.peerGroups.projections).is.ofType('object');
      assert.that(application.readModel.lists.peerGroups.projections['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.readModel.lists.peerGroups.projections['planning.peerGroup.joined']).is.ofType('function');
    });
  });

  suite('writeModel', () => {
    test('is an object.', async () => {
      assert.that(application.writeModel).is.ofType('object');
    });

    test('returns the write model with source code.', async () => {
      assert.that(application.writeModel.planning.peerGroup).is.ofType('object');
      assert.that(application.writeModel.planning.peerGroup.commands).is.ofType('object');
      assert.that(application.writeModel.planning.peerGroup.commands.start).is.ofType('function');
      assert.that(application.writeModel.planning.peerGroup.commands.join).is.ofType('function');
      assert.that(application.writeModel.planning.peerGroup.events).is.ofType('object');
      assert.that(application.writeModel.planning.peerGroup.events.started).is.ofType('function');
      assert.that(application.writeModel.planning.peerGroup.events.joined).is.ofType('function');
    });
  });

  suite('flows', () => {
    test('is an object.', async () => {
      assert.that(application.flows).is.ofType('object');
    });

    test('returns the flows with source code.', async () => {
      assert.that(application.flows.stateless).is.ofType('object');
      assert.that(application.flows.stateless.reactions).is.ofType('object');
      assert.that(application.flows.stateless.reactions['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.flows.stateless.reactions['planning.peerGroup.joined']).is.ofType('function');

      assert.that(application.flows.stateful).is.ofType('object');
      assert.that(application.flows.stateful.identity).is.ofType('object');
      assert.that(application.flows.stateful.identity['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.flows.stateful.identity['planning.peerGroup.joined']).is.ofType('function');
      assert.that(application.flows.stateful.initialState).is.equalTo({ is: 'pristine' });
      assert.that(application.flows.stateful.transitions).is.ofType('object');
      assert.that(application.flows.stateful.transitions.pristine).is.ofType('object');
      assert.that(application.flows.stateful.transitions.pristine['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.flows.stateful.transitions.pristine['planning.peerGroup.joined']).is.ofType('function');
      assert.that(application.flows.stateful.reactions).is.ofType('object');
      assert.that(application.flows.stateful.reactions.pristine).is.ofType('object');
      assert.that(application.flows.stateful.reactions.pristine['another-state']).is.ofType('function');
    });
  });
});
