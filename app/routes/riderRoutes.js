const { Router } = require('express');
const controller = require('../controllers/riderController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.get( '/dashboard', authenticateUser, controller.getRiderDashboard);
router.put( '/availability', authenticateUser, controller.setAvailability );
router.get( '/orders', authenticateUser, controller.getAllRiderOrders );
router.get( '/orders/:orderId', authenticateUser, controller.getSpecificRiderOrder );
router.post( '/orders/:orderId', authenticateUser, controller.cancelOrder );

module.exports = router;