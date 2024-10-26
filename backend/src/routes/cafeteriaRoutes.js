import express from 'express';
import { getAllCafeterias, getCafeteria, createCafeteria, updateCafeteria, deleteCafeteria, assignManager, getCafeteriasByGerant } from '../controllers/cafeteriaController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../middlewares/upload.js';

const router = express.Router();

router.get('/cafeterias', getAllCafeterias);
router.get('/cafeterias/:id', getCafeteria);
router.post('/cafeterias', protect, uploadMiddleware, restrictTo('superadmin'), createCafeteria);
router.put('/cafeterias/:id', protect,uploadMiddleware,  restrictTo('superadmin'), updateCafeteria);
router.delete('/cafeterias/:id', protect, restrictTo('superadmin'), deleteCafeteria);
router.post('/assign-manager', protect, restrictTo('superadmin'), assignManager);
router.get('/gerant/:id/cafeterias', protect, restrictTo('gerant'), getCafeteriasByGerant);

export default router;