import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //   console.log('FROM login');
  //   console.log(req.body);

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
    // console.log(existingUser);
    res.status(200).json(existingUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  //   console.log(req.body);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    res.status(200).json(existingUser);
  } catch (err) {
    res.status(500).json(err);
  }

  if (existingUser) {
    console.log('User already exists');
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).json(err);
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
    preferences: [],
  });

  console.log(createdUser);

  try {
    const newUser = await createdUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }

  //   res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};
