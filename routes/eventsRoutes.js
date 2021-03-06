import express from 'express';

const router = express.Router();

import {
  getEvents,
  // getEventsDateRange,
  postEvents,
  getPastEvents,
  postEventsMobile,
} from '../controllers/events.js';

//get all events
router.get('/', getEvents);

router.get('/past-events', getPastEvents);

router.post('/', postEvents);

router.post('/mobile', postEventsMobile);

// router.get(
//   // '/:firstdate/:lastdate/:blLat/:trLat/:blLong/:trLong',
//   '/:firstDate/:lastDate/:trLat/:trLong/:blLat/:blLong',
//   getEventsDateRange
// );

export default router;
