const express = require('express');
const router = express.Router();
const {
  getAllSpecies,
  getASpecies,
  addSpecies
} = require('../db/queries/species.js');

// - GET `/species`: Get all species.
router.get('/', getAllSpecies);

// - GET `/species/:id`: Get single species.
router.get('/:id', getASpecies);

// - POST `/species`: Add new species.
router.post('/', addSpecies);

module.exports = router;