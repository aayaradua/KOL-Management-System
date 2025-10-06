import { verifyJwtToken } from "../utils/jwt.js";

export const verifyToken = async(req, res, next) => {
    console.log('Request pass through userAuth');
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) {
        return res.status(401).json({error: 'No or expired token'});
    }
    const decoded = verifyJwtToken(refreshToken);
    req.user = { userId: decoded.userId, role: decoded.role };
    
    next();
};