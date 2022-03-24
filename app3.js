const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
// const formidableMiddleware = require('express-formidable');

// import event from './routes/event'
// import eventRoutes from './routes/eventRoutes.js';
// import eventsRoutes from './routes/eventsRoutes';
// import authRoutes from './routes/authRoutes';

const eventsRoutes = require('./routes/events');
const eventRoutes = require('./routes/event');
const authRoutes = require('./routes/auth');

const app = express();

// To set env variables
dotenv.config();

const port = process.env.PORT || 8000;
const db_url = process.env.DB_URL;

// app.use(bodyParser.json());
// app.use(formidableMiddleware());
app.use(express.json());

// app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/events', eventsRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/auth', authRoutes);

// app.use('/api/places', placesRoutes);
// app.use('/api/users', usersRoutes);

// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404);
//   throw error;
// });

// app.use((error, req, res, next) => {
//   if (req.file) {
//     fs.unlink(req.file.path, (err) => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || 'An unknown error occurred!' });
// });

// CONNECT DB
mongoose
  .connect(db_url)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.log(`Server running on port ${port}`));
