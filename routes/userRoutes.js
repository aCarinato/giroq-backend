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
  forgotPassword,
} from '../controllers/user.js';

router.get('/', getUsers);

// router.get('/current-user', requireSignin, currentUser);
router.get('/current-user', userOnlyRoute, currentUser);

router.get('/:username', getUser);

router.post('/signup', signup);

router.post('/login', login);

router.put('/profile-update', userOnlyRoute, profileUpdate);

router.delete('/profile-delete', userOnlyRoute, profileDelete);

router.post('/reset-password', forgotPassword);

export default router;
