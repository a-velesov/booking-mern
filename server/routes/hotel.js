import express from 'express';
import { create, hotels, image, sellerHotels } from '../controllers/hotel';
import formidable from 'express-formidable';
import { requireSignin } from '../middlewares';

const router = express.Router();

router.post('/create-hotel', requireSignin, formidable(), create);
router.get('/hotels', hotels);
router.get('/hotel/image/:hotelId', image);
router.get('/seller-hotels', requireSignin, sellerHotels);

module.exports = router;