'use strict';

const cloneDeep = require('lodash/cloneDeep'),
      merge = require('lodash/merge');

const commands = require('./templates/writeModel/commands'),
      events = require('./templates/writeModel/events');

const extendWriteModel = function ({ writeModel }) {
  if (!writeModel) {
    throw new Error('Write model is missing.');
  }

  const extendedWriteModel = cloneDeep(writeModel);

  for (const context of Object.keys(extendedWriteModel.configuration)) {
    for (const aggregate of Object.keys(extendedWriteModel.configuration[context])) {
      // Add system commands.
      for (const command of Object.keys(commands)) {
        if (extendedWriteModel.configuration[context][aggregate].commands[command]) {
          throw new Error(`Reserved command name '${command}' used in extendedWriteModel/${context}/${aggregate}.`);
        }

        extendedWriteModel.configuration[context][aggregate].commands[command] = {};
        extendedWriteModel.implementation[context][aggregate].commands[command] = commands[command];
      }

      // Add system events.
      for (const event of Object.keys(events)) {
        if (extendedWriteModel.configuration[context][aggregate].events[event]) {
          throw new Error(`Reserved event name '${event}' used in extendedWriteModel/${context}/${aggregate}.`);
        }

        extendedWriteModel.configuration[context][aggregate].events[event] = {};
        extendedWriteModel.implementation[context][aggregate].events[event] = events[event];
      }

      // Add authorization.
      for (const command of Object.keys(extendedWriteModel.implementation[context][aggregate].commands)) {
        extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized = merge({
          commands: {
            [command]: { forAuthenticated: false, forPublic: false }
          }
        }, extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized);
      }

      for (const event of Object.keys(extendedWriteModel.implementation[context][aggregate].events)) {
        extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized = merge({
          events: {
            [event]: { forAuthenticated: false, forPublic: false }
          }
        }, extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized);
      }
    }
  }

  // Add ...Failed and ...Rejected events.
  for (const context of Object.keys(extendedWriteModel.configuration)) {
    for (const aggregate of Object.keys(extendedWriteModel.configuration[context])) {
      for (const command of Object.keys(extendedWriteModel.configuration[context][aggregate].commands)) {
        extendedWriteModel.configuration[context][aggregate].events[`${command}Failed`] = {};
        extendedWriteModel.configuration[context][aggregate].events[`${command}Rejected`] = {};
      }
    }
  }

  return extendedWriteModel;
};

module.exports = extendWriteModel;
