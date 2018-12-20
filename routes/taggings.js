const express = require('express');
const router = express.Router();
const {
  getAllTaggings,
  getATagging,
  getTaggingsByResearcher,
  getTaggingsOnAnimal,
  addTagging
} = require('../db/queries/taggings.js')

// - GET `/taggings`: Get all taggings.
router.get('/', getAllTaggings);

// - GET `/taggings/:id`: Get single tagging.
router.get('/:id', getATagging);

// - GET `/taggings/researchers/:id`: Get all taggings performed by a specific researcher.
router.get('/researchers/:id', getTaggingsByResearcher);

// - GET `/taggings/animals/:id`: Get all taggings performed on a specific animal.
router.get('/animals/:id', getTaggingsOnAnimal);
//
// - POST `/taggings`: Add new tagging.
router.post('/', addTagging);


module.exports = router;