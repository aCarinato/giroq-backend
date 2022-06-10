// import Event from '../models/Event';
import express from 'express';
// import formidable from "express-formidable";
import formidable from 'express-formidable';

const router = express.Router();

import {
  createEvent,
  getEvent,
  uploadImage,
  deleteEvent,
} from '../controllers/event.js';

// import { requireSignin } from '../middlewares/check-auth';

//create an event
router.post('/', createEvent);

// get event wth id
router.get('/:_id', getEvent);

router.post(
  '/upload-image',
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

router.delete('/delete-event/:_id', deleteEvent);

export default router;
// module.exports = router;
