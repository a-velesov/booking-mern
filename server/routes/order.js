import express from 'express';
import { requireSignin } from '../middlewares';
import { bookingSuccess, userHotelBookings } from '../controllers/order';

const router = express.Router();

router.post('/booking-success', requireSignin, bookingSuccess);
router.get('/user-hotel-bookings', requireSignin, userHotelBookings);

module.exports = router;