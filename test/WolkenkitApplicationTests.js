'use strict';

const path = require('path');

const assert = require('assertthat');

const WolkenkitApplication = require('../lib/WolkenkitApplication');

suite('WolkenkitApplication', () => {
  let application;

  suiteSetup(() => {
    application = new WolkenkitApplication(path.join(__dirname, 'sampleApp'));
  });

  test('is a function.', done => {
    assert.that(WolkenkitApplication).is.ofType('function');
    done();
  });

  test('throws an error if application directory is missing.', done => {
    assert.that(() => {
      /* eslint-disable no-new */
      new WolkenkitApplication();
      /* eslint-enable no-new */
    }).is.throwing('Application directory is missing.');
    done();
  });

  test('returns the same instance if called twice with the same application directory.', done => {
    assert.that(new WolkenkitApplication(path.join(__dirname, 'sampleApp'))).is.sameAs(application);
    done();
  });

  suite('configuration', () => {
    test('is an object.', done => {
      assert.that(application.configuration).is.ofType('object');
      done();
    });

    suite('readModel', () => {
      test('returns the read model configuration.', done => {
        assert.that(application.configuration.readModel).is.equalTo({
          lists: {
            peerGroups: {}
          }
        });
        done();
      });
    });

    suite('writeModel', () => {
      test('returns the write model configuration.', done => {
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
        done();
      });
    });

    suite('flows', () => {
      test('returns the flows configuration.', done => {
        assert.that(application.configuration.flows).is.equalTo({
          stateful: {},
          stateless: {}
        });
        done();
      });
    });
  });

  suite('readModel', () => {
    test('is an object.', done => {
      assert.that(application.readModel).is.ofType('object');
      done();
    });

    test('returns the read model with source code.', done => {
      assert.that(application.readModel.lists.peerGroups).is.ofType('object');
      assert.that(application.readModel.lists.peerGroups.fields).is.ofType('object');
      assert.that(application.readModel.lists.peerGroups.fields.foo).is.equalTo('bar');
      assert.that(application.readModel.lists.peerGroups.when).is.ofType('object');
      assert.that(application.readModel.lists.peerGroups.when['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.readModel.lists.peerGroups.when['planning.peerGroup.joined']).is.ofType('function');

      done();
    });
  });

  suite('writeModel', () => {
    test('is an object.', done => {
      assert.that(application.writeModel).is.ofType('object');
      done();
    });

    test('returns the write model with source code.', done => {
      assert.that(application.writeModel.planning.peerGroup).is.ofType('object');
      assert.that(application.writeModel.planning.peerGroup.commands).is.ofType('object');
      assert.that(application.writeModel.planning.peerGroup.commands.start).is.ofType('function');
      assert.that(application.writeModel.planning.peerGroup.commands.join).is.ofType('function');
      assert.that(application.writeModel.planning.peerGroup.events).is.ofType('object');
      assert.that(application.writeModel.planning.peerGroup.events.started).is.ofType('function');
      assert.that(application.writeModel.planning.peerGroup.events.joined).is.ofType('function');

      done();
    });
  });

  suite('flows', () => {
    test('is an object.', done => {
      assert.that(application.flows).is.ofType('object');
      done();
    });

    test('returns the flows with source code.', done => {
      assert.that(application.flows.stateless).is.ofType('object');
      assert.that(application.flows.stateless.when).is.ofType('object');
      assert.that(application.flows.stateless.when['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.flows.stateless.when['planning.peerGroup.joined']).is.ofType('function');

      assert.that(application.flows.stateful).is.ofType('object');
      assert.that(application.flows.stateful.identity).is.ofType('object');
      assert.that(application.flows.stateful.identity['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.flows.stateful.identity['planning.peerGroup.joined']).is.ofType('function');
      assert.that(application.flows.stateful.initialState).is.equalTo({ foo: 'bar' });
      assert.that(application.flows.stateful.when).is.ofType('object');
      assert.that(application.flows.stateful.when['planning.peerGroup.started']).is.ofType('function');
      assert.that(application.flows.stateful.when['planning.peerGroup.joined']).is.ofType('function');

      done();
    });
  });
});
