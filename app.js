const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const researchers = require('./routes/researchers.js');
const species = require('./routes/species.js');
const animals = require('./routes/animals.js');
const habitats = require('./routes/habitats.js');
const taggings = require('./routes/taggings.js');
const sightings = require('./routes/sightings.js');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/researchers', researchers);
app.use('/species', species);
app.use('/animals', animals);
app.use('/habitats', habitats);
app.use('/taggings', taggings);
app.use('/sightings', sightings);



app.get('/', (req, res) => {
  res.send('This b Poseidons Territory!')
});

app.listen(3000, () => {
  console.log('Listening to seashells at 3k!');
});