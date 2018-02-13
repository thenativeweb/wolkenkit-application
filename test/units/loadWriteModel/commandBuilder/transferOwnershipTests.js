'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const buildCommand = require('../../../helpers/buildCommand'),
      transferOwnership = require('../../../../lib/loadWriteModel/commandBuilder/transferOwnership');

suite('transferOwnership', () => {
  test('is a function.', done => {
    assert.that(transferOwnership).is.ofType('function');
    done();
  });

  test('calls transferOwnership on the topic.', done => {
    const newOwnerId = uuid();
    const topic = {
      transferOwnership (data) {
        assert.that(data.to).is.equalTo(newOwnerId);
        done();
      }
    };
    const command = buildCommand('planning', 'peerGroup', uuid(), 'transferOwnership', {
      to: newOwnerId
    });

    command.reject = function (reason) {
      throw new Error(reason);
    };

    transferOwnership(topic, command);
  });

  test('rejects the command if transferOwnership throws an error.', done => {
    const topic = {
      transferOwnership () {
        throw new Error('foo');
      }
    };
    const command = buildCommand('planning', 'peerGroup', uuid(), 'transferOwnership', {
      to: 'Jane Doe'
    });

    command.reject = function (reason) {
      assert.that(reason).is.equalTo('foo');
      done();
    };

    transferOwnership(topic, command);
  });

  test('does not reject the command if transferOwnership succeeds.', done => {
    const topic = {
      transferOwnership () {}
    };
    const command = buildCommand('planning', 'peerGroup', uuid(), 'transferOwnership', {
      to: 'Jane Doe'
    });

    let wasCalled = false;

    command.reject = function () {
      wasCalled = true;
    };

    transferOwnership(topic, command);

    assert.that(wasCalled).is.false();
    done();
  });
});
