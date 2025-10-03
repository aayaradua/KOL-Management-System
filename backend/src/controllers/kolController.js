import { Kol } from "../models/Kol.js"

export const addKol = async(req, res) => {
    const { country, name, xAccount, xFollowers, youtubeAccount, youtubeFollowers, tiktokAccount, tiktokFollowers, 
        telegramAccount, telegramFollowers, postPrice, inviter } = req.body;
        try  {
            const kol = await Kol.create({
                country, name, postPrice, inviter,
                socialMedia: [
                    { platform:'x', account: xAccount, followers: xFollowers }, 
                    { platform: 'youtube', account: youtubeAccount, followers: youtubeFollowers }, 
                    { platform: 'tiktok', account: tiktokAccount, followers: tiktokFollowers },
                    { platform: 'telegram', account: telegramAccount, followers: telegramFollowers },
                ]
            });
            return res.status(201).json({
                status: 'Success',
                message: 'KOL has been save successfully',
                data: kol
            });
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message,
            });
        }
};

export const viewKolInfo = async(req, res) => {
    const { id } = req.params
    try {
        const kol = await Kol.findById(id);
        if (!kol) {
            return res.status(400).json({error: 'KOL not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'KOL info has been fetched successfully',
            data: kol
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'Failed',
            message: err.message
        });
    }
};

export const modifyKol = async(req, res) => {
    const { id } = req.params;
    const { country, name, xAccount, xFollowers, youtubeAccount, youtubeFollowers, tiktokAccount, tiktokFollowers, 
        telegramAccount, telegramFollowers, postPrice, inviter } = req.body;
    try { 
        const  updatedData  = { country, name, postPrice, inviter, 
            socialMedia: [
                { platform: 'x', account: xAccount, followers: xFollowers },
                { platform: 'youtube', account: youtubeAccount, followers: youtubeFollowers },
                { platform: 'tiktok', account: tiktokAccount, followers: tiktokFollowers },
                { platform: 'telegram', account: telegramAccount, followers: telegramFollowers },
            ]
        };
        const kol = await Kol.findByIdAndUpdate(id, updatedData, { new: true});
        if(!kol) {
            return res.status(400).json({error: 'KOL not found'});
        }
        
        return res.status(200).json({
            status: 'Success',
            message: 'KOL information has been updated successfully'
        });
    } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
        });

    }
};

export const deleteKol = async(req, res) => {
    const { id } = req.params;
    try {
        await Kol.findByIdAndDelete(id);
        return res.status(200).json({
            status: 'Success',
            message: 'KOL has been deleted successfully'
        });

    }  catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            });
    }
};

export const getAllKols = async(req, res) => {
    try {
        const allKols = await Kol.find();
        return res.status(200).json({
            status: 'Success',
            message: 'All registered KOLs has been fetched successfully',
            data: allKols
        });
    }catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message,
            });
        }
};

export const getAllPosts = async(req, res) => {
    const { id } = req.params;
    try {
        const kol = await Kol.findById(id);
        if (!kol) {
            return res.status(400).json({error: 'KOL not found'});
        }
        const posts = kol.posts;

        return res.status(200).json({
            status: 'Success',
            message: 'KOL posts have been fetched successfully',
            data: posts
        });
    } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            });
        }
     
};