import mongoose from "mongoose";
import { Kol } from "../models/Kol.js"
import { hashPassword } from "../utils/bcrypt.js";

export const addKol = async(req, res) => {
    const { country, name, email, password,  xAccount, xFollowers, youtubeAccount, youtubeFollowers, tiktokAccount, tiktokFollowers, 
        telegramAccount, telegramFollowers, postPrice } = req.body;
        try  {
            const existingKol = await Kol.findOne({ email });
            if (existingKol) {
                return res.status(400).json({error: "KOL already exist"});
            }
            const hashedPassword = await hashPassword(password);
            const kol = await Kol.create({
                country, 
                name, 
                email, 
                password: hashedPassword, 
                inviter: req.user?.userId, 
                postPrice,
                socialMedia: [
                    { platform:'x', account: xAccount, followers: xFollowers }, 
                    { platform: 'youtube', account: youtubeAccount, followers: youtubeFollowers }, 
                    { platform: 'tiktok', account: tiktokAccount, followers: tiktokFollowers },
                    { platform: 'telegram', account: telegramAccount, followers: telegramFollowers },
                ]
            });
            return res.status(201).json({
                status: 'Success',
                message: 'KOL has been added successfully',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message,
            });
        }
};


export const kolProfile = async(req, res) => {
    const  id = req.user.userId;
    try {
        const kol= await Kol.findById(id);
        if (!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'KOL profile data has been fetched successfully',
            id: kol.id,
            name: kol.name,
            email: kol.email,
            role: kol.role,
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'Failed',
            message: err.message,
        });
    }
};

export const viewKolData = async(req, res) => {
    const  { id } = req.params;
    try {
        const kol= await Kol.findById(id).populate('inviter', 'username role email');
        if (!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'KOL info has been fetched successfully',
            id: kol.id,
            name: kol.name,
            email: kol.email,
            country: kol.country,
            socialMedia: kol.socialMedia,
            inviter: kol.inviter,
            role: kol.role,
            postPrice: kol.postPrice,
            posts: kol.posts
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'Failed',
            message: err.message,
        });
    }
};

export const modifyKolData = async(req, res) => {
    const { id } = req.params;
    const { xAccount, xFollowers, youtubeAccount, youtubeFollowers, tiktokAccount, tiktokFollowers, 
        telegramAccount, telegramFollowers, postPrice, inviter } = req.body;
        try {
            const kol = await Kol.findById(id);
            if(!kol) {
              return res.status(404).json({error: 'KOL not found'});
        }
        const updatedSocialMedia = kol.socialMedia.map(item => {
            if (item.platform === 'x') {
                if (xAccount) item.account = xAccount;
                if (xFollowers) item.followers = xFollowers;
            }
            if (item.platform === 'youtube') {
                if (youtubeAccount) item.account = youtubeAccount;
                if (youtubeFollowers) item.followers = youtubeFollowers;
            }
            if (item.platform === 'tiktok') {
                if (tiktokAccount) item.account = tiktokAccount;
                if (tiktokFollowers) item.followers = tiktokFollowers;
            }
            if (item.platform === 'telegram') {
                if (telegramAccount) item.account = telegramAccount;
                if (telegramFollowers) item.followers = telegramFollowers;
            }
           
            return item;
        });

        const updatedPayload = {
            socialMedia: updatedSocialMedia,
            ...(postPrice !== undefined && { postPrice }),
            ...(inviter !== undefined && { inviter }),
        };

        const updatedKol = await Kol.findByIdAndUpdate(id, { $set: updatedPayload }, { new: true});

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

export const modifyKolPost = async(req, res) => {
    const  { id } = req.params;
    const { xAccount, xFollowers, youtubeAccount, youtubeFollowers, tiktokAccount, tiktokFollowers, 
        telegramAccount, telegramFollowers} = req.body;
    try { 
        const kol = await Kol.findById(id);
        if(!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }
        kol.socialMedia = kol.socialMedia.map(item => {
            if (item.platform === 'x') {
                if (xAccount) item.account = xAccount;
                if (xFollowers) item.followers = xFollowers;
            }
            if (item.platform === 'youtube') {
                if (youtubeAccount) item.account = youtubeAccount;
                if (youtubeFollowers) item.followers = youtubeFollowers;
            }
            if (item.platform === 'tiktok') {
                if (tiktokAccount) item.account = tiktokAccount;
                if (tiktokFollowers) item.followers = tiktokFollowers;
            }
            if (item.platform === 'telegram') {
                if (telegramAccount) item.account = telegramAccount;
                if (telegramFollowers) item.followers = telegramFollowers;
            }
            return item;
        });

        await kol.save();
        
        return res.status(200).json({
            status: 'Success',
            message: 'KOL information has been updated successfully',
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

export const deleteKolPost = async(req, res) => {
   const{ id, postId } = req.params;
    try {
        const kol = await Kol.findByIdAndUpdate(id, { $pull: { posts: { _id: new mongoose.Types.ObjectId(postId) }}}, {new: true});
        if (!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }
    
        return res.status(200).json({
            status: 'Success',
            message: 'KOL post has been deleted successfully'
        });

    }  catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            });
    }
};


export const allKolsAccounts = async(req, res) => {
    try {
        const allKols = await Kol.find().populate('inviter', 'username');

        const cleanKolsData = allKols.map(allKol => ({
            id: allKol.id,
            name: allKol.name,
            email: allKol.email,
            country: allKol.country,
            socialMedia: allKol.socialMedia,
            inviter: allKol.inviter,
            postPrice: allKol.postPrice,
            created: allKol.createdAt
        }));
        return res.status(200).json({
            status: 'Success',
            message: 'All registered KOLs has been fetched successfully',
            kols: cleanKolsData
        });
    }catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message,
            });
        }
};

export const postsHistory = async(req, res) => {
    const id  = req.user.userId;
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

export const createNewPost = async(req, res) => {
    const id = req.user.userId;
    const { postUrl, views, likes, shares, comments, remarks } = req.body;

    const newPost = { postUrl, views, likes, shares, comments, remarks };

    try {
        const kol = await Kol.findByIdAndUpdate(id, { $push: { posts: newPost}}, { new: true});
        if(!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }

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
    const  { id } = req.params;
    const { blockedReason } = req.body;

    const updatedData = {
        isBlocked: true,
        blockedDate: Date.now(),
        blockedReason
    };
    try {
        const kol = await Kol.findByIdAndUpdate(id, updatedData, { new: true });
        if(!kol) {
            return res.status(404).json({error: 'KOL not found'});
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

export const blockList = async(req, res) => {
    try {
        const blockkKols = await Kol.find({ isBlocked: true });

        const cleanBlockKols = blockkKols.map(blockkKol => ({
            id: blockkKol.id,
            name: blockkKol.name,
            country: blockkKol.country,
            email: blockkKol.email,
            blockedDate: blockkKol.blockedDate,
            blockedReason: blockkKol.blockedReason,
        }));
         return res.status(200).json({
            status: 'Success',
            message: 'Block list has been fetched successfully',
            blockedKols: cleanBlockKols
        });
    }  catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};