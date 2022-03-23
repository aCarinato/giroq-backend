const router = require('express').Router();
const Event = require('../models/Event');

const { getEvents, getEventsDateRange } = require('../controllers/events');

//get all events
router.get('/', getEvents);

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
router.get('/:firstdate/:lastdate', getEventsDateRange);

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
