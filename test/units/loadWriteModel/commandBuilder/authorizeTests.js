'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const authorize = require('../../../../src/loadWriteModel/commandBuilder/authorize'),
      buildCommand = require('../../../shared/buildCommand');

suite('authorize', () => {
  test('is a function.', async () => {
    assert.that(authorize).is.ofType('function');
  });

  test('calls authorize on the aggregate.', async () => {
    await new Promise((resolve, reject) => {
      try {
        const aggregate = {
          authorize (data) {
            assert.that(data).is.equalTo({
              commands: {
                join: { forPublic: true }
              }
            });
            resolve();
          }
        };
        const command = buildCommand('planning', 'peerGroup', uuid(), 'authorize', {
          commands: {
            join: { forPublic: true }
          }
        });

        command.reject = function (reason) {
          throw new Error(reason);
        };

        authorize(aggregate, command);
      } catch (ex) {
        reject(ex);
      }
    });
  });

  test('rejects the command if authorize throws an error.', async () => {
    await new Promise((resolve, reject) => {
      try {
        const aggregate = {
          authorize () {
            throw new Error('foo');
          }
        };
        const command = buildCommand('planning', 'peerGroup', uuid(), 'authorize', {
          to: 'Jane Doe'
        });

        command.reject = function (reason) {
          assert.that(reason).is.equalTo('foo');
          resolve();
        };

        authorize(aggregate, command);
      } catch (ex) {
        reject(ex);
      }
    });
  });

  test('does not reject the command if authorize succeeds.', async () => {
    const aggregate = {
      authorize () {}
    };
    const command = buildCommand('planning', 'peerGroup', uuid(), 'authorize', {
      to: 'Jane Doe'
    });

    let wasCalled = false;

    command.reject = function () {
      wasCalled = true;
    };

    authorize(aggregate, command);

    assert.that(wasCalled).is.false();
  });
});
