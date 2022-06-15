import express from 'express';

const router = express.Router();

import { requireSignin } from '../middlewares/check-auth.js';

import {
  getUsers,
  getUser,
  currentUser,
  signup,
  login,
} from '../controllers/user.js';

router.get('/', getUsers);

router.get('/current-user', requireSignin, currentUser);
// router.get('/current-user', currentUser);

router.get('/:username', getUser);

router.post('/signup', signup);

router.post('/login', login);

export default router;
