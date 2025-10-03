import express from 'express';
import checkRole from '../middlewares/checkRole';

const router = express.Router();

router.post('/manager', checkRole('admin','manager', 'director'), addManager);
router.get('/manager', checkRole('admin','manager', 'director'), viewManager);
router.put('/manager', checkRole('admin', 'director'), modifyManager);
router.delete('/manager', checkRole('admin',), deleteManager);

export default router;