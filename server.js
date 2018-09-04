'use strict';

// Load array of notes
const data = require('./db/notes');


// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();

// ADD STATIC SERVER HERE
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(data);
});


app.get('/api/notes/:id', (req, res) => {
  let newData = data.find(data => data.id === Number(req.params.id));
  return res.send(newData);
});




app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});