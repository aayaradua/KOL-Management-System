import { verifyJwtToken } from "../utils/jwt.js";

export const verifyToken = async(req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) {
        return res.status(401).json({error: 'No or expired token'});
    }
    const decoded = verifyJwtToken(refreshToken);
    req.user = { userId: decoded.userId, role: decoded.role };
    
    next();
};