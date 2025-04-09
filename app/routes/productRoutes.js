const { Router } = require('express');
const controller = require('../controllers/productController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const imageService = require('../services/imageService');

const router = Router();

router.get('/', controller.getAllProducts);
router.post('/', controller.createProduct);
router.get('/:productId', controller.getSingleProduct);
router.post('/:productId/update', imageService.uploadProductImage, controller.updateProduct);
router.delete('/:productId/delete', controller.deleteProduct);

module.exports = router;