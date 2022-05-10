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

export const getEvents = async (req, res) => {
  try {
    const today = new Date();

    const dayBeforeToday = today.setDate(today.getDate() - 1);

    const events = await Event.find({
      startDate: { $gte: dayBeforeToday },
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

// export const getEventsDateRange = async (req, res) => {
//   try {
//     // const { firstdate, lastdate, blLat, trLat, blLong, trLong } = req.params;
//     const { firstDate, lastDate, trLat, trLong, blLat, blLong } = req.params;
//     // console.log('----------------');
//     // console.log('');
//     // console.log(`Dall API, blLat: ${blLat}`);
//     // console.log(`Dall API, blLong: ${blLong}`);
//     // console.log(`Dall API, trLat: ${trLat}`);
//     // console.log(`Dall API, trLong: ${trLong}`);

//     // console.log(`Dall API, firstdate: ${firstdate}`);
//     // console.log(`Dall API, lastdate: ${lastdate}`);
//     const formattedFirstDate = new Date(firstDate);
//     const formattedLastDate = new Date(lastDate);

//     const dayBeforeFirstDate = formattedFirstDate.setDate(
//       formattedFirstDate.getDate() - 1
//     );

//     const dayAfterLastDate = formattedLastDate.setDate(
//       formattedLastDate.getDate() + 1
//     );

//     // console.log(`Dall API, dayBeforeFirstDate: ${dayBeforeFirstDate}`);
//     // console.log(`Dall API, dayAfterLastDate: ${dayAfterLastDate}`);
//     const events = await Event.find({
//       date: { $gt: dayBeforeFirstDate, $lt: dayAfterLastDate },
//       lat: { $gt: blLat, $lt: trLat },
//       long: { $gt: blLong, $lt: trLong },
//     });
//     res.status(200).json(events);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

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
