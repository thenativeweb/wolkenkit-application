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
    const mark = {
      asDone () {}
    };

    authorize(aggregate, command, mark);
  });

  test('marks command as rejected if authorize throws an error.', done => {
    const aggregate = {
      authorize () {
        throw new Error('foo');
      }
    };
    const command = buildCommand('planning', 'peerGroup', uuid(), 'authorize', {
      to: 'Jane Doe'
    });
    const mark = {
      asRejected (reason) {
        assert.that(reason).is.equalTo('foo');
        done();
      }
    };

    authorize(aggregate, command, mark);
  });

  test('marks command as done if authorize succeeds.', done => {
    const aggregate = {
      authorize () {}
    };
    const command = buildCommand('planning', 'peerGroup', uuid(), 'authorize', {
      to: 'Jane Doe'
    });
    const mark = {
      asDone () {
        done();
      }
    };

    authorize(aggregate, command, mark);
  });
});
