const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organiser: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  image: {
    url: String,
    public_id: String,
  },
});

module.exports = mongoose.model('Event', eventSchema);
