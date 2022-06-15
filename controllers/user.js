import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  // console.log('DAIIII');
  try {
    // console.log(req.params);
    // const user = await User.findOne({ email: req.params.email }).select(
    //   '-password'
    // );
    const user = await User.findOne({ username: req.params.username }).select(
      '-password'
    );
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req, res) => {
  try {
    // IF YOU USE THE expressjwt middleware:
    // const user = await User.findById(req.auth._id);

    // IF YOU USE THE 'SELF-MADE' (userOnlyRoute) MIDDLEWARE:
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

// export const getUser = async (req, res) => {
//   try {
//     const userEmail = req.body;
//     const user = await User.findOne({ email: userEmail });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    // res.status(200).json(existingUser);
  } catch (err) {
    res.status(500).json(err);
  }

  if (existingUser) {
    return res.json({
      error: 'Utente giá registrato con questa email',
    });
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

  try {
    const newUser = await createdUser.save();

    let token;
    // token = jwt.sign(
    //   { userId: newUser._id, email: newUser.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );
    token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      username: newUser.username,
      userId: newUser._id,
      email: newUser.email,
      token: token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
    // res.status(200).json(existingUser);
  } catch (err) {
    res.status(500).json(err);
  }

  if (!existingUser) {
    return res.json({
      error: 'Utente non trovato. Controllare email.',
    });
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    res.status(500).json(err);
  }

  if (!isValidPassword) {
    return res.json({
      error: 'Password errata',
    });
  }

  let token;
  // token = jwt.sign(
  //   { userId: existingUser._id, email: existingUser.email },
  //   process.env.JWT_SECRET,
  //   { expiresIn: '1h' }
  // );

  // ////////////////////////////////
  // MAX SIGNS THE TOKEN WITH _id AND EMAIL, KALORAAT ONLY WITH _id
  token = jwt.sign(
    { _id: existingUser._id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    username: existingUser.username,
    userId: existingUser._id,
    email: existingUser.email,
    token: token,
  });
};
