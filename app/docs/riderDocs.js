/**
 * @swagger
 * tags:
 *   - name: Rider - Dashboard
 *     description: Rider dashboard statistics and overview
 *   - name: Rider - Availability
 *     description: Rider availability management
 *   - name: Rider - Orders
 *     description: Rider order management operations
 */

// ==================== DASHBOARD OPERATIONS ==================== //

/**
 * @swagger
 * /rider/dashboard:
 *   get:
 *     summary: Get rider dashboard statistics
 *     tags: [Rider - Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
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
 *                   example: Dashboard Details Acquired
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalCompletedOrders:
 *                       type: integer
 *                       example: 150
 *                       description: Total completed orders in the system
 *                     totalRiderCompletedOrders:
 *                       type: integer
 *                       example: 25
 *                       description: Orders completed by this rider
 *                     totalRiderCancelledOrders:
 *                       type: integer
 *                       example: 3
 *                       description: Orders cancelled by this rider
 *                     recentNotifications:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Notification"
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */

// ==================== AVAILABILITY MANAGEMENT ==================== //

/**
 * @swagger
 * /rider/availability:
 *   put:
 *     summary: Update rider availability status
 *     tags: [Rider - Availability]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the rider is available for new orders
 *     responses:
 *       200:
 *         description: Availability updated successfully
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
 *                   example: Availability Updated
 *                 data:
 *                   $ref: "#/components/schemas/Rider"
 *       400:
 *         description: Invalid isActive value
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Rider not found
 *       500:
 *         description: Server error
 */

// ==================== ORDER MANAGEMENT ==================== //

/**
 * @swagger
 * /rider/orders:
 *   get:
 *     summary: Get all orders assigned to the rider
 *     tags: [Rider - Orders]
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
 *                   example: All Rider Orders Acquired
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /rider/orders/{orderId}:
 *   get:
 *     summary: Get specific order details
 *     tags: [Rider - Orders]
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
 *                   $ref: "#/components/schemas/Order"
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /rider/orders/{orderId}:
 *   post:
 *     summary: Cancel an order
 *     tags: [Rider - Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to cancel
 *     responses:
 *       200:
 *         description: Order cancelled successfully
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
 *                   example: Order Cancelled
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rider:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: Rider One
 *         username:
 *           type: string
 *           example: rider1
 *         phone_number:
 *           type: string
 *           example: "+1234567890"
 *         isActive:
 *           type: boolean
 *           example: true
 *         orders:
 *           type: array
 *           items:
 *             type: string
 *           example: ["507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"]
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
 *           example: "507f1f77bcf86cd799439013"
 *         assigned_rider_id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         order_status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *           example: "processing"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439015"
 *         title:
 *           type: string
 *           example: "New Order"
 *         message:
 *           type: string
 *           example: "Order #1234 has been placed"
 *         type:
 *           type: string
 *           example: "order"
 *         read:
 *           type: boolean
 *           example: false
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