import express from 'express';
import { requireSignin } from '../middlewares';
import { bookingSuccess, userHotelBookings, isAlreadyBooked } from '../controllers/order';

const router = express.Router();

router.post('/booking-success', requireSignin, bookingSuccess);
router.get('/user-hotel-bookings', requireSignin, userHotelBookings);
router.get('/is-already-booked/:hotelId', requireSignin, isAlreadyBooked);

module.exports = router;