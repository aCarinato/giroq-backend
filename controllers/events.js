// const Event = require('../models/Event');
import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
  try {
    const { ne, sw } = req.params;
    // bl -> bottom-left
    // tr -> top-right
    const bl_lat = sw.lat;
    const tr_lat = ne.lat;
    const bl_long = sw.lng;
    const tr_long = ne.lng;
    // const events = await Event.find();
    const events = await Event.find({
      lat: { $gt: bl_lat, $lt: tr_lat },
      long: { $gt: bl_long, $lt: tr_long },
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEventsDateRange = async (req, res) => {
  try {
    const { firstdate, lastdate, blLat, trLat, blLong, trLong } = req.params;
    // console.log('----------------');
    // console.log('');
    // console.log(`Dall API, blLat: ${blLat}`);
    // console.log(`Dall API, blLong: ${blLong}`);
    // console.log(`Dall API, trLat: ${trLat}`);
    // console.log(`Dall API, trLong: ${trLong}`);

    // console.log(`Dall API, firstdate: ${firstdate}`);
    // console.log(`Dall API, lastdate: ${lastdate}`);
    const formattedFirstDate = new Date(firstdate);
    const formattedLastDate = new Date(lastdate);

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
