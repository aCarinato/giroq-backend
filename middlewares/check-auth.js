// import jwt from 'jsonwebtoken';

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

import { expressjwt } from 'express-jwt';

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});
