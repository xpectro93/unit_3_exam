const express = require('express');
const router = express.Router();
const {
  getAllHabitats,
  getAHabitat,
  addHabitat
} = require('../db/queries/habitats.js');

// - GET `/habitats`: Get all habitats.
router.get('/', getAllHabitats);

// - GET `/habitats/:id`: Get single habitat.
router.get('/:id', getAHabitat);

// - POST `/habitats`: Add new habitat.
router.post('/', addHabitat);


module.exports = router;