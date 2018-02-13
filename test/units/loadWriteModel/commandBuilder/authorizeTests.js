'use strict';

const assert = require('assertthat'),
      uuid = require('uuidv4');

const authorize = require('../../../../lib/loadWriteModel/commandBuilder/authorize'),
      buildCommand = require('../../../helpers/buildCommand');

suite('authorize', () => {
  test('is a function.', done => {
    assert.that(authorize).is.ofType('function');
    done();
  });

  test('calls authorize on the aggregate.', done => {
    const aggregate = {
      authorize (data) {
        assert.that(data).is.equalTo({
          commands: {
            join: { forPublic: true }
          }
        });
        done();
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
  });

  test('rejects the command if authorize throws an error.', done => {
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
      done();
    };

    authorize(aggregate, command);
  });

  test('does not reject the command if authorize succeeds.', done => {
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
    done();
  });
});
