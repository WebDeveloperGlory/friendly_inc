/**
 * @swagger
 * tags:
 *   - name: Order - Management
 *     description: Order management operations
 */

// ==================== ORDER OPERATIONS ==================== //

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Order - Management]
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
 *                   example: Orders Acquired
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden (requires admin privileges)
 *
 *   post:
 *     summary: Place a new order and initialize payment
 *     tags: [Orders]
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
 *               - email
 *             properties:
 *               addressId:
 *                 type: string
 *                 description: ID of the shipping address
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email for payment receipt
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentInitializationResponse'
 *       400:
 *         description: Invalid input or payment initialization failed
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get specific order details
 *     tags: [Order - Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
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
 *                   example: Order Acquired
 *                 data:
 *                   $ref: "#/components/schemas/DetailedOrder"
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /order/{orderId}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Order - Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_status
 *             properties:
 *               order_status:
 *                 type: string
 *                 enum: [pending, shipped, delivered, cancelled, returned]
 *                 example: "shipped"
 *                 description: New status for the order
 *     responses:
 *       200:
 *         description: Order status updated successfully
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
 *                   example: Order Status Updated
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       400:
 *         description: Invalid status provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid Status
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden (requires admin privileges)
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         order_status:
 *           type: string
 *           enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'payment_failed']
 *         sum_total:
 *           type: number
 *         user_id:
 *           type: string
 *         address_id:
 *           type: string
 *         transaction_id:
 *           type: string
 *         transaction_reference:
 *           type: string
 *         transaction_status:
 *           type: string
 *           enum: ['completed', 'pending', 'failed']
 *         payment_attempts:
 *           type: number
 *         order_products:
 *           type: array
 *           items:
 *             type: string
 * 
 *     PaymentInitializationResponse:
 *       type: object
 *       properties:
 *         authorization_url:
 *           type: string
 *         access_code:
 *           type: string
 *         reference:
 *           type: string
 *         order_id:
 *           type: string
 * 
 *     DetailedOrder:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         user_id:
 *           $ref: "#/components/schemas/UserReference"
 *         address_id:
 *           $ref: "#/components/schemas/AddressReference"
 *         assigned_rider_id:
 *           $ref: "#/components/schemas/RiderReference"
 *         order_status:
 *           type: string
 *           enum: [pending, shipped, delivered, cancelled, returned]
 *           example: "shipped"
 *         order_products:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/DetailedOrderProduct"
 *         sum_total:
 *           type: number
 *           example: 149.99
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
 *           example: "507f1f77bcf86cd799439014"
 *         product_id:
 *           type: string
 *           example: "507f1f77bcf86cd799439015"
 *         quantity:
 *           type: integer
 *           example: 2
 *         product_price:
 *           type: number
 *           example: 74.99
 * 
 *     DetailedOrderProduct:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439014"
 *         product_id:
 *           $ref: "#/components/schemas/ProductReference"
 *         quantity:
 *           type: integer
 *           example: 2
 *         product_price:
 *           type: number
 *           example: 74.99
 * 
 *     UserReference:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 * 
 *     AddressReference:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439013"
 *         title:
 *           type: string
 *           example: "Home"
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
 * 
 *     RiderReference:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439016"
 *         name:
 *           type: string
 *           example: "Rider One"
 *         username:
 *           type: string
 *           example: "rider1"
 *         phone_number:
 *           type: string
 *           example: "+1234567890"
 * 
 *     ProductReference:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439015"
 *         product_name:
 *           type: string
 *           example: "Premium Headphones"
 *         description:
 *           type: string
 *           example: "Noise cancelling wireless headphones"
 *         status:
 *           type: string
 *           example: "available"
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
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /order/verify-payment:
 *   post:
 *     summary: Verify order payment
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - reference
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: ID of the order to verify
 *               reference:
 *                 type: string
 *                 description: Payment reference from Paystack
 *     responses:
 *       200:
 *         description: Payment verified and order processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Payment verification failed
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /order/paystack-webhook:
 *   post:
 *     summary: Paystack payment webhook handler
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Error processing webhook
 *       401:
 *         description: Unauthorized webhook call
 */