import express from "express";
import { refreshTokenHandler } from "../controllers/tokenController.js";

const router = express.Router();

router.post("/", refreshTokenHandler);

export default router;
