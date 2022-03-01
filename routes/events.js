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
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get events "type A"
router.get('/typea', async (req, res) => {
  try {
    const eventsTypeA = await Event.find({ type: 'A' });
    res.status(200).json(eventsTypeA);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get events "type B"
router.get('/typeb', async (req, res) => {
  try {
    const eventsTypeB = await Event.find({ type: 'B' });
    res.status(200).json(eventsTypeB);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
