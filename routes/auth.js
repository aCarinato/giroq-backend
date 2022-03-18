const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { password } = req.body;
    console.log(`From the API, password:  ${password}`);
    if (password !== 'cheben') {
      return res.json('Wrong password');
    }

    //send response
    res.status(200).json({ username: 'admin' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/organiser', async (req, res) => {
//   try {
//     const {  } = req.body
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
