import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import UserService from '../service/user.service';

export const register = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const userData = await UserService.registration(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.json(userData);
    } catch (err) {
        console.log('CREATE USER FAILED', err);
        return res.status(400).send(err.message);
    }
};

export const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        let user = await User.findOne({email}).exec();
        if (!user) return res.status(400).send('User with that email not found');
        user.comparePassword(password, (err, match) => {
            // console.log('COMPARE PASSWORD IN LOGIN ERR', err);
            if (!match || err) return res.status(400).send('Wrond password');
            let token = jwt.sign({_id: user._id}, process.env.JWT_ACCESS_SECRET, {
                expiresIn: '7d',
            });
            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                },
            });
        });
    } catch (err) {
        console.log('LOGIN ERROR', err);
        res.status(400).send('SignIn failed');
    }
};

export const logout = async (req, res) => {

};

export const activate = async (req, res) => {
    try {
        const activationLink = req.params.link;
        await UserService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
        return res.status(400).send(e.message);
    }
};

export const refresh = async (req, res) => {

};

export const getUsers = async (req, res) => {
    try {
        res.json(['123', '456']);
    } catch (e) {

    }
};