const { Router } = require('express');
const controller = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

router.get( '/', authenticateUser, hasAdminPermissions, controller.getAllOrders);
router.get( '/:orderId', authenticateUser, controller.getOneOrder );
router.put( '/:orderId/status', authenticateUser, hasAdminPermissions, controller.updateOrderStatus );

router.post('/', authenticateUser, controller.placeOrder);
router.post('/verify-payment', authenticateUser, controller.verifyPayment);
router.post('/paystack-webhook', controller.handleWebhook);
router.get('/paystack/callback', controller.handlePaystackCallback);

module.exports = router;