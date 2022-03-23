const router = require('express').Router();
const Event = require('../models/Event');

// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
//   secure: true,
// });

//create an event
router.post('/', async (req, res) => {
  // console.log(req.body);
  // const {reqEvent, reqImg} = req.body
  const newEvent = new Event(req.body);
  try {
    // console.log(req.body);
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// upload an image
router.post('/img-upload', async (req, res) => {
  try {
    // console.log(cloudinary.config().cloud_name);
    console.log('req.files: ', req.files);
    const result = await cloudinary.v2.uploader.upload(
      req.files.image.path
      //   {
      //   resource_type: 'image',
      // }
    );
    console.log('uploaded img url: ', result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
