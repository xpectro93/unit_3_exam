const express = require('express');
const router = express.Router();
const {
  getAllAnimals,
  getAAnimal,
  addAnimal,
  updateAnimal,
  deleteAnimal
} = require('../db/queries/animals.js');


// - GET `/animals`: Get all animals.
router.get('/', getAllAnimals);

// - GET `/animals/:id`: Get single animal.
router.get('/:id', getAAnimal);

// - POST `/animals`: Add new animal.
router.post('/', addAnimal);

// - PATCH `/animals/:id`: Update single animal.
router.patch('/:id', updateAnimal);

// - DELETE `/animals/:id`: Delete single animal.
router.delete('/:id', deleteAnimal);


module.exports = router;