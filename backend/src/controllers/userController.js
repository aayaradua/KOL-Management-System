import { Kol } from "../models/Kol.js";
import { User } from "../models/User.js";
import { ENV } from "../config/index.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const cleanUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      status: user.status,
    }));

    return res.status(200).json({
      status: "Success",
      message: "Users fetched successfully",
      users: cleanUsers,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const userProfile = async (req, res) => {
  const id = req.user.userId;
  try {
    const user = await User.findById(id).populate("otherInfo", "country name postPrice socialMedia inviter posts");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === "kol") {
        const info = user.otherInfo || {};
        return res.status(200).json({
            status: 'Success',
            message: 'User info has been fetched successfully',
            id: user.id,
            email: user.email,
            status: user.status,
            role: user.role,
            name: info.name,
            country: info.country,
            socialMedia: info.socialMedia||[],
            inviter: info.inviter,
            
            postPrice: info.postPrice,
            posts: info.posts
        });
    } else {
        return res.status(200).json({
           status: "Success",
           message: "User info has been fetched successfully",
           username: user.username,
           role: user.role,
           email: user.email,
           status: user.status,
    });
    }
    
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      status: "Success",
      message: "User has been deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const modifyUser = async (req, res) => {
  const { id } = req.params;
  const { role, status } = req.body;
  const updatedData = { role, status };
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      status: "Success",
      message: "User has been modified successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const disableUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.status === "disable") {
      return res.status(400).json({ error: `User already disbled` });
    }

    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: { status: "disable" } },
      { new: true }
    );

    return res.status(200).json({
      status: "Success",
      message: "User has been disabled.",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const enableUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.status === "enable") {
      return res.status(400).json({ error: `User already enabled` });
    }
    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: { status: "enable" } },
      { new: true }
    );

    return res.status(200).json({
      status: "Success",
      message: "User has been enabled.",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const viewUser = async(req, res) => {
    const  { id } = req.params;
    try {
    const user = await User.findById(id).populate("otherInfo", "country name postPrice socialMedia inviter posts");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === "kol") {
        const info = user.otherInfo || {};
        return res.status(200).json({
            status: 'Success',
            message: 'User info has been fetched successfully',
            id: user.id,
            email: user.email,
            status: user.status,
            role: user.role,
            name: info.name,
            country: info.country,
            socialMedia: info.socialMedia||[],
            inviter: info.inviter,
            
            postPrice: info.postPrice,
            posts: info.posts
        });
    } else {
        return res.status(200).json({
           status: "Success",
           message: "User info has been fetched successfully",
           username: user.username,
           role: user.role,
           email: user.email,
           status: user.status,
    });
    }
    
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};
export const getAllKols = async(req, res) => {
    try {
        const allKols = await User.find({ role: "kol" }).populate("otherInfo", "country name postPrice inviter posts");

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

export const modifyKolPost = async(req, res) => {
    const { id, postId } = req.params;
    const { postUrl, views, likes, shares, comments, remarks } = req.body;
     try {
        const user = await User.findById(id).populate("otherInfo");
        if (!user) {
            return res.status(404).json({error: 'KOL not found'});
        }
        const info = user.otherInfo;
        if (!info) return res.status(404).json({ error: "OtherInfo record not found" });

        const postIndex = info.posts.findIndex(p => p._id.toString() === postId);
        if (postIndex === -1) {
            return res.status(404).json({ error: "Post not found" });
        }
         const post = info.posts[postIndex];
    if (postUrl !== undefined) post.postUrl = postUrl;
    if (views !== undefined) post.views = views;
    if (likes !== undefined) post.likes = likes;
    if (shares !== undefined) post.shares = shares;
    if (comments !== undefined) post.comments = comments;
    if (remarks !== undefined) post.remarks = remarks;

    await info.save();

    return res.status(200).json({
      status: 'Success',
      message: 'KOL post has been updated successfully',
      post: info.posts[postIndex] 
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
        const user = await User.findById(id).populate("otherInfo");
        if (!user) {
            return res.status(404).json({error: 'KOL not found'});
        }
        const info = user.otherInfo;
        if (!info) return res.status(404).json({ error: "OtherInfo record not found" });

        const postIndex = info.posts.findIndex(p => p._id.toString() === postId);
        if (postIndex === -1) {
            return res.status(404).json({ error: "Post not found" });
        }
        info.posts.splice(postIndex, 1);
         await info.save();
    
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


export const blockKol = async(req, res) => {
    const  { id } = req.params;
    const { blockedReason } = req.body;
    try {
        const user = await User.findById(id).populate("otherInfo")
        if(!user) {
            return res.status(404).json({error: 'KOL record not found'});
        }
        const info = user.otherInfo;
        if (!info) return res.status(404).json({ error: "OtherInfo record not found" });

        info.isBlocked = true,
        info.blockedDate = Date.now(),
        info.blockedReason = blockedReason

        await info.save();

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
        const user = await User.findById(id).populate("otherInfo")
        if(!user) {
            return res.status(404).json({error: 'KOL record not found'});
        }
        const info = user.otherInfo;
        if (!info) return res.status(404).json({ error: "OtherInfo record not found" });

        info.isBlocked = false,

        await info.save();
         
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
