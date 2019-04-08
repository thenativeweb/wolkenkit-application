'use strict';

const Value = require('validate-value');

const getDirectoryTree = require('./getDirectoryTree');

const validateDirectory = async function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const directoryTree = await getDirectoryTree({ directory });

  const value = new Value({
    type: 'object',
    properties: {
      server: {
        type: 'object',
        properties: {
          writeModel: {
            type: 'object',
            patternProperties: {
              '.*': {
                type: 'object',
                patternProperties: {
                  '.*': {
                    type: 'object',
                    properties: {},
                    required: [],
                    additionalProperties: false
                  }
                },
                minProperties: 1
              }
            },
            minProperties: 1
          },
          readModel: {
            type: 'object',
            properties: {
              lists: {
                type: 'object',
                patternProperties: {
                  '.*': {
                    type: 'object',
                    properties: {},
                    required: [],
                    additionalProperties: false
                  }
                },
                minProperties: 0
              }
            },
            required: [ 'lists' ],
            additionalProperties: false
          },
          flows: {
            type: 'object',
            patternProperties: {
              '.*': {
                type: 'object',
                properties: {},
                required: [],
                additionalProperties: false
              }
            },
            minProperties: 0
          }
        },
        required: [ 'writeModel', 'readModel', 'flows' ],
        additionalProperties: true
      }
    },
    required: [ 'server' ],
    additionalProperties: true
  });

  value.validate(directoryTree, { valueName: '.', separator: '/' });
};

module.exports = validateDirectory;
