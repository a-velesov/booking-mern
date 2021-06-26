import UserService from '../service/user.service';

export const register = async (req, res, next) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const userData = await UserService.registration(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.json(userData);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const userData = await UserService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.json(userData);

    } catch (err) {
        next(err);
    }
};

export const activate = async (req, res, next) => {
    try {
        const activationLink = req.params.link;
        await UserService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        await UserService.logout(refreshToken);
        res.clearCookie('refreshToken');

        return res.status(200).send('logout success');
    } catch(err) {
        next(err);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const userData = await UserService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.json(userData);
    } catch(err) {
        next(err);
    }

};