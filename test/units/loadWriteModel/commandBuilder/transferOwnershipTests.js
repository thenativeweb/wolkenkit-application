'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const buildCommand = require('../../../shared/buildCommand'),
      transferOwnership = require('../../../../src/loadWriteModel/commandBuilder/transferOwnership');

suite('transferOwnership', () => {
  test('is a function.', async () => {
    assert.that(transferOwnership).is.ofType('function');
  });

  test('calls transferOwnership on the aggregate.', async () => {
    await new Promise((resolve, reject) => {
      try {
        const newOwnerId = uuid();
        const aggregate = {
          exists () {
            return true;
          },

          transferOwnership (data) {
            assert.that(data.to).is.equalTo(newOwnerId);
            resolve();
          }
        };
        const command = buildCommand('planning', 'peerGroup', uuid(), 'transferOwnership', {
          to: newOwnerId
        });

        command.reject = function (reason) {
          throw new Error(reason);
        };

        transferOwnership(aggregate, command);
      } catch (ex) {
        reject(ex);
      }
    });
  });

  test('rejects the command if transferOwnership throws an error.', async () => {
    await new Promise((resolve, reject) => {
      try {
        const aggregate = {
          exists () {
            return true;
          },

          transferOwnership () {
            throw new Error('foo');
          }
        };
        const command = buildCommand('planning', 'peerGroup', uuid(), 'transferOwnership', {
          to: 'Jane Doe'
        });

        command.reject = function (reason) {
          assert.that(reason).is.equalTo('foo');
          resolve();
        };

        transferOwnership(aggregate, command);
      } catch (ex) {
        reject(ex);
      }
    });
  });

  test('does not reject the command if transferOwnership succeeds.', async () => {
    const aggregate = {
      exists () {
        return true;
      },

      transferOwnership () {}
    };
    const command = buildCommand('planning', 'peerGroup', uuid(), 'transferOwnership', {
      to: 'Jane Doe'
    });

    let wasCalled = false;

    command.reject = function () {
      wasCalled = true;
    };

    transferOwnership(aggregate, command);

    assert.that(wasCalled).is.false();
  });
});
