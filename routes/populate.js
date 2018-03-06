const express = require('express');
const client = require('../elastic-client');

const router = express.Router();

const events = require('../data/events.json');
console.log(events.length);

router.get('/events', (req, res) => {
  const indexingData = [];
  const indexInfo = { index: { _index: 'events', _type: 'ngoevent' } };
  events.forEach(event => {
    indexingData.push(indexInfo);
    indexingData.push(JSON.stringify(event));
  });
  console.log(indexingData.length);

  client
    .bulk({ body: indexingData })
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

module.exports = router;
