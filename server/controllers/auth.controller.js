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

        const userData = await UserService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.json(userData);

    } catch (err) {
        return res.status(400).send(err.message);
    }
};

export const activate = async (req, res) => {
    try {
        const activationLink = req.params.link;
        await UserService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

export const logout = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        await UserService.logout(refreshToken);
        res.clearCookie('refreshToken');

        return res.status(200).send('logout success');
    } catch(err) {
        return res.status(400).send(err.message);
    }
};

export const refresh = async (req, res) => {
    const {refreshToken} = req.cookies;
    const userData = await UserService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

    return res.json(userData);

};

export const getUsers = async (req, res) => {
    try {
        res.json(['123', '456']);
    } catch (e) {

    }
};