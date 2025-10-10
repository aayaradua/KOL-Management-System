import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addManager, getAllManagers, modifyManager, viewManagerInfo, deleteManager } from "../controllers/managerController.js";
import { verifyToken } from "../middlewares/userAuth.js";
import { addManagerValidation, viewManagerInfoValidation, modifyManagerValidation, deleteManagerValidation } from "../validators/managerValidator.js";

const router = express.Router();

router.patch('/:id', verifyToken, checkRole('admin', 'director'), modifyManagerValidation, modifyManager);
router.delete('/:id', verifyToken, checkRole('admin'), deleteManagerValidation, deleteManager);
router.get('/:id',verifyToken, checkRole('admin', 'director'), viewManagerInfoValidation, viewManagerInfo);
router.post('/', verifyToken, checkRole('admin', 'director'),  addManagerValidation, addManager);
router.get('/', verifyToken, checkRole('admin', 'director'), getAllManagers);

export default router;
