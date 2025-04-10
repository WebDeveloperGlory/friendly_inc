const { Router } = require('express');
const controller = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.get( '/', authenticateUser, controller.getAllOrders);
router.get( '/:orderId', authenticateUser, controller.getOneOrder );
router.put( '/:orderId/status', authenticateUser, controller.updateOrderStatus );

module.exports = router;