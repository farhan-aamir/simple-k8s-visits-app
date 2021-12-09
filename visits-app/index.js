
// Express app setup
const express = require('express');
const redis = require('redis');
const process = require('process');
const keys = require("./keys");

const app = express();

// Redis Client Setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
redisClient.set('visits', 0);

// Express route handlers
app.get('/', (req, res) => {
  console.log('in get...');
  redisClient.get('visits', (err, visits) => {
    res.send('Number of visits ' + visits);
    redisClient.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
