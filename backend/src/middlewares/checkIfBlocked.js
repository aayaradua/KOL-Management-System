import { Kol } from "../models/Kol.js";

export const checkIfBlocked = async(req, res, next) => {
const { id } = req.user?.userId;
try {
    const kol = await Kol.findById(id);
    if (!kol) {
        return res.status(404).json({error: 'KOL not found'});
    }
    if (kol.isBlokcked === true) {
        return res.status(403).json({error: 'Your account has been blocked!'});
    }
    next();
} catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};