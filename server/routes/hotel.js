import express from 'express';
import { create, hotels } from '../controllers/hotel';
import formidable from 'express-formidable';
import { requireSignin } from '../middlewares';

const router = express.Router();

router.post('/create-hotel', requireSignin, formidable(), create);
router.get('/hotels', hotels);

module.exports = router;