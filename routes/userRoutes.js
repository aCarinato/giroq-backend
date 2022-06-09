import express from 'express';

const router = express.Router();

import { getUsers, signup, login } from '../controllers/user.js';

router.get('/', getUsers);

router.post('/signup', signup);

router.post('/login', login);

export default router;
