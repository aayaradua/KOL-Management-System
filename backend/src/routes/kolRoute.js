import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addKol, viewKolData, modifyKol, deleteKol, getAllKols, allKolPosts, addPost, blockKol, unblockKol, blockList } from "../controllers/kolController.js";
import { verifyToken } from "../middlewares/userAuth.js";
import { addKolValidator, modifyKolValidator, addPostValidator, kolIdValidator } from "../validators/kolValidator.js";
import { checkIfBlocked } from "../middlewares/checkIfBlocked.js";

const router = express.Router();

//Routes that KOL can have access to
router.get('/posts/:id', verifyToken, checkRole('kol'), kolIdValidator, allKolPosts);
router.post('/add-post/:id', verifyToken, checkRole('kol'), checkIfBlocked, addPostValidator, addPost);
router.get('/block-list', verifyToken, checkRole('admin', 'director', 'manager', 'kol'), blockList);
router.get('/view/:id', verifyToken, checkRole('admin', 'director', 'manager', 'kol'), kolIdValidator, viewKolData);

//Routes that users have access to
router.patch('/block/:id', verifyToken, checkRole('admin', 'director'), kolIdValidator, blockKol);
router.patch('/unblock/:id', verifyToken, checkRole('admin', 'director'), kolIdValidator, unblockKol);
router.get('/all', verifyToken, checkRole('admin', 'director', 'manager'), getAllKols);
router.patch('/edit/:id', verifyToken, checkRole('admin', 'director'), modifyKolValidator, modifyKol);
router.delete('/delete/:id', verifyToken, checkRole('admin'), kolIdValidator, deleteKol);
router.post('/', verifyToken, checkRole('admin', 'director', 'manager'), addKolValidator, addKol);

export default router;
