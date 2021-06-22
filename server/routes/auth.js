import express from 'express';
import {register, login, logout, activate, refresh, getUsers} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/users', getUsers);

// include favicon
router.get('/favicon.ico', (req, res) => res.status(204));

module.exports = router;