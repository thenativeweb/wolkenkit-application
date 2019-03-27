'use strict';

const path = require('path');

const assert = require('assertthat');

const applicationManager = require('../../src/applicationManager');

suite('applicationManager', () => {
  test('is an object.', async () => {
    assert.that(applicationManager).is.ofType('object');
  });

  suite('validate', () => {
    test('is a function.', async () => {
      assert.that(applicationManager.validate).is.ofType('function');
    });

    test('throws an error if the directory is missing.', async () => {
      await assert.that(async () => {
        await applicationManager.validate({});
      }).is.throwingAsync('Directory is missing.');
    });

    test('throws an error if the directory does not exist.', async () => {
      await assert.that(async () => {
        await applicationManager.validate({ directory: path.join(__dirname, '..', 'shared', 'non-existent-application') });
      }).is.throwingAsync(ex => ex.code === 'ENOENT');
    });

    test('does not throw an error if the directory exists.', async () => {
      await assert.that(async () => {
        await applicationManager.validate({ directory: path.join(__dirname, '..', 'shared', 'workingApplication') });
      }).is.not.throwingAsync();
    });
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
                  join: {}
                },
                events: {
                  started: {},
                  joined: {},
                  startFailed: {},
                  startRejected: {},
                  joinFailed: {},
                  joinRejected: {}
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
                foo: 'bar'
              },

              commands: {
                start: {},
                join: {}
              },
              events: {}
            }
          }
        });

        assert.that(application.writeModel.planning.peerGroup.commands.start.isAuthorized).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.commands.start.handle).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.commands.join.isAuthorized).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.commands.join.handle).is.ofType('function');

        assert.that(application.writeModel.planning.peerGroup.events.started).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.startFailed).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.startRejected).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.joined).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.joinFailed).is.ofType('function');
        assert.that(application.writeModel.planning.peerGroup.events.joinRejected).is.ofType('function');
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
