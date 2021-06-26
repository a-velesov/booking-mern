import User from '../models/user.model';
import {v4 as uuidv4} from 'uuid';
import MailService from './mail.service';
import TokenService from './token.service';
import UserDto from '../dtos/user.dto';
import bcrypt from 'bcrypt';
import ApiError from '../dtos/error.dto';

class UserService {
    async registration(email, password) {
        let userExist = await User.findOne({email});
        if (userExist) throw ApiError.BadRequest('Email is taken');

        const activationLink = uuidv4();
        const user = new User({email, password, activationLink});
        await user.save();

        await MailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink}).exec();
        if (!user) {
            throw ApiError.BadRequest('Incorrect activation link')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) throw ApiError.BadRequest('User with that email not found');

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) throw ApiError.BadRequest('Wrong password');

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};

    }

    async logout(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
}

export default new UserService();