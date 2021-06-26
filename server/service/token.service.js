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

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch(e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch(e) {
            return null;
        }
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

    async removeToken(refreshToken) {
        const tokenData = await token.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await token.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService();