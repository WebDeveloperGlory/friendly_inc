/**
 * @swagger
 * tags:
 *   - name: Product V2 - Management
 *     description: Version 2 of product management endpoints
 */

// ==================== PRODUCT CRUD OPERATIONS ==================== //

/**
 * @swagger
 * /product/v2:
 *   get:
 *     summary: Get all products (filterable by category)
 *     tags: [Product V2 - Management]
 *     parameters:
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *           enum: [restaurant, gadget store, super mart]
 *         description: Filter products by category
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                   example: All Products Acquired
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ProductV2"
 *       400:
 *         description: Invalid category
 */

/**
 * @swagger
 * /product/v2:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Product V2 - Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - product_name
 *               - normal_price
 *               - quantity
 *               - category
 *               - main_image
 *             properties:
 *               product_name:
 *                 type: string
 *                 example: Premium Headphones
 *               description:
 *                 type: string
 *                 example: Noise cancelling wireless headphones
 *               normal_price:
 *                 type: number
 *                 example: 199.99
 *               discounted_price:
 *                 type: number
 *                 example: 149.99
 *               quantity:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 enum: [restaurant, gadget store, super mart]
 *                 example: gadget store
 *               main_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: Product Created
 *                 data:
 *                   $ref: "#/components/schemas/ProductV2"
 *       400:
 *         description: Missing required fields or invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 */

/**
 * @swagger
 * /product/v2/{productId}:
 *   get:
 *     summary: Get single product details
 *     tags: [Product V2 - Management]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
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
 *                   example: Product Acquired
 *                 data:
 *                   $ref: "#/components/schemas/ProductV2"
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /product/v2/{productId}/update:
 *   post:
 *     summary: Update product details (Admin only)
 *     tags: [Product V2 - Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 example: Updated Headphones
 *               description:
 *                 type: string
 *                 example: Updated description
 *               normal_price:
 *                 type: number
 *                 example: 219.99
 *               discounted_price:
 *                 type: number
 *                 example: 179.99
 *               quantity:
 *                 type: integer
 *                 example: 60
 *               category:
 *                 type: string
 *                 enum: [restaurant, gadget store, super mart]
 *                 example: gadget store
 *               main_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: Product updated
 *                 data:
 *                   $ref: "#/components/schemas/ProductV2"
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /product/v2/{productId}/delete:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Product V2 - Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                   example: Product Deleted
 *                 data:
 *                   $ref: "#/components/schemas/ProductV2"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 *       404:
 *         description: Product not found
 */

// ==================== PRODUCT INVENTORY MANAGEMENT ==================== //

/**
 * @swagger
 * /product/v2/{productId}/quantity:
 *   put:
 *     summary: Update product quantity (Admin only)
 *     tags: [Product V2 - Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
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
 *                 minimum: 0
 *                 example: 100
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
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
 *                   example: Product Quantity Updated
 *                 data:
 *                   $ref: "#/components/schemas/ProductV2"
 *       400:
 *         description: Invalid quantity
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /product/v2/{productId}/status:
 *   put:
 *     summary: Update product status (Admin only)
 *     tags: [Product V2 - Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [available, out_of_stock, discontinued]
 *                 example: available
 *     responses:
 *       200:
 *         description: Product status updated successfully
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
 *                   example: Product Status Updated
 *                 data:
 *                   $ref: "#/components/schemas/ProductV2"
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductV2:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         product_name:
 *           type: string
 *           example: Premium Headphones
 *         description:
 *           type: string
 *           example: Noise cancelling wireless headphones
 *         normal_price:
 *           type: number
 *           example: 199.99
 *         discounted_price:
 *           type: number
 *           example: 149.99
 *         quantity:
 *           type: integer
 *           example: 50
 *         status:
 *           type: string
 *           enum: [available, out_of_stock, discontinued]
 *           example: available
 *         category:
 *           type: string
 *           enum: [restaurant, gadget store, super mart]
 *           example: gadget store
 *         main_image:
 *           $ref: "#/components/schemas/ProductImageV2"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 * 
 *     ProductImageV2:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         filename:
 *           type: string
 *           example: "headphones.jpg"
 *         path:
 *           type: string
 *           example: "https://res.cloudinary.com/example/image/upload/v123456789/headphones.jpg"
 *         mimetype:
 *           type: string
 *           example: "image/jpeg"
 *         size:
 *           type: integer
 *           example: 102400
 *         originalname:
 *           type: string
 *           example: "premium-headphones.jpg"
 *         width:
 *           type: integer
 *           example: 800
 *         height:
 *           type: integer
 *           example: 600
 *         cloudinaryId:
 *           type: string
 *           example: "image/upload/v123456789/headphones"
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */