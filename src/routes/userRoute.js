import express from 'express';
import checkRole from '../middlewares/checkRole.js';
import { verifyToken } from '../middlewares/userAuth.js';

const router = express();

router.post('/', checkRole(), addUser);
router.get('/', checkRole(), viewUser)
router.get('/', checkRole(), getAllUsers);
router.delete('/', checkRole(), deleteUser);
router.put('/', checkRole(), modifyUser);

export default router;