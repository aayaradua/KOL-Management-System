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

        const

        

    }
}