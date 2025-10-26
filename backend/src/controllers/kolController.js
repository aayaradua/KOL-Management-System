import { User } from "../models/User.js";

export const getAllKol = async (_, res) => {
  try {
    const kols = await User.find({ role: "kol" }).lean();

    return res.status(200).json({
      status: "Success",
      message: "All registered KOLs have been fetched successfully",
      kols,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const getKolById = async (req, res) => {
  try {
    const { kolId } = req.params;

    const kol = await User.findOne({ _id: kolId, role: "kol" })
      .populate("otherInfo")
      .lean();

    if (!kol) {
      return res.status(404).json({
        status: "Failed",
        message: "KOL not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "KOL fetched successfully",
      kol,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const getKolPostsHistory = async (req, res) => {
  const id = req.user.userId;
  try {
    const kol = await User.findById(id).populate("otherInfo");
    if (!kol) {
      return res.status(404).json({ error: "KOL not found" });
    }
    const posts = kol.otherInfo?.posts;

    return res.status(200).json({
      status: "Success",
      message: "KOL posts have been fetched successfully",
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const createNewPost = async (req, res) => {
  const id = req.user.userId;
  const { postUrl, views, likes, shares, comments, remarks, kolId } = req.body;

  const newPost = { postUrl, views, likes, shares, comments, remarks };

  try {
    const user = await User.findById(id).populate("otherInfo");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      if (!kolId) {
        return res.status(400).json({
          error: "KOL ID (kolId) is required when creating a post as an admin",
        });
      }

      const kol = await User.findById(kolId).populate("otherInfo");
      if (!kol) {
        return res.status(404).json({ error: "KOL record not found" });
      }

      if (!kol.otherInfo) {
        return res
          .status(404)
          .json({ error: "This KOL has no otherInfo record" });
      }

      kol.otherInfo.posts.push(newPost);
      await kol.otherInfo.save();

      return res.status(200).json({
        status: "Success",
        message: `Post added successfully to KOL ${kol.name}`,
      });
    }

    if (user.role === "kol") {
      if (!user.otherInfo) {
        return res.status(404).json({ error: "OtherInfo record not found" });
      }

      user.otherInfo.posts.push(newPost);
      await user.otherInfo.save();

      return res.status(200).json({
        status: "Success",
        message: "Post has been added successfully",
      });
    }

    return res.status(403).json({
      error: "You are not authorized to create posts",
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const UpdatePost = async (req, res) => {
  const { id, postId } = req.params;
  const { postUrl, views, likes, shares, comments, remarks } = req.body;
  try {
    const user = await User.findById(id).populate("otherInfo");
    if (!user) {
      return res.status(404).json({ error: "KOL not found" });
    }
    const info = user.otherInfo;
    if (!info)
      return res.status(404).json({ error: "OtherInfo record not found" });

    const postIndex = info.posts.findIndex((p) => p._id.toString() === postId);
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
      status: "Success",
      message: "KOL post has been updated successfully",
      post: info.posts[postIndex],
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id, postId } = req.params;
  try {
    const user = await User.findById(id).populate("otherInfo");
    if (!user) {
      return res.status(404).json({ error: "KOL not found" });
    }
    const info = user.otherInfo;
    if (!info)
      return res.status(404).json({ error: "OtherInfo record not found" });

    const postIndex = info.posts.findIndex((p) => p._id.toString() === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    info.posts.splice(postIndex, 1);
    await info.save();

    return res.status(200).json({
      status: "Success",
      message: "KOL post has been deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};
