const db = require('./index.js')

const errorx = {
  status: 'Error',
  message: "You're in deep water now..."
}

// - GET `/sightings`: Get all sightings.
const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings')
    .then(data => {
      res.status(200).json({
        status: 'Success',
        message: 'Got all Sightings',
        body: data

      })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    });
};

// - GET `/sightings/species/:id`: Get all sightings of a specific species.
const getSightingBySpecies = (req, res, next) => {
  let speciesId = req.params.id;
  db.any('SELECT * FROM sightings WHERE species_id=$1', speciesId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got all Sightings by a Species',
          body: data
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })

};

// - GET `/sightings/researchers/:id`: Get all sightings for a specific researcher.
const getSightingByResearcher = (req, res, next) => {
  let researcherId = req.params.id;
  db.any('SELECT * FROM sightings WHERE researcher_id=$1', researcherId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got all Sightings by a Researcher',
          body: data
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
};

// - GET `/sightings/habitats/:id`: Get all sightings for a specific habitat.
const getSightingByHabitat = (req, res, next) => {
  let habitatId = req.params.id;
  db.any('SELECT * FROM sightings WHERE habitat_id=$1', habitatId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got all Sightings by a Habitat',
          body: data
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
};

// - POST `/sightings`: Add new sighting.
const addSighting = (req, res, next) => {
  db.none('INSERT INTO sightings(researcher_id,species_id,habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: "Success",
          message: "You have created a Sighting!"
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
};

// - DELETE `/sightings/:id`: Delete single sighting.
const deleteSighting = (req, res, next) => {
  let sightingId = parseInt(req.params.id);
  db.result('DELETE FROM sightings WHERE id=$1', sightingId)
    .then(result => {
      res.status(200)
        .json({
          status: "Success",
          message: "You are blind to this entry",
        });
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    });
}

module.exports = {
  getAllSightings,
  getSightingBySpecies,
  getSightingByResearcher,
  getSightingByHabitat,
  addSighting,
  deleteSighting

}