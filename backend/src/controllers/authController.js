import { Kol } from "../models/Kol.js";
import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import { v4 as uuid } from "uuid";
import { Token } from "../models/Token.js";
import { generateToken, hashToken } from "../utils/crypto.js";
import { transporter } from "../utils/nodemailer.js";
import { ENV } from "../config/index.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await Kol.findOne({ email });
    }
    if (!user) {
      return res.status(400).json({ error: "Email or password is invalid" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email or password is invalid" });
    }
    if (user.status === "disable") {
      return res.status(403).json({ error: "You are not allowed to login" });
    }
    const sessionId = uuid();
    const jti = uuid();

    const accessToken = signAccessToken({ userId: user._id, role: user.role });
    const refreshToken = signRefreshToken({
      userId: user._id,
      role: user.role,
      jti,
      sessionId,
    });

    const hashedToken = hashToken(refreshToken);

    await Token.create({
      userId: user._id,
      role: user.role,
      jti,
      sessionId,
      token: hashedToken,
      isUsed: false,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      status: "Success",
      message: "User login successfully",
      id: user.id,
      email: user.email,
      user_name: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const role = req.body.role?.trim().toLowerCase();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const status = req.body.status
      ? req.body.status.toLowerCase().trim()
      : "enable";

    const allowedRoles = ["admin", "director", "marketing-manager", "kol"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role provided" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exist" });
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      username,
      role,
      email,
      password: hashedPassword,
      status,
    });

    return res.status(201).json({
      status: "Success",
      message: "User has been created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const resetToken = generateToken();
  const hashedResetToken = hashToken(resetToken);
  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordTokenExpires = Date.now() + 3600000;
  await user.save();

  const resetUrl = `${ENV.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `
        <h1>Password Reset</h1>     
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>     
        <p>If you did not request this, please ignore this email.</p>
    `;

  try {
    await transporter.sendMail({
      from: `"CreatorX" <${ENV.MAIL_FROM}>`,
      to: email,
      subject: "Password Reset",
      html: message,
    });
    res.status(200).json({
      status: "Success",
      message: "Password reset email sent. Please check your email.",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();
    return res.status(500).json({ error: err.message, stalk: err.stalk });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const hashedToken = hashToken(token);
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Password is reset successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ error: "Token not found" });
  }
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({
    status: "Success",
    message: "Logout successful",
  });
};