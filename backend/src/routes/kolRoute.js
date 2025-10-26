import express from "express";
import checkRole from "../middlewares/checkRole.js";
import {
  onboardInfo,
  postsHistory,
  createNewPost,
} from "../controllers/kolController.js";
import { verifyToken } from "../middlewares/userAuth.js";
import { 
  addPostValidation, 
  onboardValidation, 
  kolIdValidation
} from "../validators/kolValidator.js";

const router = express.Router();

router.post("/onboard",
  verifyToken,
  checkRole("kol"),
  onboardValidation,
  onboardInfo
);

router.get(
  "/posts", 
  verifyToken, 
  checkRole("kol"), 
  postsHistory
);

router.post(
  "/add-post",
  verifyToken,
  checkRole("kol", "admin"),
  addPostValidation,
  createNewPost
);

export default router;