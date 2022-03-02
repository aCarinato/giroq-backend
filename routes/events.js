const router = require('express').Router();
const Event = require('../models/Event');

//create an event
router.post('/', async (req, res) => {
  // const reqObj = req.body;
  // const test = { ...reqObj, date: new Date('2000-01-01') };
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get events for a certain date
router.get('/date', async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date();

    today.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);

    const events = await Event.find({
      date: { $gte: today, $lt: tomorrow },
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get events "type A"
// router.get('/typea', async (req, res) => {
//   try {
//     const eventsTypeA = await Event.find({ type: 'A' });
//     res.status(200).json(eventsTypeA);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// get event wth id
router.get('/:_id', async (req, res) => {
  try {
    const event = await Event.findById(req.params._id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
