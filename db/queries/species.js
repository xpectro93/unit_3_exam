const
  db = require('./index.js');

const errorx = {
  status: 'Error',
  message: "You're in deep water now..."
}

// - GET `/species`: Get all species.
const getAllSpecies = (req, res, next) => {
  db.any('SELECT * FROM species')
    .then(data => {
      res.status(200).json({
        status: 'Success',
        message: 'Got all Species',
        body: data

      })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    });
}

// - GET `/species/:id`: Get single species.
const getASpecies = (req, res, next) => {
  let speciesId = req.params.id;
  db.one('SELECT * FROM species WHERE id =$1', speciesId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got A Species',
          body: data
        })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    })

};

// - POST `/species`: Add new species.
const addSpecies = (req, res, next) => {
  db.none('INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: "Success",
          message: "You have created a Species!"
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
}


module.exports = {
  getAllSpecies,
  getASpecies,
  addSpecies
}