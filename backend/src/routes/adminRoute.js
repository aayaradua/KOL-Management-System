import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { verifyToken } from '../middlewares/userAuth.js';
import { addUser, getAllUsers, viewUserInfo, deleteUser, modifyUser } from "../controllers/adminController.js";
import { addUserValidation, viewUserInfoValidation, modifyUserValidation, deleteUserValidation } from "../validators/userValidator.js";

const router = express();

router.get("/:id", verifyToken, checkRole('admin'), viewUserInfoValidation, viewUserInfo);
router.delete('/:id', verifyToken, checkRole('admin'), deleteUserValidation, deleteUser);
router.patch('/:id', verifyToken, checkRole('admin'), modifyUserValidation, modifyUser);
router.post('/',verifyToken, checkRole('admin'), addUserValidation, addUser);
router.get('/', verifyToken, checkRole('admin'), getAllUsers);

export default router;
