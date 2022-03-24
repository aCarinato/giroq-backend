// import Event from '../models/Event';
import express from 'express';

const router = express.Router();

import { getEvents, getEventsDateRange } from '../controllers/events.js';

//get all events
router.get('/', getEvents);

router.get('/:firstdate/:lastdate', getEventsDateRange);

export default router;
