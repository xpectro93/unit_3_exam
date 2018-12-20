const db = require('./index.js');

const errorx = {
  status: 'Error',
  message: "You're in deep water now..."
}

// - GET `/animals`: Get all animals.
const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals')
    .then(data => {
      res.status(200).json({
        status: 'Success',
        message: 'Got all Animals',
        body: data

      })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    });
};

// - GET `/animals/:id`: Get single animal.
const getAAnimal = (req, res, next) => {
  let animalId = req.params.id;
  db.one('SELECT * FROM animals WHERE id =$1', animalId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got An Animal',
          body: data
        })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    })

};

// - POST `/animals`: Add new animal.
const addAnimal = (req, res, next) => {
  req.body.species_id = parseInt(req.body.species_id);
  db.none('INSERT INTO animals(species_id, nickname) VALUES(${species_id}, ${nickname})', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: "Success",
          message: "You have created an Animal!"
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
};

// - PATCH `/animals/:id`: Update single animal.
const updateAnimal = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  if (req.body.species_id && req.body.species_id.toLowerCase() === "null") {
    req.body.species_id = null;
  }
  if (req.body.nickname && req.body.nickname.toLowerCase() === "null") {
    req.body.nickname = null;
  }
  db
    .none(
      "UPDATE animals SET " + queryString + " WHERE id=" + req.params.id,
      req.body
    )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "You Updated an Animal!"
      });
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err);
    });
};


// - DELETE `/animals/:id`: Delete single animal.
const deleteAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE id=$1', animalId)
    .then(result => {
      res.status(200)
        .json({
          status: "success",
          message: "Fish out of water!",
        });
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    });
};


module.exports = {
  getAllAnimals,
  getAAnimal,
  addAnimal,
  updateAnimal,
  deleteAnimal

}