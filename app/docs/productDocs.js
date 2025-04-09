/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product management endpoints
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product with image upload
 *     tags: [Product]
 *     consumes:
 *       - multipart/form-data
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
 *               - main_image
 *               - category
 *             properties:
 *               product_name:
 *                 type: string
 *                 example: "Wireless Mouse"
 *               description:
 *                 type: string
 *                 example: "A smooth and responsive wireless mouse"
 *               normal_price:
 *                 type: number
 *                 format: float
 *                 example: 25.99
 *               discounted_price:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               quantity:
 *                 type: integer
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "gadget store"
 *                 enum: [ 'restaurant', 'gadget store', 'super mart' ]
 *               main_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "Product Created"
 *               data:
 *                 _id: "abc123"
 *                 product_name: "Wireless Mouse"
 *                 description: "A smooth and responsive wireless mouse"
 *                 normal_price: 25.99
 *                 discounted_price: 19.99
 *                 quantity: 100
 *                 category: "gadget store"
 *                 main_image: "image123"
 *                 status: "available"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               code: "01"
 *               message: "Missing required fields"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               code: "99"
 *               message: "An unexpected error occurred"
 */