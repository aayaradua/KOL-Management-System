import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { verifyToken } from '../middlewares/userAuth.js';
import { addUser, getAllUsers,  deleteUser, modifyUser, disableUser, enableUser } from "../controllers/adminController.js";
import { addUserValidation,  modifyUserValidation, deleteUserValidation } from "../validators/adminValidator.js";

const router = express();

router.patch('/disable/:id', verifyToken, checkRole('admin'), disableUser);
router.patch('/enable/:id', verifyToken, checkRole('admin'), enableUser);
router.delete('/:id', verifyToken, checkRole('admin'), deleteUserValidation, deleteUser);
router.patch('/:id', verifyToken, checkRole('admin'), modifyUserValidation, modifyUser);
router.post('/',verifyToken, checkRole('admin'), addUserValidation, addUser);
router.get('/', verifyToken, checkRole('admin', 'director', 'manager', 'kol'), getAllUsers);

export default router;
