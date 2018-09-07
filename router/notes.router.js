'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);


const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm)
    .then(list => {
      if (list) {
        res.json(list);
      }
      else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});



router.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});


router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  notes.delete(id, (err) => {
    return next(err);
  });
});


router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      }
      else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});



router.post('/', (req, res, next) => {

  const { id, title, content } = req.body;
  const newItem = { id, title, content };

  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});


router.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = { router };