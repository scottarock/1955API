const express = require('express'),
      parser = require('body-parser'),
      port = process.env.PORT || 8000,
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      app = express();

// set up mongoose and connect
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/1955api',
  { useNewUrlParser: true }
);
mongoose.connection.on('connect', () => console.log('Mongo DB connected'));

// set up server
app.use(parser.json());

// schema for the data
const fiftyFiveSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [
      true,
      'Name is required'
    ]
  },
}, { timestamps: true });

// register the schema
const FiftyFive = mongoose.model('FiftyFive', fiftyFiveSchema);

// using all get routes so we can just use the browser address line
app.get('/', function(request, response) {
  FiftyFive.find({})
    .then(data => response.json(data))
    .catch(console.log);
});

app.get('/new/:name', function(request, response) {
  FiftyFive.create({ name: request.params.name })
    .then(newName => response.redirect('/'))
    .catch(console.log);
});

app.get('/remove/:name', function(request, response) {
  FiftyFive.findOneAndDelete({ name: request.params.name })
    .then(data => response.redirect('/'))
    .catch(console.log);
});

app.get('/:name', function(request, response) {
  FiftyFive.find({ name: request.params.name })
    .then(data => response.json(data))
    .catch(console.log);
});

app.listen(port, () => console.log(`1955 api listening on port ${port}`));
