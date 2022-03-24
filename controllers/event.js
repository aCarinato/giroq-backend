// const Event = require('../models/Event');
import Event from '../models/Event.js';

// const cloudinary = require('cloudinary').v2;

export const createEvent = async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    // console.log(req.body);
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params._id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};
