const { Router } = require('express');
const controller = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

router.get( '/', authenticateUser, hasAdminPermissions, controller.getAllOrders);
router.get( '/:orderId', authenticateUser, controller.getOneOrder );
router.put( '/:orderId/status', authenticateUser, hasAdminPermissions, controller.updateOrderStatus );

module.exports = router;