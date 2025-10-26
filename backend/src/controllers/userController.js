import { Kol } from "../models/Kol.js";
import { User } from "../models/User.js";

export const getAllUsers = async (_, res) => {
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

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate(
      "otherInfo",
      "country name postPrice socialMedia inviter posts"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === "kol") {
      const info = user.otherInfo || {};
      return res.status(200).json({
        status: "Success",
        message: "User info has been fetched successfully",
        id: user.id,
        email: user.email,
        status: user.status,
        role: user.role,
        name: info.name,
        country: info.country,
        socialMedia: info.socialMedia || [],
        inviter: info.inviter,

        postPrice: info.postPrice,
        posts: info.posts,
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

export const updateUser = async (req, res) => {
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

export const blockList = async (_, res) => {
  try {
    // 🔍 find all users where isBlocked = true
    const blockedUsers = await User.find({ isBlocked: true });

    // 🧹 map the result to only include relevant fields
    const cleanBlockedUsers = blockedUsers.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
      blockedDate: user.blockedDate,
      blockedReason: user.blockedReason,
    }));

    return res.status(200).json({
      status: "Success",
      message: "Blocked users have been fetched successfully",
      data: cleanBlockedUsers,
    });
  } catch (err) {
    console.error("Error fetching blocked users:", err);
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};
