import express from "express";
import {
  getAllUsers,
  deleteUser,
  blockList,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {
  modifyUserValidation,
  userValidation,
} from "../validators/usersValidator.js";
import { verifyToken } from "../middlewares/userAuth.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router
  .get(
    "/all",
    verifyToken,
    checkRole("admin", "director", "marketing-manager", "kol"),
    getAllUsers
  )
  .get(
    "/block-list",
    verifyToken,
    checkRole("admin", "director", "marketing-manager"),
    blockList
  )
  .get(
    "/:id",
    verifyToken,
    checkRole("admin", "director", "marketing-manager", "kol"),
    userValidation,
    getUserById
  )
  .patch(
    "/:id",
    verifyToken,
    checkRole("admin"),
    modifyUserValidation,
    updateUser
  )
  .delete("/:id", verifyToken, checkRole("admin"), userValidation, deleteUser);

export default router;
