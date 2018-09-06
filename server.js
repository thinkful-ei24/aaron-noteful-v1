'use strict';


const { PORT } = require('./config');
const morgan = require('morgan');
const express = require('express');
const router = require('./router/notes.router');


const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());

app.use(router.router);

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});