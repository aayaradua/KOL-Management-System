import { ENV } from "./config/index.js";
import path from "path";
import express from "express";
import cors from "cors";
import fs from "fs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import kolRoute from "./routes/kolRoute.js";
import authRoute from "./routes/authRoute.js";
import tokenRoute from "./routes/tokenRoute.js";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || ENV.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/kol", kolRoute);
app.use("/api/token", tokenRoute);

app.use((req, _, next) => {
  const token = req.cookies?.token;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    req.user = jwt.verify(token, ENV.JWT_SECRET);
  } catch (err) {
    req.user = null;
  }
  next();
});

const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "../frontend/dist");
const indexPath = path.join(frontendPath, "index.html");

if (fs.existsSync(frontendPath) && fs.existsSync(indexPath)) {
  console.log("[INFO] Frontend build found. Serving static files...");

  app.use(express.static(frontendPath));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("[ERROR] Failed to send index.html:", err);
        res.status(500).send("Error loading frontend");
      }
    });
  });
} else {
  console.warn("[WARN] No frontend build found. Serving API only.");
  app.get("/", (req, res) => {
    res.send("Backend running — no frontend build found.");
  });
}

app.get("/health", (_, res) => {
  res.send("✅ Backend alive");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[INFO] Server running on port ${PORT}`);
});
