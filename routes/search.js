const express = require('express');
const client = require('../elastic-client');

const router = express.Router();

router.get('/events', (req, res) => {
  client
    .search({ index: 'events' })
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

module.exports = router;
