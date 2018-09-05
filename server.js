'use strict';

// Load array of notes
const data = require('./db/notes');
const { PORT } = require('./config');
const logger = require('./middleware/logger');


// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const app = express();

// ADD STATIC SERVER HERE
app.use(express.static('public'));

app.use(logger.logger);

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    let filteredList = data.filter(function(item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.get('/api/notes/:id', (req, res) => {
  let newData = data.find(data => data.id === Number(req.params.id));
  return res.send(newData);
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});