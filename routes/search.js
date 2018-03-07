const express = require('express');
const client = require('../elastic-client');

const router = express.Router();

router.get('/events', (req, res) => {
  const queryString = req.query.q || '';
  console.log(queryString);

  client
    .search({
      index: 'events',
      // q: req.query.q
      body: {
        query: {
          simple_query_string: {
            query: queryString,
            fields: ['title^2', 'tagLine^5'],
            default_operator: 'or'
          }
        }
      }
    })
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

module.exports = router;
