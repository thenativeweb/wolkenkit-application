'use strict';

const path = require('path');

const assert = require('assertthat');

const applicationManager = require('../../src/applicationManager');

suite('applicationManager', () => {
  test('is an object.', async () => {
    assert.that(applicationManager).is.ofType('object');
  });

  suite('load', () => {
    let application;

    suiteSetup(async () => {
      application = await applicationManager.load({
        directory: path.join(__dirname, '..', 'shared', 'workingApplication')
      });
    });

    test('is a function.', async () => {
      assert.that(applicationManager.load).is.ofType('function');
    });

    test('throws an error if the directory is missing.', async () => {
      await assert.that(async () => {
        await applicationManager.load({});
      }).is.throwingAsync('Directory is missing.');
    });

    test('throws an error if the directory does not exist.', async () => {
      await assert.that(async () => {
        await applicationManager.load({ directory: path.join(__dirname, '..', 'shared', 'non-existent-application') });
      }).is.throwingAsync(ex => ex.code === 'ENOENT');
    });

    test('returns the same instance if called twice with the same application directory.', async () => {
      const application1 = await applicationManager.load({
        directory: path.join(__dirname, '..', 'shared', 'workingApplication')
      });
      const application2 = await applicationManager.load({
        directory: path.join(__dirname, '..', 'shared', 'workingApplication')
      });

      assert.that(application1).is.sameAs(application2);
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
                  authorize: {},
                  transferOwnership: {}
                },
                events: {
                  started: {},
                  joined: {},
                  authorized: {},
                  transferredOwnership: {},
                  startFailed: {},
                  startRejected: {},
                  joinFailed: {},
                  joinRejected: {},
                  authorizeFailed: {},
                  authorizeRejected: {},
                  transferOwnershipFailed: {},
                  transferOwnershipRejected: {}
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
      test('returns the read model with source code.', async () => {
        assert.that(application.readModel).is.atLeast({
          lists: {
            peerGroups: {
              fields: {
                foo: { initialState: '' }
              },
              projections: {}
            }
          }
        });

        assert.that(application.readModel.lists.peerGroups.projections['planning.peerGroup.started']).is.ofType('function');
        assert.that(application.readModel.lists.peerGroups.projections['planning.peerGroup.joined']).is.ofType('function');
      });
    });

    suite('writeModel', () => {
      test('returns the write model with source code.', async () => {
        assert.that(application.writeModel).is.atLeast({
          planning: {
            peerGroup: {
              initialState: {
                foo: 'bar',

                isAuthorized: {
                  commands: {
                    start: { forPublic: true, forAuthenticated: false },
                    join: { forPublic: false, forAuthenticated: true },
                    authorize: { forPublic: false, forAuthenticated: false },
                    transferOwnership: { forPublic: false, forAuthenticated: false }
                  },
                  events: {
                    started: { forPublic: false, forAuthenticated: false },
                    startFailed: { forPublic: false, forAuthenticated: false },
                    startRejected: { forPublic: false, forAuthenticated: false },
                    joined: { forPublic: false, forAuthenticated: false },
                    joinFailed: { forPublic: false, forAuthenticated: false },
                    joinRejected: { forPublic: false, forAuthenticated: false },
                    authorized: { forPublic: false, forAuthenticated: false },
                    authorizeFailed: { forPublic: false, forAuthenticated: false },
                    authorizeRejected: { forPublic: false, forAuthenticated: false },
                    transferredOwnership: { forPublic: false, forAuthenticated: false },
                    transferOwnershipFailed: { forPublic: false, forAuthenticated: false },
                    transferOwnershipRejected: { forPublic: false, forAuthenticated: false }
                  }
                }
              },

              commands: {},
              events: {}
            }
          }
        });

        assert.that(application.writeModel.planning.peerGroup.commands.start).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.commands.join).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.commands.authorize).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.commands.transferOwnership).is.ofType('function');

        assert.that(application.writeModel.planning.peerGroup.events.started).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.startFailed).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.startRejected).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.joined).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.joinFailed).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.joinRejected).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.authorized).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.authorizeFailed).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.authorizeRejected).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.transferredOwnership).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.transferOwnershipFailed).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.transferOwnershipRejected).is.ofType('function');
      });
    });

    suite('flows', () => {
      test('returns the flows with source code.', async () => {
        assert.that(application.flows).is.atLeast({
          stateful: {
            identity: {},
            initialState: {
              is: 'pristine'
            },
            transitions: {
              pristine: {}
            },
            reactions: {
              pristine: {}
            }
          },
          stateless: {
            reactions: {}
          }
        });

        assert.that(application.flows.stateless.reactions['planning.peerGroup.started']).is.ofType('function');
        assert.that(application.flows.stateless.reactions['planning.peerGroup.joined']).is.ofType('function');

        assert.that(application.flows.stateful.identity['planning.peerGroup.started']).is.ofType('function');
        assert.that(application.flows.stateful.identity['planning.peerGroup.joined']).is.ofType('function');
        assert.that(application.flows.stateful.transitions.pristine['planning.peerGroup.started']).is.ofType('function');
        assert.that(application.flows.stateful.transitions.pristine['planning.peerGroup.joined']).is.ofType('function');
        assert.that(application.flows.stateful.reactions.pristine['another-state']).is.ofType('function');
      });
    });
  });
});
