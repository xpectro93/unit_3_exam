const express = require('express');
const router = express.Router();
const {
  getAllResearchers,
  getAResearcher,
  addResearcher,
  updateResearcher,
  deleteResearcher
} = require('../db/queries/researchers.js')

// - GET `/researchers`: Get all researchers.
router.get('/', getAllResearchers);

// - GET `/researchers/:id`: Get single researcher.
router.get('/:id', getAResearcher);


// - POST `/researchers`: Add new researcher.
router.post('/', addResearcher);

// - PATCH `/researchers/:id`: Update single researcher.
router.patch('/:id', updateResearcher);

// - DELETE `/researchers/:id`: Delete single researcher.
router.delete('/:id', deleteResearcher);

module.exports = router;