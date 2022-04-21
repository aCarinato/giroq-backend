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
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  long: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  category: {
    type: [Number],
    required: true,
  },
  date: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  image: {
    url: String,
    public_id: String,
  },
});

// module.exports = mongoose.model('Event', eventSchema);

const Event = mongoose.model('Event', eventSchema);

export default Event;
