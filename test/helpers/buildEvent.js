'use strict';

const Event = require('commands-events').Event,
      uuid = require('uuidv4');

const buildEvent = function (contextName, aggregateName, aggregateId, eventName, data) {
  if (!data) {
    data = eventName;
    eventName = aggregateId;
    aggregateId = uuid();
  }

  return new Event({
    context: { name: contextName },
    aggregate: { name: aggregateName, id: aggregateId },
    name: eventName,
    data,
    metadata: { causationId: uuid(), correlationId: uuid() }
  });
};

module.exports = buildEvent;
