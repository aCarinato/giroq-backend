// import Event from '../models/Event';
import express from 'express';
// import formidable from "express-formidable";

const router = express.Router();

import { createEvent, getEvent } from '../controllers/event.js';

// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
//   secure: true,
// });

//create an event
router.post('/', createEvent);

// get event wth id
router.get('/:_id', getEvent);

// upload an image
// router.post('/img-upload', async (req, res) => {
//   try {
//     // console.log(cloudinary.config().cloud_name);
//     console.log('req.files: ', req.files);
//     const result = await cloudinary.v2.uploader.upload(
//       req.files.image.path
//       //   {
//       //   resource_type: 'image',
//       // }
//     );
//     console.log('uploaded img url: ', result);
//     res.json({
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

export default router;
// module.exports = router;
