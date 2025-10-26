import mongoose from "mongoose";
import { Kol } from "../models/Kol.js"
import { User } from "../models/User.js";
import { hashPassword } from "../utils/bcrypt.js";

export const onboardInfo = async(req, res) => {
    const id = req.user.userId;
    const { 
        country, 
        name, 
        xAccount, 
        xFollowers, 
        youtubeAccount, 
        youtubeFollowers, 
        tiktokAccount, 
        tiktokFollowers, 
        telegramAccount, 
        telegramFollowers, 
        postPrice 
    } = req.body;

        try  {
            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json({error: "User does not exist"});
            }

            const kol = await Kol.create({
                country, 
                name,  
                inviter: req.user?.userId, 
                postPrice,
                socialMedia: [
                    { platform:'x', account: xAccount, followers: xFollowers }, 
                    { platform: 'youtube', account: youtubeAccount, followers: youtubeFollowers }, 
                    { platform: 'tiktok', account: tiktokAccount, followers: tiktokFollowers },
                    { platform: 'telegram', account: telegramAccount, followers: telegramFollowers },
                ]
            });

            user.otherInfo = kol._id;
            await user.save();

            return res.status(201).json({
                status: 'Success',
                message: 'KOL onboard information has been saved successfully',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err.message,
            });
        }
};

export const postsHistory = async(req, res) => {
    const id  = req.user.userId;
    try {
        const kol = await User.findById(id).populate("otherInfo");
        if (!kol) {
            return res.status(404).json({error: 'KOL not found'});
        }
        const posts = kol.otherInfo?.posts;

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
        const kol = await User.findById(id).populate("otherInfo");
        if(!kol) {
            return res.status(404).json({error: 'KOL record not found'});
        }
        const info = kol.otherInfo;
        if (!info) return res.status(404).json({ error: "OtherInfo record not found" });

        info.posts.push(newPost);
        await info.save();

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