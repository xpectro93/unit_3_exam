const express = require('express');
const router = express.Router();
const {
  getAllSightings,
  getSightingBySpecies,
  getSightingByResearcher,
  getSightingByHabitat,
  addSighting,
  deleteSighting
} = require('../db/queries/sightings.js')

// - GET `/sightings`: Get all sightings.
router.get('/', getAllSightings);

// - GET `/sightings/species/:id`: Get all sightings of a specific species.
router.get('/species/:id', getSightingBySpecies);
//
// - GET `/sightings/researchers/:id`: Get all sightings for a specific researcher.
router.get('/researchers/:id', getSightingByResearcher);

// - GET `/sightings/habitats/:id`: Get all sightings for a specific habitat.
router.get('/habitats/:id', getSightingByHabitat);

// - POST `/sightings`: Add new sighting.
router.post('/', addSighting);

// - DELETE `/sightings/:id`: Delete single sighting.
router.delete('/:id', deleteSighting);


module.exports = router;