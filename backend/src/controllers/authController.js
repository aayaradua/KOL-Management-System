import { Kol } from "../models/Kol.js";
import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { signAccessToken, signRefreshToken, verifyJwtToken } from "../utils/jwt.js";
import { v4 as uuid } from 'uuid';
import { Token } from "../models/Token.js";
import { generateToken, hashToken } from "../utils/crypto.js";

export const loginUser = async( req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({error:'Email or password is invalid'});
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Email or password is invalid'});
        }
        if (user.status === 'disable') {
            return res.status(403).json({error: 'You are not allowed to login'})
        }
        const sessionId = uuid();
        const jti = uuid();

        const accessToken = signAccessToken({userId: user._id, role: user.role});
        const refreshToken = signRefreshToken({userId: user._id, role: user.role, jti, sessionId});

        const hashedToken = hashToken(refreshToken);

        await Token.create({
            userId: user._id, 
            role: user.role, 
            jti, 
            sessionId,
            token: hashedToken,
            isUsed: false
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 
        }); 

        res.cookie('refreshToken', refreshToken, {
           httpOnly: true,
           secure: process.env.NODE_ENV === 'production',  
           sameSite: 'Strict',
           maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            status: 'Success',
            message: 'User login successfully'
        });
    
    } catch(err) {
        return res.status(500).json({
            status: 'Failed',
            message: 'Login failed! Try again.'
        });
    }
};