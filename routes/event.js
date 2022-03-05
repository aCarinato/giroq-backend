const router = require('express').Router();
const Event = require('../models/Event');

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
