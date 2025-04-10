/**
 * @swagger
 * tags:
 *   - name: Admin - Dashboard
 *     description: Admin dashboard statistics and overview
 *   - name: Admin - Profile
 *     description: Admin profile management
 *   - name: Admin - Staff
 *     description: Administrator and rider management
 *   - name: Admin - Orders
 *     description: Order management operations
 */

// ==================== DASHBOARD OPERATIONS ==================== //

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin - Dashboard]
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
 *                     registeredRiders:
 *                       type: integer
 *                       example: 15
 *                     registeredUserCount:
 *                       type: integer
 *                       example: 250
 *                     registeredAdminCount:
 *                       type: integer
 *                       example: 5
 *                     totalOrders:
 *                       type: integer
 *                       example: 120
 *                     totalProducts:
 *                       type: integer
 *                       example: 45
 *                     totalItemsSold:
 *                       type: integer
 *                       example: 320
 *                     totalCancelledOrders:
 *                       type: integer
 *                       example: 8
 *                     totalCompletedOrders:
 *                       type: integer
 *                       example: 95
 *                     recentNotifications:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Notification"
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */

// ==================== PROFILE MANAGEMENT ==================== //

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     summary: Get admin personal details
 *     tags: [Admin - Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin details retrieved successfully
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
 *                   example: Admin Details Acquired
 *                 data:
 *                   $ref: "#/components/schemas/Admin"
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Admin not found
 */

/**
 * @swagger
 * /admin/profile:
 *   put:
 *     summary: Update admin personal details
 *     tags: [Admin - Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin_updated
 *               name:
 *                 type: string
 *                 example: John Smith
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Admin details updated successfully
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
 *                   example: Admin Details Updated
 *                 data:
 *                   $ref: "#/components/schemas/Admin"
 *       400:
 *         description: Username already taken
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Admin not found
 */

// ==================== STAFF MANAGEMENT ==================== //

/**
 * @swagger
 * /admin/register/staff:
 *   post:
 *     summary: Register new administrator or rider
 *     tags: [Admin - Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *               - task
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               username:
 *                 type: string
 *                 example: jane_rider
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               task:
 *                 type: string
 *                 enum: [administrator, rider]
 *                 example: rider
 *     responses:
 *       201:
 *         description: Staff member registered successfully
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
 *                   example: RIDER Created
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Jane Doe
 *                     username:
 *                       type: string
 *                       example: jane_rider
 *                     phone_number:
 *                       type: string
 *                       example: "+1234567890"
 *                     isActive:
 *                       type: string
 *                       example: "inapplicable"
 *       400:
 *         description: Invalid task or missing password
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */

// ==================== ORDER MANAGEMENT ==================== //

/**
 * @swagger
 * /admin/assign-rider/{orderId}:
 *   post:
 *     summary: Assign rider to an order
 *     tags: [Admin - Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to assign
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - riderId
 *             properties:
 *               riderId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Rider assigned successfully
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
 *                   example: Rider jane_rider, assigned to order 507f1f77bcf86cd799439011
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedOrder:
 *                       $ref: "#/components/schemas/Order"
 *                     updatedRider:
 *                       $ref: "#/components/schemas/Rider"
 *       400:
 *         description: Invalid order or rider ID
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: Admin User
 *         username:
 *           type: string
 *           example: admin_user
 *         phone_number:
 *           type: string
 *           example: "+1234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *     Rider:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
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
 * 
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439013"
 *         assigned_rider_id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
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