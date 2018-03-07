const elasticsearch = require('elasticsearch');
const elasticConfig = require('./elastic-config');

const client = new elasticsearch.Client({
  host: elasticConfig.host,
  httpAuth: elasticConfig.httpAuth,
  log: 'error'
});

module.exports = client;
