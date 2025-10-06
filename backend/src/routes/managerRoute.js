import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addManager, getAllManagers, modifyManager, viewManagerInfo, deleteManager } from "../controllers/managerController.js";
import { verifyToken } from "../middlewares/userAuth.js";

const router = express.Router();

router.patch('/:id', verifyToken, checkRole('admin', 'director'), modifyManager);
router.delete('/:id', verifyToken, checkRole('admin'), deleteManager);
router.get('/:id',verifyToken, checkRole('admin', 'director'), viewManagerInfo);
router.post('/', verifyToken, checkRole('admin', 'director'), addManager);
router.get('/', verifyToken, checkRole('admin', 'director'), getAllManagers);

export default router;
