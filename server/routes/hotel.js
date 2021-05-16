import express from 'express';
import { createHotel, getHotels, image, getHotel, deleteHotel, sellerHotels } from '../controllers/hotel';
import formidable from 'express-formidable';
import { hotelOwner, requireSignin } from '../middlewares';

const router = express.Router();

router.post('/create-hotel', requireSignin, formidable(), createHotel);
router.get('/hotels', getHotels);
router.get('/hotel/image/:hotelId', image);
router.get('/seller-hotels', requireSignin, sellerHotels);
router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, deleteHotel);
router.get('/hotel/:hotelId', getHotel);

module.exports = router;