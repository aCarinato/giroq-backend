import express from 'express';
// import Organiser from '../models/Organiser';

const router = express.Router();

import { login, getOrganisers, addNewOrganiser } from '../controllers/auth.js';

router.post('/', login);

router.get('/organiser', getOrganisers);

router.post('/organiser', addNewOrganiser);

export default router;
