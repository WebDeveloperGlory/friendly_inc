const { Router } = require('express');
const controller = require('../controllers/adminController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

router.get( '/dashboard', authenticateUser, hasAdminPermissions, controller.getAdminDashboardDetails);
router.get( '/notifications', authenticateUser, hasAdminPermissions, controller.getAdminNotifications);
router.get( '/profile', authenticateUser, hasAdminPermissions, controller.getPersonalDetails );
router.put( '/profile', authenticateUser, hasAdminPermissions, controller.editPersonalDetails );
router.post( '/register/staff', authenticateUser, hasAdminPermissions, controller.registerAdministratorOrRider );
router.post( '/assign-rider/:orderId', authenticateUser, hasAdminPermissions, controller.assignRidersToOrders );

module.exports = router;