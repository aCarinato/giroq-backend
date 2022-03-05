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

//get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get events for a certain date
// router.get('/:date', async (req, res) => {
//   try {
//     const { date } = req.params;

//     const formattedDate = new Date(date);
//     const dayBefore = formattedDate.setDate(formattedDate.getDate() - 1);
//     const dayAfter = formattedDate.setDate(formattedDate.getDate() + 1);

//     const events = await Event.find({
//       date: { $gt: dayBefore, $lte: dayAfter },
//     });
//     res.status(200).json(events);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/:firstdate/:lastdate', async (req, res) => {
  try {
    const { firstdate, lastdate } = req.params;
    // console.log(`Dall API, firstdate: ${firstdate}`);
    // console.log(`Dall API, lastdate: ${lastdate}`);
    const formattedFirstDate = new Date(firstdate);
    const formattedLastDate = new Date(lastdate);

    const dayBeforeFirstDate = formattedFirstDate.setDate(
      formattedFirstDate.getDate() - 1
    );

    const dayAfterLastDate = formattedLastDate.setDate(
      formattedLastDate.getDate() + 1
    );

    // console.log(`Dall API, dayBeforeFirstDate: ${dayBeforeFirstDate}`);
    // console.log(`Dall API, dayAfterLastDate: ${dayAfterLastDate}`);
    const events = await Event.find({
      date: { $gt: dayBeforeFirstDate, $lt: dayAfterLastDate },
    });
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
// router.get('/event/:_id', async (req, res) => {
//   try {
//     const event = await Event.findById(req.params._id);
//     res.status(200).json(event);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
