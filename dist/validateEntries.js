'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Value = require('validate-value');

var validateStructure =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var entries, value;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            entries = _ref.entries;

            if (entries) {
              _context.next = 3;
              break;
            }

            throw new Error('Entries are missing.');

          case 3:
            value = new Value({
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
                              properties: {
                                initialState: {
                                  type: 'object',
                                  properties: {
                                    isAuthorized: {
                                      type: 'object',
                                      properties: {
                                        commands: {
                                          type: 'object',
                                          patternProperties: {
                                            '.*': {
                                              type: 'object',
                                              properties: {
                                                forPublic: {
                                                  type: 'boolean'
                                                },
                                                forAuthenticated: {
                                                  type: 'boolean'
                                                }
                                              },
                                              required: [],
                                              additionalProperties: false
                                            }
                                          }
                                        },
                                        events: {
                                          type: 'object',
                                          patternProperties: {
                                            '.*': {
                                              type: 'object',
                                              properties: {
                                                forPublic: {
                                                  type: 'boolean'
                                                },
                                                forAuthenticated: {
                                                  type: 'boolean'
                                                }
                                              },
                                              required: [],
                                              additionalProperties: false
                                            }
                                          }
                                        }
                                      },
                                      required: [],
                                      additionalProperties: false
                                    }
                                  },
                                  required: [],
                                  additionalProperties: true
                                },
                                commands: {
                                  type: 'object',
                                  properties: {},
                                  required: [],
                                  additionalProperties: true
                                },
                                events: {
                                  type: 'object',
                                  properties: {},
                                  required: [],
                                  additionalProperties: true
                                }
                              },
                              required: ['initialState', 'commands', 'events'],
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
                              properties: {
                                fields: {
                                  type: 'object',
                                  patternProperties: {
                                    '.*': {
                                      type: 'object',
                                      properties: {
                                        initialState: {},
                                        fastLookup: {
                                          type: 'boolean'
                                        },
                                        isUnique: {
                                          type: 'boolean'
                                        }
                                      },
                                      required: ['initialState'],
                                      additionalProperties: false
                                    }
                                  },
                                  minProperties: 1
                                },
                                projections: {
                                  type: 'object',
                                  properties: {},
                                  required: [],
                                  additionalProperties: true
                                },
                                queries: {
                                  type: 'object',
                                  properties: {
                                    readItem: {
                                      type: 'object',
                                      properties: {
                                        isAuthorized: {},
                                        filter: {},
                                        map: {}
                                      },
                                      required: [],
                                      additionalProperties: false
                                    }
                                  },
                                  required: ['readItem'],
                                  additionalProperties: false
                                }
                              },
                              required: ['fields', 'projections'],
                              additionalProperties: false
                            }
                          },
                          minProperties: 0
                        }
                      },
                      required: ['lists'],
                      additionalProperties: false
                    },
                    flows: {
                      type: 'object',
                      patternProperties: {
                        '.*': {
                          oneOf: [{
                            type: 'object',
                            properties: {
                              reactions: {
                                type: 'object',
                                properties: {},
                                required: [],
                                additionalProperties: true
                              },
                              identity: {
                                type: 'object',
                                properties: {},
                                required: [],
                                additionalProperties: true
                              },
                              initialState: {
                                type: 'object',
                                properties: {},
                                required: [],
                                additionalProperties: true
                              },
                              transitions: {
                                type: 'object',
                                patternProperties: {
                                  '.*': {
                                    type: 'object',
                                    properties: {},
                                    required: [],
                                    additionalProperties: true
                                  }
                                },
                                minProperties: 1
                              }
                            },
                            required: ['reactions', 'identity', 'initialState', 'transitions'],
                            additionalProperties: false
                          }, {
                            type: 'object',
                            properties: {
                              reactions: {
                                type: 'object',
                                properties: {},
                                required: [],
                                additionalProperties: true
                              }
                            },
                            required: ['reactions'],
                            additionalProperties: false
                          }]
                        }
                      },
                      minProperties: 0
                    }
                  },
                  required: ['writeModel', 'readModel', 'flows'],
                  additionalProperties: true
                }
              },
              required: ['server'],
              additionalProperties: true
            });
            value.validate(entries, {
              valueName: '.',
              separator: '/'
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateStructure(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = validateStructure;