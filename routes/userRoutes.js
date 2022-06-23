import express from 'express';

const router = express.Router();

import { userOnlyRoute } from '../middlewares/check-auth.js';

import {
  getUsers,
  getUser,
  currentUser,
  signup,
  login,
  profileUpdate,
  profileDelete,
} from '../controllers/user.js';

router.get('/', getUsers);

// router.get('/current-user', requireSignin, currentUser);
router.get('/current-user', userOnlyRoute, currentUser);

router.get('/:username', getUser);

router.post('/signup', signup);

router.post('/login', login);

router.put('/profile-update', userOnlyRoute, profileUpdate);

router.delete('/profile-delete', userOnlyRoute, profileDelete);

export default router;
