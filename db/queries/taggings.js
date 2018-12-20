const
  db = require('./index.js');

const errorx = {
  status: 'Error',
  message: "You're in deep water now..."
}

// - GET `/taggings`: Get all taggings.
const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings')
    .then(data => {
      res.status(200).json({
        status: 'Success',
        message: 'Got all Taggings',
        body: data

      })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    });
};

// - GET `/taggings/:id`: Get single tagging.
const getATagging = (req, res, next) => {
  let taggingId = req.params.id;
  db.one('SELECT * FROM taggings WHERE id =$1', taggingId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got A Tagging',
          body: data
        })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    })

};

// - GET `/taggings/researchers/:id`: Get all taggings performed by a specific researcher.
const getTaggingsByResearcher = (req, res, next) => {
  let researcherId = req.params.id;
  db.any('SELECT * FROM taggings WHERE researcher_id=$1', researcherId)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Got All taggings by a researcher!',
          body: data,
        });
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    });
};

// - GET `/taggings/animals/:id`: Get all taggings performed on a specific animal.
const getTaggingsOnAnimal = (req, res, next) => {
  let animalId = req.params.id;
  db.any('SELECT * FROM taggings WHERE animal_id=$1', animalId)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Got All taggings on a animal',
          body: data
        });
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    });
};

// - POST `/taggings`: Add new tagging.
const addTagging = (req, res, next) => {
  db.none('INSERT INTO taggings(animal_id,researcher_id) VALUES(${animal_id},${researcher_id})', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: "Success",
          message: "You have added a Tagging"
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
}

module.exports = {
  getAllTaggings,
  getATagging,
  getTaggingsByResearcher,
  getTaggingsOnAnimal,
  addTagging

};