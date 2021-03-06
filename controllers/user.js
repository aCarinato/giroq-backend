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

export const signup = async (req, res) => {
  const { username, email, password, secret, preferences } = req.body;

  if (!username) {
    return res.json({
      error: 'Nome utente non inserito',
    });
  }

  if (!password || password.length < 6) {
    return res.json({
      error: 'Password di almeno 6 caratteri',
    });
  }

  if (!secret) {
    return res.json({
      error: 'Segreto non inserito',
    });
  }

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
    secret,
    password: hashedPassword,
    preferences,
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
      preferences: newUser.preferences,
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
    preferences: existingUser.preferences,
  });
};

export const profileUpdate = async (req, res) => {
  try {
    const { username, password, preferences } = req.body;

    const data = {};

    // console.log(req.body);
    if (username !== '') {
      data.username = username;
    }

    if (password !== '') {
      if (password.length < 6) {
        return res.json({
          error: 'Password is required and should be min 6 characters long',
        });
      } else {
        let hashedPassword;
        hashedPassword = await bcrypt.hash(password, 12);
        data.password = hashedPassword;
        // data.password = await hashPassword(password);
      }
    }

    data.preferences = preferences;

    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
    // user.password = undefined;
    // console.log(user);

    let token;
    // ////////////////////////////////
    // MAX SIGNS THE TOKEN WITH _id AND EMAIL, KALORAAT ONLY WITH _id
    token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      username: user.username,
      email: user.email,
      preferences: user.preferences,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const profileDelete = async (req, res) => {
  // console.log('Here we are');
  // console.log(req.user._id);
  try {
    let user = await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'cancellatooo' });
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, newPassword, secret } = req.body;

    // validation
    if (!newPassword || newPassword < 6) {
      return res.json({
        error: 'Password > 6 caratteri',
      });
    }
    if (!secret) {
      return res.json({
        error: 'Inserire risposta alla tua domanda segreta',
      });
    }

    const user = await User.findOne({ email, secret });
    if (!user) {
      return res.json({
        error:
          'Impossibile reimpostare la password per le credenziali fornite (email e risposta segreta)',
      });
    }

    // const hashed = await hashPassword(newPassword);

    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 12);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    return res.json({
      success:
        'Congratulazioni, adesso puoi effettuare il login con la nuova password',
    });

    // res.json({ message: 'ricevuto forte e chiaro' });
  } catch (err) {
    console.log(err);
  }
};
