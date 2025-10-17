import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addKol, kolProfile, viewKolData, deleteKol, modifyKolPost, modifyKolData, deleteKolPost, allKolsAccounts, postsHistory, createNewPost, blockKol, unblockKol, blockList } from "../controllers/kolController.js";
import { verifyToken } from "../middlewares/userAuth.js";
import { addKolValidator, modifyKolDataValidator, modifyKolPostValidator, addPostValidator, kolIdValidator } from "../validators/kolValidator.js";
import { checkIfBlocked } from "../middlewares/checkIfBlocked.js";

const router = express.Router();

//Routes that KOL can have access to
router.get('/profile', verifyToken, checkRole('kol'), kolProfile);
router.get('/posts', verifyToken, checkRole('kol'), postsHistory);
router.post('/add-post', verifyToken, checkRole('kol'), addPostValidator, createNewPost);

//Block routes
router.patch('/block/:id', verifyToken, checkRole('admin', 'director', 'manager'), kolIdValidator, blockKol);
router.patch('/unblock/:id', verifyToken, checkRole('admin', 'director', 'manager'), kolIdValidator, unblockKol);
router.get('/block-list', verifyToken, checkRole('admin', 'director', 'manager'), blockList);

//Admin/Users actions routes on kols
router.get('/all', verifyToken, checkRole('admin', 'director', 'manager'), allKolsAccounts);
router.get('/view/:id', verifyToken, checkRole('admin', 'director', 'manager'), viewKolData);
router.patch('/edit-post/:id', verifyToken, checkRole('admin', 'director', 'manager'), modifyKolPostValidator, modifyKolPost);
router.patch('/modify/:id', verifyToken, checkRole('admin', 'director', 'manager'), modifyKolDataValidator, modifyKolData);
router.delete('/:id/posts/:postId', verifyToken, checkRole('admin'), kolIdValidator, deleteKolPost);
router.delete('/delete/:id', verifyToken, checkRole('admin'), kolIdValidator, deleteKol); 
router.post('/', verifyToken, checkRole('admin', 'director', 'manager'), addKolValidator, addKol);

export default router;