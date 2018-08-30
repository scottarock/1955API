const express = require('express'),
      parser = require('body-parser'),
      port = process.env.PORT || 8000,
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/1955api',
  { useNewUrlParser: true }
);
mongoose.connection.on('connect', () => console.log('Mongo DB connected'));

app.use(parser.json());

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

app.get('/', function(request, response) {

});


app.listen(port, () => console.log(`1955 api listening on port ${port}`));
