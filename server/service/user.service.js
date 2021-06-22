import User from '../models/user.model';
import {v4 as uuidv4} from 'uuid';
import MailService from './mail.service';
import TokenService from './token.service';
import UserDto from '../dtos/user.dto';

class UserService {
    async registration(email, password) {
        let userExist = await User.findOne({email}).exec();
        if (userExist) throw new Error('Email is taken');

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
            throw new Error('Incorrect activation link')
        }
        user.isActivated = true;
        await user.save();
    }
}

export default new UserService();