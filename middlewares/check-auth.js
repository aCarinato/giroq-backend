import jwt from 'jsonwebtoken';
// import { expressjwt } from 'express-jwt';
import User from '../models/User.js';

export const userOnlyRoute = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // console.log('token found');
    try {
      token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken._id).select('-password');
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).send('Authentication failed!');
    }
  }

  if (!token) {
    console.log('token NOT found');
    return res.status(401).send('Authentication failed. Token NOT found');
  }
};

// export const requireSignin = async (req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     return next();
//   }
//   try {
//     const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
//     if (!token) {
//       //   throw new Error('Authentication failed!');
//       return res.status(400).send('Unauthorized');
//     }
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.userData = { userId: decodedToken.userId };
//     next();
//   } catch (err) {
//     // const error = new HttpError('Authentication failed!', 403);
//     // return res.status(403).send('Authentication failed!');
//     return next(err);
//   }
// };

// export const requireSignin = expressjwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['HS256'],
// });
