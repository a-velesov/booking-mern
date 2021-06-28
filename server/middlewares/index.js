import Hotel from '../models/hotel.model';
import TokenService from '../service/token.service';
import {validationResult} from 'express-validator';
import ApiError from '../dtos/error.dto';

export const requireSignin = async(req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if(!accessToken) return next(ApiError.UnauthorizedError());

    const userData = TokenService.validateAccessToken(accessToken);
    if(!userData) return next(ApiError.UnauthorizedError());

    req.user = userData;
    next();

  } catch(err) {
    return next(ApiError.UnauthorizedError());
  }
};

export const hotelOwner = async(req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if(!owner) return res.status(403).send('Unuathorized');

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }
  return res.status(500).json({message: 'Internal Server Error'})
}

export const validationOutput = async (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.mapped(),
    });
  }
  next();
}