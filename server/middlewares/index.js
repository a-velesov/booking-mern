import expressJwt from 'express-jwt';
import Hotel from '../models/hotel.model';
import {validationResult} from 'express-validator';

export const requireSignin = expressJwt({
  secret: process.env.JWT_ACCESS_SECRET,
  algorithms: [ 'HS256' ],
});

export const hotelOwner = async(req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if(!owner) return res.status(403).send('Unuathorized');

  next();
};

export const validationOutput = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error validation',
      errors: errors.array(),
    });
  }
  next();
}