const { Router } = require('express');
const controller = require('../controllers/riderController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasRiderPermissions } = require('../middlewares/riderMiddlewares')

const router = Router();

router.get( '/', controller.getAllRiders);
router.get( '/profile', authenticateUser, hasRiderPermissions, controller.getPersonalRiderDetails);
router.get( '/profile/:riderId', controller.getRiderDetails);

router.get( '/dashboard', authenticateUser, hasRiderPermissions, controller.getRiderDashboard);
router.get( '/notifications', authenticateUser, hasRiderPermissions, controller.getRiderNotifications );
router.put( '/availability', authenticateUser, hasRiderPermissions, controller.setAvailability );

router.get( '/orders/personal', authenticateUser, hasRiderPermissions, controller.getAllRiderOrders );
router.get( '/orders/retrieve/:orderId', authenticateUser, hasRiderPermissions, controller.getSpecificRiderOrder );
router.post( '/orders/cancel/:orderId', authenticateUser, hasRiderPermissions, controller.cancelOrder );
router.post( '/orders/complete/:orderId', authenticateUser, hasRiderPermissions, controller.completeOrder );

module.exports = router;