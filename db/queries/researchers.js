const
  db = require('./index.js');

const errorx = {
  status: 'Error',
  message: "You're in deep water now..."
}

// - GET `/researchers`: Get all researchers.
const getAllResearchers = (req, res, next) => {
  db.any('SELECT * FROM researchers')
    .then(data => {
      res.status(200).json({
        status: 'Success',
        message: 'Got all Reasearchers',
        body: data

      })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    });
};

// - GET `/researchers/:id`: Get single researcher.
const getAResearcher = (req, res, next) => {
  let researcherId = req.params.id;
  db.one('SELECT * FROM researchers WHERE id =$1', researcherId)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Got A Researcher',
          body: data
        })
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err)
    })

};
// - POST `/researchers`: Add new researcher.
const addResearcher = (req, res, next) => {
  db.none('INSERT INTO researchers(name, job_title) VALUES(${name}, ${job_title})', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: "Success",
          message: "You have created a Researcher!"
        })
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    })
}

// - PATCH `/researchers/:id`: Update single researcher.
const updateResearcher = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  if (req.body.name && req.body.name.toLowerCase() === "null") {
    req.body.name = null;
  }
  if (req.body.job_title && req.body.job_title.toLowerCase() === "null") {
    req.body.job_title = null;
  }
  db
    .none(
      "UPDATE researchers SET " + queryString + " WHERE id=" + req.params.id,
      req.body
    )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "You Updated a Researcher!"
      });
    })
    .catch(err => {
      res.status(404).json(errorx)
      next(err);
    });
};

// - DELETE `/researchers/:id`: Delete single researcher.
const deleteResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE id=$1', researcherId)
    .then(result => {
      res.status(200)
        .json({
          status: "success",
          message: "You sent a Researcher to sleep with da fishes... =_=",
        });
    })
    .catch(err => {
      res.status(404)
        .json(errorx)
      next(err)
    });
}

module.exports = {
  getAllResearchers,
  getAResearcher,
  addResearcher,
  updateResearcher,
  deleteResearcher
};