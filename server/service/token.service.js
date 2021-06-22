import jwt from 'jsonwebtoken';
import token from '../models/token.model';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m'
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });
        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await token.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const tokenCreate = await token.create({user: userId, refreshToken});
        return tokenCreate;
    }
}

export default new TokenService();