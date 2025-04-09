const { Router } = require('express');
const controller = require('../controllers/productController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');
const imageService = require('../services/imageService');

const router = Router();

router.get('/', controller.getAllProducts);
router.post('/', authenticateUser, hasAdminPermissions, controller.createProduct);
router.get('/:productId', controller.getSingleProduct);
router.post('/:productId/update',authenticateUser, hasAdminPermissions, imageService.uploadProductImage, controller.updateProduct);
router.delete('/:productId/delete', authenticateUser, hasAdminPermissions, controller.deleteProduct);

module.exports = router;