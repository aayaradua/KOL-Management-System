import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { verifyToken } from '../middlewares/userAuth.js';
import { addUser, getAllUsers, viewUserInfo, deleteUser, modifyUser } from "../controllers/userController.js";

const router = express();

router.get("/:id", verifyToken, checkRole('admin'), viewUserInfo);
router.delete('/:id', verifyToken, checkRole('admin'), deleteUser);
router.patch('/:id', verifyToken, checkRole('admin'), modifyUser);
router.post('/',verifyToken, checkRole('admin'), addUser);
router.get('/', verifyToken, checkRole('admin'), getAllUsers);

export default router;
