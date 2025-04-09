const { Router } = require('express');
const controller = require('../controllers/productController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.post(  '/', controller.createProduct ) ;

module.exports = router;