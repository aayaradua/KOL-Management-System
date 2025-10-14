import { ENV } from "./config/index.js";
import path from "path";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import kolRoute from "./routes/kolRoute.js";
import adminRoute from "./routes/adminRoute.js"
import authRoute from "./routes/authRoute.js"
import tokenRoute from "./routes/tokenRoute.js"
import cookieParser from 'cookie-parser'

connectDB();

const __dirname = path.resolve();

const app = express();
const PORT = ENV.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/token', tokenRoute);
app.use('/api/kol', kolRoute);
app.use('/api/admin', adminRoute);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
