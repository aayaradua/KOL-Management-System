import express, { Router } from "express";
import {
  getAllUsers,
  deleteUser,
  modifyUser,
  disableUser,
  enableUser,
  viewUser,
  userProfile,
  modifyKolPost,
  deleteKolPost,
  getAllKols,
  blockKol,
  unblockKol,
  blockList
} from "../controllers/userController.js";
import {
  modifyUserValidation,
  userValidation,
  modifyKolPostValidation,
} from "../validators/usersValidator.js";
import { checkIfBlocked } from "../middlewares/checkIfBlocked.js";
import { verifyToken } from "../middlewares/userAuth.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.patch(
  "/disable/:id", 
  verifyToken, 
  checkRole("admin"), 
  userValidation,
  disableUser
);

router.patch(
  "/enable/:id", 
  verifyToken, 
  checkRole("admin"), 
  userValidation,
  enableUser
);

router.get("/profile",
  verifyToken,
  checkRole("admin", "director", "marketing-manager", "kol"),
  userProfile
);

router.get(
  "/all-kols",
  verifyToken,
  checkRole("admin", "director", "marketing-manager"),
  getAllKols
);

router.patch(
  "/:id/posts/:postId",
  verifyToken,
  checkRole("admin", "director", "marketing-manager"),
  modifyKolPostValidation,
  modifyKolPost
);

router.delete(
  "/:id/posts/:postId",
  verifyToken,
  checkRole("admin"),
  userValidation,
  deleteKolPost
);

//Block routes
router.patch(
  "/block/:id",
  verifyToken,
  checkRole("admin", "director", "marketing-manager"),
  userValidation,
  blockKol
);

router.patch(
  "/unblock/:id",
  verifyToken,
  checkRole("admin", "director", "marketing-manager"),
  userValidation,
  unblockKol
);

router.get(
  "/block-list",
  verifyToken,
  checkRole("admin", "director", "marketing-manager"),
  blockList
);

router.get(
  "/users",
  verifyToken,
  checkRole("admin", "director", "marketing-manager", "kol"),
  getAllUsers
);

router.get(
  "/:id",
  verifyToken,
  checkRole("admin", "director", "marketing-manager"),
  userValidation,
  viewUser
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  userValidation,
  deleteUser
);

router.patch(
  "/:id",
  verifyToken,
  checkRole("admin"),
  modifyUserValidation,
  modifyUser
);


export default router;