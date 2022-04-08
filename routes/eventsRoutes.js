// import Event from '../models/Event';
import express from 'express';

const router = express.Router();

import {
  getEvents,
  getEventsDateRange,
  postEvents,
} from '../controllers/events.js';

//get all events
router.get('/', getEvents);

router.post('/', postEvents);

router.get(
  '/:firstdate/:lastdate/:blLat/:trLat/:blLong/:trLong',
  getEventsDateRange
);

export default router;
