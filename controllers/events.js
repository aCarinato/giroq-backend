// const Event = require('../models/Event');
import Event from '../models/Event.js';

export const postEvents = async (req, res) => {
  try {
    const { firstDate, lastDate, tlLng, brLat, brLng, tlLat, types } = req.body;
    // console.log(req.body);

    const formattedFirstDate = new Date(firstDate);
    const formattedLastDate = new Date(lastDate);

    const dayBeforeFirstDate = formattedFirstDate.setDate(
      formattedFirstDate.getDate() - 1
    );

    const dayAfterLastDate = formattedLastDate.setDate(
      formattedLastDate.getDate() + 1
    );

    const events = await Event.find({
      $or: [
        {
          $and: [
            { startDate: { $gt: dayBeforeFirstDate } },
            { startDate: { $lt: dayAfterLastDate } },
          ],
        },
        {
          $and: [
            { endDate: { $gt: dayBeforeFirstDate } },
            { endDate: { $lt: dayAfterLastDate } },
          ],
        },
        {
          $and: [
            { startDate: { $lt: dayBeforeFirstDate } },
            { endDate: { $gt: dayBeforeFirstDate } },
          ],
        },
      ],
      lat: { $gt: brLat, $lt: tlLat },
      long: { $gt: tlLng, $lt: brLng },
      category: { $in: types },
    });
    // console.log(events);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const postEventsMobile = async (req, res) => {
  try {
    const { firstDate, lastDate, types } = req.body;
    // console.log(req.body);

    const formattedFirstDate = new Date(firstDate);
    const formattedLastDate = new Date(lastDate);

    const dayBeforeFirstDate = formattedFirstDate.setDate(
      formattedFirstDate.getDate() - 1
    );

    const dayAfterLastDate = formattedLastDate.setDate(
      formattedLastDate.getDate() + 1
    );

    const events = await Event.find({
      $or: [
        {
          $and: [
            { startDate: { $gt: dayBeforeFirstDate } },
            { startDate: { $lt: dayAfterLastDate } },
          ],
        },
        {
          $and: [
            { endDate: { $gt: dayBeforeFirstDate } },
            { endDate: { $lt: dayAfterLastDate } },
          ],
        },
        {
          $and: [
            { startDate: { $lt: dayBeforeFirstDate } },
            { endDate: { $gt: dayBeforeFirstDate } },
          ],
        },
      ],
      category: { $in: types },
    });
    // console.log(events);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEvents = async (req, res) => {
  try {
    const today = new Date();

    const dayBeforeToday = today.setDate(today.getDate() - 1);
    const dayAfterToday = today.setDate(today.getDate() + 1);

    const events = await Event.find({
      $or: [
        { startDate: { $gte: dayBeforeToday } },
        { endDate: { $gte: dayAfterToday } },
        {
          $and: [
            { startDate: { $lte: dayBeforeToday } },
            { endDate: { $gte: dayBeforeToday } },
          ],
        },
      ],
    }).sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPastEvents = async (req, res) => {
  try {
    console.log('eccomi i past events');
    const today = new Date();

    const dayBeforeToday = today.setDate(today.getDate() - 1);
    const events = await Event.find({
      $or: [
        {
          $and: [{ startDate: { $lt: dayBeforeToday } }, { endDate: null }],
        },
        {
          $and: [
            { endDate: { $lt: dayBeforeToday } },
            { endDate: { $exists: true } },
          ],
        },
      ],
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};
