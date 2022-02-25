const router = require('express').Router();
const Event = require('../models/Event');

//create an event
router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all pins
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
