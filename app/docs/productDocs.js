/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management endpoints
 */

// ==================== PRODUCT OPERATIONS ==================== //

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
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
 *                     $ref: "#/components/schemas/Product"
 */

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
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
 *                   $ref: "#/components/schemas/Product"
 *       404:
 *         description: Product not found
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
 *                   example: Invalid Product
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 example: "Smart Watch"
 *               description:
 *                 type: string
 *                 example: "Latest generation smart watch with health tracking features"
 *               normal_price:
 *                 type: number
 *                 format: float
 *                 example: 199.99
 *               discounted_price:
 *                 type: number
 *                 format: float
 *                 example: 149.99
 *               quantity:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 enum: [ 'restaurant', 'gadget store', 'super mart' ]
 *                 example: "gadget store"
 *               main_image:
 *                 type: string
 *                 format: binary
 *                 description: Product image file (JPEG, PNG)
 *             required:
 *               - product_name
 *               - normal_price
 *               - quantity
 *               - category
 *               - main_image
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
 *                   $ref: "#/components/schemas/Product"
 *       400:
 *         description: Invalid input or missing required fields
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
 *                   example: Missing required fields
 */

/**
 * @swagger
 * /product/{productId}/update:
 *   post:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 example: "Updated Smart Watch"
 *               description:
 *                 type: string
 *                 example: "Updated description with new features"
 *               normal_price:
 *                 type: number
 *                 format: float
 *                 example: 229.99
 *               discounted_price:
 *                 type: number
 *                 format: float
 *                 example: 179.99
 *               quantity:
 *                 type: integer
 *                 example: 75
 *               category:
 *                 type: string
 *                 enum: [ 'restaurant', 'gadget store', 'super mart' ]
 *                 example: "restaurant"
 *               main_image:
 *                 type: string
 *                 format: binary
 *                 description: New product image file (optional)
 *     responses:
 *       201:
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
 *                   $ref: "#/components/schemas/Product"
 *       404:
 *         description: Product not found
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
 *                   example: Invalid Product
 */

/**
 * @swagger
 * /product/{productId}/delete:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
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
 *                   $ref: "#/components/schemas/Product"
 *       404:
 *         description: Product not found
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
 *                   example: Invalid Product
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         product_name:
 *           type: string
 *           example: "Smart Watch"
 *         description:
 *           type: string
 *           example: "Latest generation smart watch with health tracking features"
 *         normal_price:
 *           type: number
 *           format: float
 *           example: 199.99
 *         discounted_price:
 *           type: number
 *           format: float
 *           example: 149.99
 *         quantity:
 *           type: integer
 *           example: 50
 *         status:
 *           type: string
 *           enum: [available, out_of_stock]
 *           example: "available"
 *         main_image:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "507f1f77bcf86cd799439013"
 *             filename:
 *               type: string
 *               example: "product-1617781234567-123456789_processed.jpg"
 *             originalname:
 *               type: string
 *               example: "smartwatch.jpg"
 *             path:
 *               type: string
 *               example: "uploads/products/product-1617781234567-123456789_processed.jpg"
 *             width:
 *               type: integer
 *               example: 800
 *             height:
 *               type: integer
 *               example: 600
 *         category:
 *           type: string
 *           example: "gadget store"
 *           enum: [ 'restaurant', 'gadget store', 'super mart' ]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *     
 *     Image:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439013"
 *         filename:
 *           type: string
 *           example: "product-1617781234567-123456789_processed.jpg"
 *         path:
 *           type: string
 *           example: "uploads/products/product-1617781234567-123456789_processed.jpg"
 *         mimetype:
 *           type: string
 *           example: "image/jpeg"
 *         size:
 *           type: integer
 *           example: 153024
 *         originalname:
 *           type: string
 *           example: "smartwatch.jpg"
 *         width:
 *           type: integer
 *           example: 800
 *         height:
 *           type: integer
 *           example: 600
 *         isProcessed:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 */