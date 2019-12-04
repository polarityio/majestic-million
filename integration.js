'use strict';

const Papa = require('papaparse');
const fs = require('fs');

let Logger;
const domainLookup = new Map();

function startup(logger) {
  Logger = logger;
  return function(cb) {
    const csvAsString = fs.readFileSync('./data/majestic_million.csv', 'utf8');
    let majesticDomains = Papa.parse(csvAsString, {
      header: true,
      skipEmptyLines: true,
      delimiter: ',',
      quoteChar: '"'
    });
    if (majesticDomains.errors.length > 0) {
      Logger.error({ errors: majesticDomains.errors }, 'Encountered Errors Parsing File');
    }
    Logger.info(`Loaded ${majesticDomains.data.length} rows`);
    majesticDomains.data.forEach((domain) => {
      domain.GlobalRankDiff = domain.PrevGlobalRank - domain.GlobalRank;
      domain.TldRankDiff = domain.PrevTldRank - domain.TldRank;
      domain.RefSubNetsDiff = domain.PrevRefSubNets - domain.RefSubNets;
      domain.RefIPsDiff = domain.PrevRefIPs - domain.RefIPs;
      domainLookup.set(domain.Domain.toLowerCase(), domain);
    });
    cb(null);
  };
}

function doLookup(entities, options, cb) {
  Logger.debug({ entities: entities, options: options }, 'doLookup');

  let entityResults = [];

  entities.forEach((entity) => {
    if (domainLookup.has(entity.value.toLowerCase())) {
      let domain = domainLookup.get(entity.value);
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
