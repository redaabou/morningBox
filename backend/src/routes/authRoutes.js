import express from 'express';
import { login, register, getAllUsers } from '../controllers/authController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users',protect, restrictTo('superadmin'), getAllUsers);

export default router;