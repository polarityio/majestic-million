'use strict';

const Papa = require('papaparse');
const fs = require('fs');

let Logger;
const domainLookup = new Map();

function startup(logger) {
  Logger = logger;
  return function (cb) {
    const csv = fs.createReadStream('./data/majestic_million.csv', 'utf8');
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      delimiter: ',',
      quoteChar: '"',
      step: (results, parser) => {
        if (results.errors.length > 0) {
          return parser.abort();
        }

        let domain = results.data;
        domain.GlobalRankDiff = domain.PrevGlobalRank - domain.GlobalRank;
        domain.TldRankDiff = domain.PrevTldRank - domain.TldRank;
        domain.RefSubNetsDiff = domain.PrevRefSubNets - domain.RefSubNets;
        domain.RefIPsDiff = domain.PrevRefIPs - domain.RefIPs;
        domainLookup.set(domain.Domain.toLowerCase(), domain);
      },
      error: (error) => {
        Logger.error({ error }, 'Error parsing Majestic Million CSV File');
      },
      complete: () => {
        logMemoryUsage();

        cb(null);
      }
    });
  };
}

function logMemoryUsage() {
  Logger.info(process.memoryUsage(), 'Memory Usage');
}

function doLookup(entities, options, cb) {
  Logger.debug({ entities: entities, options: options }, 'doLookup');

  let entityResults = [];

  entities.forEach((entity) => {
    if (domainLookup.has(entity.value.toLowerCase())) {
      let domain = domainLookup.get(entity.value.toLowerCase());
      Logger.debug(domain);
      entityResults.push({
        entity: entity,
        data: {
          summary: [`Rank ${domain.GlobalRank} (${domain.GlobalRankDiff > 0 ? '+' : ''}${domain.GlobalRankDiff})`],
          details: domain
        }
      });
    }
  });

  cb(null, entityResults);
}

module.exports = {
  doLookup: doLookup,
  startup: startup
};
