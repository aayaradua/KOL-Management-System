import { Kol } from "../models/Kol.js"

export const addKol = async(req, res) => {
    const { country, name, email, xAccount, xFollowers, youtubeAccount, youtubeFollowers, tiktokAccount, tiktokFollowers, 
        telegramAccount, telegramFollowers, postPrice, inviter } = req.body;
        try  {
            const kol = await Kol.create({
                country, name, email, postPrice, inviter,
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
    const  id = req.params.id
    try {
        const kol = await Kol.findById(id);
        if (!kol) {
            return res.status(404).json({error: 'KOL not found'});
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
    const  id = req.params.id;
    const { xAccount, xFollowers, youtubeAccount, youtubeFollowers, tiktokAccount, tiktokFollowers, 
        telegramAccount, telegramFollowers, postPrice, inviter } = req.body;
    try { 
        const  updatedData  = { postPrice, inviter, 
            socialMedia: [
                { platform: 'x', account: xAccount, followers: xFollowers },
                { platform: 'youtube', account: youtubeAccount, followers: youtubeFollowers },
                { platform: 'tiktok', account: tiktokAccount, followers: tiktokFollowers },
                { platform: 'telegram', account: telegramAccount, followers: telegramFollowers },
            ]
        };
        const kol = await Kol.findByIdAndUpdate(id, updatedData);
        if(!kol) {
            return res.status(404).json({error: 'KOL not found'});
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
    const id = req.params.id;
    try {
        const kol = await Kol.findByIdAndDelete(id);
        if (!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }
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

export const allKolPosts = async(req, res) => {
    const id  = req.params.id;
    try {
        const kol = await Kol.findById(id);
        if (!kol) {
            return res.status(404).json({error: 'KOL not found'});
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

export const addPost = async(req, res) => {
    const id = req.params.id;
    const { postUrl, views, likes, shares, comments, remarks } = req.body;

    try {
        const kol = await Kol.findById(id);
        if(!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }
        const newPost = { postUrl,views, likes, shares, comments, remarks };

        kol.posts.push(newPost);
        await kol.save();

        return res.status(200).json({
            status: 'Success',
            message: 'Post has been added successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};

export const blockKol = async(req, res) => {
    const  id  = req.params.id;
    try {
        const kol = await Kol.findByIdAndUpdate(id, {isBlocked: true}, { new: true });
        if(!kol) {
            return res.status(400).json({error: 'KOL not found'});
        }

        return res.status(200).json({
            status: 'Success',
            message: 'KOL is blocked successfully'
        });
    }  catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};

export const unblockKol = async(req, res) => {
        const { id } = req.params;
    try {
        const kol = await Kol.findByIdAndUpdate(id, {isBlocked: false}, {new: true});
        if(!kol) {
            return res.status(400).json({error: 'KOL not found'});
        }

        return res.status(200).json({
            status: 'Success',
            message: 'KOL is unblock successfully',
        });
    }  catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};