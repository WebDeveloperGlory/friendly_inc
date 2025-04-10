const { Router } = require('express');
const controller = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.post( '/initiate-signup', controller.initiateEnrollment );
router.post( '/complete-signup', controller.completeEnrollment );
router.post( '/login/user', controller.loginUser );
router.post( '/login/admin', controller.adminLogin );
router.post( '/login/rider', controller.riderLogin );
router.post( '/initiate-password-reset', controller.initiatePasswordReset)
router.post( '/complete-password-reset', controller.completePasswordReset);
router.post( '/change-password', authenticateUser, controller.changePassword );
router.post( '/generate-otp', authenticateUser, controller.resendOtp );
// router.post( '/register/seller', controller.registerSeller );
router.get( '/profile', authenticateUser, controller.getUserProfile );

module.exports = router;