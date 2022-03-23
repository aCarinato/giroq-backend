import Event from '../models/Event';
import express from 'express';

const router = express.Router();

//get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:firstdate/:lastdate', async (req, res) => {
  try {
    const { firstdate, lastdate } = req.params;

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

export default router;
