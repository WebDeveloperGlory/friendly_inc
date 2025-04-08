const { Router } = require('express');
const controller = require('../controllers/adminController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.get( '/dashboard', authenticateUser, controller.getAdminDashboardDetails);
router.get( '/profile', authenticateUser, controller.getPersonalDetails );
router.put( '/profile', authenticateUser, controller.editPersonalDetails );
router.post( '/register/staff', authenticateUser, controller.registerAdministratorOrRider );
router.post( '/assign-rider/:orderId', authenticateUser, controller.assignRidersToOrders );

module.exports = router;