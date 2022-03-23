const Organiser = require('../models/Organiser');

exports.login = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(`From the API, password:  ${password}`);
    if (password !== 'cheben') {
      return res.json('Wrong password');
    }

    //send response
    res.status(200).json({ username: 'admin' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOrganisers = async (req, res) => {
  try {
    const organisers = await Organiser.find();
    res.status(200).json(organisers);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addNewOrganiser = async (req, res) => {
  const newOrganiser = new Organiser(req.body);
  try {
    const savedOrganiser = await newOrganiser.save();
    res.status(200).json(savedOrganiser);
  } catch (err) {
    res.status(500).json(err);
  }
};
