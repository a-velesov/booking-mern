import express from 'express';
import { register, login } from '../controllers/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// include favicon
router.get('/favicon.ico', (req, res) => res.status(204));

module.exports = router;