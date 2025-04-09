const { Router } = require('express');
const controller = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.get( '/profile', authenticateUser, controller.getProfile );

router.get( '/favorites', authenticateUser,  controller.getUserFavorites );
router.post( '/favorites/add', authenticateUser, controller.addProductToFavorites );
router.post( '/favorites/remove', authenticateUser, controller.removeProductFromFavorites );

router.get( '/addresses', authenticateUser,  controller.getUserAddresses );
router.post( '/addresses/add', authenticateUser, controller.addAddress );

router.get( '/cart', authenticateUser,  controller.getUserCart );
router.post( '/cart/add', authenticateUser, controller.addProductToCart );
router.post( '/cart/remove', authenticateUser, controller.deleteProductFromCart );

module.exports = router;