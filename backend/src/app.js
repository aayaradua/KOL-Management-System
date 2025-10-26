import { ENV } from "./config/index.js";
import path from "path";
import express from "express";
import cors from "cors";
import fs from "fs";
import { connectDB } from "./config/db.js";
import kolRoute from "./routes/kolRoute.js";
import authRoute from "./routes/authRoute.js";
import tokenRoute from "./routes/tokenRoute.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";

connectDB();

const app = express();
const PORT = ENV.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/kol", kolRoute);
app.use("/api/token", tokenRoute);

const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "../frontend/dist");
const indexPath = path.join(frontendPath, "index.html");

console.log("[DEBUG] __dirname:", __dirname);
console.log("[DEBUG] frontendPath:", frontendPath);
console.log("[DEBUG] indexPath:", indexPath);

if (fs.existsSync(frontendPath) && fs.existsSync(indexPath)) {
  console.log("[INFO] ✅ Frontend build found. Serving static files...");

  app.use(express.static(frontendPath));

  app.use((req, res) => {
    console.log("[DEBUG] Fallback route for:", req.originalUrl);
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("[ERROR] Failed to send index.html:", err);
        res.status(500).send("Error loading frontend");
      }
    });
  });
} else {
  console.warn("[WARN] ⚠️ No frontend build found. Serving API only.");

  app.get("/", (req, res) => {
    res.send("Backend running — no frontend build found.");
  });
}

app.listen(PORT, () => {
  console.log(`[INFO] 🚀 Server running at http://localhost:${PORT}`);
});
