import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addKol, viewKolInfo, modifyKol, deleteKol, getAllKols, allKolPosts, addPost, blockKol, unblockKol } from "../controllers/kolController.js";
import { checkIfBlocked } from "../middlewares/checkIfBlocked.js";
import { verifyToken } from "../middlewares/userAuth.js";

const router = express.Router();

router.get('/all', verifyToken, checkRole('admin', 'director', 'manager'), getAllKols);
router.get('/posts/:id', allKolPosts);
router.patch('/block/:id', verifyToken, checkRole('admin', 'director'), blockKol);
router.patch('/unblock/:id', verifyToken, checkRole('admin', 'director'), unblockKol);
router.post('/:id', checkIfBlocked, addPost)
router.get('/:id', verifyToken, checkRole('admin', 'director', 'manager'), viewKolInfo);
router.patch('/:id', verifyToken, checkRole('admin', 'director'), modifyKol);
router.delete('/:id', verifyToken, checkRole('admin'), deleteKol);
router.post('/', verifyToken, checkRole('admin', 'director', 'manager'), addKol);

export default router;
