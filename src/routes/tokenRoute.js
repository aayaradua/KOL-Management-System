import express from 'express';

const router = express.Router();

router.post('/token', refreshToken);

export default router;