/**
 * @swagger
 * tags:
 *   - name: User - Profile
 *     description: User profile management
 *   - name: User - Favorites
 *     description: User favorite products management
 *   - name: User - Addresses
 *     description: User address management
 *   - name: User - Cart
 *     description: User shopping cart operations
 *   - name: User - Orders
 *     description: User order management
 */

// ==================== PROFILE MANAGEMENT ==================== //

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile details
 *     tags: [User - Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Details Acquired
 *                 data:
 *                   $ref: "#/components/schemas/User"
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 */

// ==================== FAVORITES MANAGEMENT ==================== //

/**
 * @swagger
 * /user/favorites:
 *   get:
 *     summary: Get user's favorite products
 *     tags: [User - Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Favorites Acquired
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/favorites/add:
 *   post:
 *     summary: Add product to favorites
 *     tags: [User - Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to add to favorites
 *     responses:
 *       200:
 *         description: Product added to favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product Added To Favorites
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Array of favorite product IDs
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/favorites/remove:
 *   post:
 *     summary: Remove product from favorites
 *     tags: [User - Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove from favorites
 *     responses:
 *       200:
 *         description: Product removed from favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product Removed From Favorites
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Updated array of favorite product IDs
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized access
 */

// ==================== ADDRESS MANAGEMENT ==================== //

/**
 * @swagger
 * /user/addresses:
 *   get:
 *     summary: Get user's saved addresses
 *     tags: [User - Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Addresses Acquired
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Address"
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/addresses/add:
 *   post:
 *     summary: Add new address
 *     tags: [User - Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - lat
 *               - long
 *               - location
 *               - city
 *               - state
 *             properties:
 *               title:
 *                 type: string
 *                 example: Home
 *               lat:
 *                 type: number
 *                 example: 40.7128
 *               long:
 *                 type: number
 *                 example: -74.0060
 *               location:
 *                 type: string
 *                 example: 123 Main St
 *               city:
 *                 type: string
 *                 example: New York
 *               state:
 *                 type: string
 *                 example: NY
 *     responses:
 *       200:
 *         description: Address added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Address Added Successfully
 *                 data:
 *                   $ref: "#/components/schemas/Address"
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized access
 */

// ==================== CART MANAGEMENT ==================== //

/**
 * @swagger
 * /user/cart:
 *   get:
 *     summary: Get user's shopping cart
 *     tags: [User - Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cart Items Acquired
 *                 data:
 *                   $ref: "#/components/schemas/Cart"
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [User - Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to add to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cart Updated
 *                 data:
 *                   $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Invalid product ID or quantity
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/cart/remove:
 *   post:
 *     summary: Remove product from cart
 *     tags: [User - Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove from cart
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product removed from cart
 *                 data:
 *                   $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Product not found in cart
 *       401:
 *         description: Unauthorized access
 */

// ==================== CART QUANTITY MANAGEMENT ==================== //

/**
 * @swagger
 * /user/cart/increase:
 *   post:
 *     summary: Increase product quantity in cart
 *     tags: [User - Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to increase quantity
 *     responses:
 *       200:
 *         description: Product quantity increased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Quantity increased
 *                 data:
 *                   $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               noCart:
 *                 value:
 *                   success: false
 *                   message: Cart not found
 *               noProduct:
 *                 value:
 *                   success: false
 *                   message: Product not found in cart
 *               insufficientStock:
 *                 value:
 *                   success: false
 *                   message: Cannot increase quantity. Maximum available: 5
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/cart/decrease:
 *   post:
 *     summary: Decrease product quantity in cart
 *     tags: [User - Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to decrease quantity
 *     responses:
 *       200:
 *         description: Product quantity decreased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Quantity reduced
 *                 data:
 *                   $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               noCart:
 *                 value:
 *                   success: false
 *                   message: Cart not found
 *               noProduct:
 *                 value:
 *                   success: false
 *                   message: Product not found in cart
 *       401:
 *         description: Unauthorized access
 */

// ==================== ORDER MANAGEMENT ==================== //

/**
 * @swagger
 * /user/order:
 *   get:
 *     summary: Get user's orders
 *     tags: [User - Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Orders Acquired
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/order:
 *   post:
 *     summary: Place a new order
 *     tags: [User - Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addressId
 *             properties:
 *               addressId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439013"
 *                 description: ID of the address to use for this order
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order Created
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               noCart:
 *                 value:
 *                   success: false
 *                   message: Invalid Cart
 *               emptyCart:
 *                 value:
 *                   success: false
 *                   message: No Items In Cart
 *               invalidAddress:
 *                 value:
 *                   success: false
 *                   message: Invalid Address
 *               insufficientStock:
 *                 value:
 *                   success: false
 *                   message: Insufficient stock for Product X. Only 2 available.
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         username:
 *           type: string
 *           example: johndoe
 *         phone_number:
 *           type: string
 *           example: "+1234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         product_name:
 *           type: string
 *           example: Premium Headphones
 *         normal_price:
 *           type: number
 *           example: 199.99
 *         discounted_price:
 *           type: number
 *           example: 149.99
 *         main_image:
 *           $ref: "#/components/schemas/ProductImage"
 * 
 *     ProductImage:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           example: "headphones.jpg"
 *         originalname:
 *           type: string
 *           example: "premium-headphones.jpg"
 *         path:
 *           type: string
 *           example: "/uploads/products/headphones.jpg"
 *         width:
 *           type: integer
 *           example: 800
 *         height:
 *           type: integer
 *           example: 600
 * 
 *     Address:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439013"
 *         title:
 *           type: string
 *           example: Home
 *         lat:
 *           type: number
 *           example: 40.7128
 *         long:
 *           type: number
 *           example: -74.0060
 *         location:
 *           type: string
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           example: "New York"
 *         state:
 *           type: string
 *           example: "NY"
 *         user:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439014"
 *         user:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         cartItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 $ref: "#/components/schemas/Product"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *         total:
 *           type: number
 *           example: 299.98
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439015"
 *         user_id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         address_id:
 *           type: string
 *           example: "507f1f77bcf86cd799439013"
 *         order_status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *           example: "pending"
 *         order_products:
 *           type: array
 *           items:
 *             type: string
 *           example: ["507f1f77bcf86cd799439016", "507f1f77bcf86cd799439017"]
 *         sum_total:
 *           type: number
 *           example: 299.98
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *     OrderProduct:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439016"
 *         order_id:
 *           type: string
 *           example: "507f1f77bcf86cd799439015"
 *         product_id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         quantity:
 *           type: integer
 *           example: 2
 *         product_price:
 *           type: number
 *           example: 149.99
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */