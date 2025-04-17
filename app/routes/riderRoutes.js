const { Router } = require('express');
const controller = require('../controllers/riderController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasRiderPermissions } = require('../middlewares/riderMiddlewares')

const router = Router();

router.get( '/', controller.getAllRiders);
router.get( '/profile/:riderId', controller.getRiderDetails);
router.get( '/profile', authenticateUser, hasRiderPermissions, controller.getPersonalRiderDetails);
router.get( '/dashboard', authenticateUser, hasRiderPermissions, controller.getRiderDashboard);
router.put( '/availability', authenticateUser, hasRiderPermissions, controller.setAvailability );
router.get( '/orders', authenticateUser, hasRiderPermissions, controller.getAllRiderOrders );
router.get( '/orders/:orderId', authenticateUser, hasRiderPermissions, controller.getSpecificRiderOrder );
router.post( '/orders/:orderId', authenticateUser, hasRiderPermissions, controller.cancelOrder );

module.exports = router;