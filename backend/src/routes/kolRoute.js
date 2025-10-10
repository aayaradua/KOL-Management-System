import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addKol, viewKolInfo, modifyKol, deleteKol, getAllKols, allKolPosts, addPost, blockKol, unblockKol } from "../controllers/kolController.js";
import { checkIfBlocked } from "../middlewares/checkIfBlocked.js";
import { verifyToken } from "../middlewares/userAuth.js";
import { addKolValidator, modifyKolValidator, addPostValidator, kolIdValidator } from "../validators/kolValidator.js";

const router = express.Router();

router.get('/all', verifyToken, checkRole('admin', 'director', 'manager'), getAllKols);
router.get('/posts/:id', kolIdValidator, allKolPosts);
router.patch('/block/:id', verifyToken, checkRole('admin', 'director'), kolIdValidator, blockKol);
router.patch('/unblock/:id', verifyToken, checkRole('admin', 'director'), kolIdValidator, unblockKol);
router.post('/:id', checkIfBlocked, addPostValidator, addPost)
router.get('/:id', verifyToken, checkRole('admin', 'director', 'manager'), kolIdValidator, viewKolInfo);
router.patch('/:id', verifyToken, checkRole('admin', 'director'), modifyKolValidator, modifyKol);
router.delete('/:id', verifyToken, checkRole('admin'), kolIdValidator, deleteKol);
router.post('/', verifyToken, checkRole('admin', 'director', 'manager'), addKolValidator, addKol);

export default router;
