// const Organiser = require('../models/Organiser');
import Organiser from '../models/Organiser.js';

export const login = async (req, res) => {
  try {
    const { password } = req.body;
    // console.log(`From the API, password:  ${password}`);
    if (password !== process.env.ADMIN_PSW) {
      return res.json('Wrong password');
    }

    //send response
    res.status(200).json({ username: 'admin' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOrganisers = async (req, res) => {
  try {
    const organisers = await Organiser.find();
    res.status(200).json(organisers);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addNewOrganiser = async (req, res) => {
  const newOrganiser = new Organiser(req.body);
  try {
    const savedOrganiser = await newOrganiser.save();
    res.status(200).json(savedOrganiser);
  } catch (err) {
    res.status(500).json(err);
  }
};
