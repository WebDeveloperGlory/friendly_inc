const { Router } = require('express');
const controller = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.get( '/profile', authenticateUser, controller.getProfile );
router.get( '/notifications', authenticateUser, controller.getUserNotifications );

router.get( '/favorites', authenticateUser,  controller.getUserFavorites );
router.post( '/favorites/add', authenticateUser, controller.addProductToFavorites );
router.post( '/favorites/remove', authenticateUser, controller.removeProductFromFavorites );

router.get( '/addresses', authenticateUser,  controller.getUserAddresses );
router.post( '/addresses/active', authenticateUser,  controller.setActiveAddress );
router.post( '/addresses/add', authenticateUser, controller.addAddress );
router.post( '/addresses/remove', authenticateUser, controller.deleteAddress );

router.get( '/cart', authenticateUser,  controller.getUserCart );
router.post( '/cart/add', authenticateUser, controller.addProductToCart );
router.post( '/cart/remove', authenticateUser, controller.deleteProductFromCart );
router.post( '/cart/increase', authenticateUser, controller.increaseCartItemQuantity );
router.post( '/cart/decrease', authenticateUser, controller.reduceCartItemQuantity );

router.get( '/order', authenticateUser,  controller.getUserOrders );
router.post( '/order', authenticateUser, controller.placeOrder );

router.get( '/cards', authenticateUser,  controller.getUserCards );
router.post( '/cards/add', authenticateUser, controller.addCard );
router.post( '/cards/remove', authenticateUser, controller.deleteCard );

module.exports = router;