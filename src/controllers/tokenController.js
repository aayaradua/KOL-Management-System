import { signAccessToken, signRefreshToken, verifyJwtToken } from "../utils/jwt.js";
import { Token } from "../models/Token.js";
import { v4 as uuid } from 'uuid';
import { generateToken, hashToken } from "../utils/crypto.js";


export const refreshTokenHandler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ error: "No refresh token found" });
    }
    try {
        const decoded = verifyJwtToken(refreshToken);
        const tokenRecord =  await Token.findOne({ jti: decoded.jti });
        if (!tokenRecord) {
            return res.status(401).json({ error: "Refresh token not found" });
        }

        if (tokenRecord.isUsed) {
            await Token.deleteMany({ sessionId: decoded.sessionId })
            return res.status(403).json({ error: "Token already used" });
        }
        tokenRecord.isUsed = true,
        await tokenRecord.save();

        const newJti = uuid();

        const accessToken = signAccessToken({ userId: decoded.userId, role: decoded.role });
        const newRefreshToken = signRefreshToken({ userId: decoded.userId, role: decoded.role, jti: newJti, sessionId: decoded.sessionId });

        const hashedToken = hashToken(newRefreshToken);

        await Token.create({
            userid: decoded.userId,
            role: decoded.role,
            jti: newJti,
            sessionId: decoded.sessionId,
            token: hashedToken,
            isUsed: false
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 
        }); 

        res.cookie('refreshToken', newRefreshToken, {
           httpOnly: true,
           secure: process.env.NODE_ENV === 'production',  
           sameSite: 'Strict',
           maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            status: success,
            message: 'Token is refreshed successfully'
        });

    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: 'Refreshing token failed.'
        });
    }
};