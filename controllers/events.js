// const Event = require('../models/Event');
import Event from '../models/Event.js';

export const postEvents = async (req, res) => {
  try {
    const { firstDate, lastDate, trLat, trLong, blLat, blLong, types } =
      req.body;
    // console.log(firstDate);

    const formattedFirstDate = new Date(firstDate);
    const formattedLastDate = new Date(lastDate);

    const dayBeforeFirstDate = formattedFirstDate.setDate(
      formattedFirstDate.getDate() - 1
    );

    const dayAfterLastDate = formattedLastDate.setDate(
      formattedLastDate.getDate() + 1
    );

    const events = await Event.find({
      date: { $gt: dayBeforeFirstDate, $lt: dayAfterLastDate },
      lat: { $gt: blLat, $lt: trLat },
      long: { $gt: blLong, $lt: trLong },
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
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEventsDateRange = async (req, res) => {
  try {
    // const { firstdate, lastdate, blLat, trLat, blLong, trLong } = req.params;
    const { firstDate, lastDate, trLat, trLong, blLat, blLong } = req.params;
    // console.log('----------------');
    // console.log('');
    // console.log(`Dall API, blLat: ${blLat}`);
    // console.log(`Dall API, blLong: ${blLong}`);
    // console.log(`Dall API, trLat: ${trLat}`);
    // console.log(`Dall API, trLong: ${trLong}`);

    // console.log(`Dall API, firstdate: ${firstdate}`);
    // console.log(`Dall API, lastdate: ${lastdate}`);
    const formattedFirstDate = new Date(firstDate);
    const formattedLastDate = new Date(lastDate);

    const dayBeforeFirstDate = formattedFirstDate.setDate(
      formattedFirstDate.getDate() - 1
    );

    const dayAfterLastDate = formattedLastDate.setDate(
      formattedLastDate.getDate() + 1
    );

    // console.log(`Dall API, dayBeforeFirstDate: ${dayBeforeFirstDate}`);
    // console.log(`Dall API, dayAfterLastDate: ${dayAfterLastDate}`);
    const events = await Event.find({
      date: { $gt: dayBeforeFirstDate, $lt: dayAfterLastDate },
      lat: { $gt: blLat, $lt: trLat },
      long: { $gt: blLong, $lt: trLong },
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};
