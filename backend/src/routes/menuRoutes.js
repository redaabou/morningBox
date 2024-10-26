import exprese from 'express';
import { getAllMenus, createMenu, deleteMenu, updateMenu, markMenuAsEpuisé, getMenu} from '../controllers/menuController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = exprese.Router();

router.get('/menus', getAllMenus);
router.get('/menus/:id', getMenu);
router.post('/menus', protect, restrictTo('superadmin', 'gerant'), createMenu);
router.put('/menus/:id', protect, restrictTo('superadmin', 'gerant'), updateMenu);
router.delete('/menus/:id', protect, restrictTo('superadmin', 'gerant'), deleteMenu);
router.put('/menus/:id/epuise', protect, restrictTo('superadmin', 'gerant'), markMenuAsEpuisé);

export default router;