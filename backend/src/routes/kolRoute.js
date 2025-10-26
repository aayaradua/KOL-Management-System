import express from "express";
import checkRole from "../middlewares/checkRole.js";
import {
  createNewPost,
  deletePost,
  getAllKol,
  getKolById,
  getKolPostsHistory,
  UpdatePost,
} from "../controllers/kolController.js";
import { verifyToken } from "../middlewares/userAuth.js";
import { addPostValidation } from "../validators/kolValidator.js";
import {
  modifyKolPostValidation,
  userValidation,
} from "../validators/usersValidator.js";

const router = express.Router();

router
  .get(
    "/all",
    verifyToken,
    checkRole("admin", "director", "marketing-manager"),
    getAllKol
  )
  .get("/post", verifyToken, checkRole("kol"), getKolPostsHistory)

  .get(
    "/:kolId",
    verifyToken,
    checkRole("admin", "director", "marketing-manager"),
    getKolById
  )
  .post(
    "/create-post",
    verifyToken,
    checkRole("kol", "admin"),
    addPostValidation,
    createNewPost
  )
  .patch(
    "/:id/posts/:postId",
    verifyToken,
    checkRole("admin", "director", "marketing-manager"),
    modifyKolPostValidation,
    UpdatePost
  )
  .delete(
    "/:id/posts/:postId",
    verifyToken,
    checkRole("admin"),
    userValidation,
    deletePost
  );

export default router;
