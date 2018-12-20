const db = require('./index.js');

const errorx = {
  status: 'Error',
  message: "You're in deep water now..."
}

// - GET `/habitats`: Get all habitats.
const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats')
    .then(data => {
      res.status(200).json({
        status: 'Success',
        message: 'Got all Habitats',
        body: data

      })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    });
};

// - GET `/habitats/:id`: Get single habitat.
const getAHabitat = (req, res, next) => {
  let habitatId = req.params.id;
  db.one('SELECT * FROM habitats WHERE id =$1', habitatId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got A Habitat',
          body: data
        })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    })

};

// - POST `/habitats`: Add new habitat.
const addHabitat = (req, res, next) => {
  db.none('INSERT INTO habitats(category) VALUES(${category})', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: "Success",
          message: "You have added a Habitat!"
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
};

module.exports = {
  getAllHabitats,
  getAHabitat,
  addHabitat

}