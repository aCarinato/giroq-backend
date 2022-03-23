const router = require('express').Router();

const {
  login,
  getOrganisers,
  addNewOrganiser,
} = require('../controllers/auth');

router.post('/', login);

router.get('/organiser', getOrganisers);

router.post('/organiser', addNewOrganiser);

module.exports = router;
