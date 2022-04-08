// const mongoose = require('mongoose');

import mongoose from 'mongoose';

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
    type: Number,
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

// module.exports = mongoose.model('Event', eventSchema);

const Event = mongoose.model('Event', eventSchema);

export default Event;
