import express from 'express';
import {register, login, logout, activate, refresh} from '../controllers/auth.controller';
import {body} from 'express-validator';
import {validationOutput} from '../middlewares';

const router = express.Router();

router.post('/register',
    body('email').notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Incorrect email'),
    body('password').notEmpty().withMessage('Password is required').bail().isLength({min: 6}).withMessage('Should be min 6 characters long'),
    validationOutput,
    register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);

// include favicon
router.get('/favicon.ico', (req, res) => res.status(204));

module.exports = router;