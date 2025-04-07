const { Router } = require('express');
const controller = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.post( '/initiate-signup', controller.initiateEnrollment );
router.post( '/complete-signup', controller.completeEnrollment );
router.post( '/register/seller', controller.registerSeller );
router.post( '/login', controller.loginUser );
router.post( '/complete-password-reset', authenticateUser, controller.completePasswordReset);
router.post( '/change-password', authenticateUser, controller.changePassword );
router.post( '/generate-otp', authenticateUser, controller.resendOtp );
router.get( '/profile', authenticateUser, controller.getUserProfile );

module.exports = router;