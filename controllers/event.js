// const Event = require('../models/Event');
import Event from '../models/Event.js';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async (req, res) => {
  console.log('req files => ', req.files);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    // console.log('from API, uploaded image url => ', result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(`Errore nell'API: ${err}`);
  }
};

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
