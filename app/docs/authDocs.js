/**
 * @swagger
 * tags:
 *   - name: Authentication (Public)
 *     description: Public authentication endpoints
 *   - name: Authentication (User)
 *     description: Authenticated user endpoints
 */

// ### Public Routes (No Authentication Required) ### //

/**
 * @swagger
 * /auth/initiate-signup:
 *   post:
 *     summary: Start user sign-up by generating an OTP
 *     tags: [Authentication (Public)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane@example.com"
 *     responses:
 *       200:
 *         description: OTP sent to email
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "OTP sent to email"
 *               data: "123456"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /auth/complete-signup:
 *   post:
 *     summary: Complete sign-up using OTP and create a user account
 *     tags: [Authentication (Public)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - email
 *               - password
 *               - username
 *               - gender
 *               - phone
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               email:
 *                 type: string
 *                 example: "jane@example.com"
 *               password:
 *                 type: string
 *                 example: "JaneStrongPass123!"
 *               gender:
 *                 type: string
 *                 example: "female"
 *               username:
 *                 type: string
 *                 example: "janedoe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "User Registered Successfully"
 *               data:
 *                 id: "abc123"
 *                 username: "janedoe"
 *                 email: "jane@example.com"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /auth/register/seller:
 *   post:
 *     summary: Register a seller account
 *     tags: [Authentication (Public)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - personal_phone
 *               - personal_email
 *               - personal_name
 *               - store_name
 *               - public_phone
 *               - public_email
 *               - physical_location
 *               - store_category
 *             properties:
 *               personal_phone:
 *                 type: string
 *                 example: "+1234567890"
 *               personal_email:
 *                 type: string
 *                 example: "seller@example.com"
 *               personal_name:
 *                 type: string
 *                 example: "Alice Seller"
 *               store_name:
 *                 type: string
 *                 example: "Alice’s Store"
 *               public_phone:
 *                 type: string
 *                 example: "+0987654321"
 *               public_email:
 *                 type: string
 *                 example: "store@example.com"
 *               physical_location:
 *                 type: string
 *                 example: "123 Main Street"
 *               store_category:
 *                 type: string
 *                 enum: ['resturant', 'fashion', 'electronics', 'groceries', 'skincare']
 *                 example: "electronics"
 *     responses:
 *       200:
 *         description: Seller account created
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "Seller Account Created"
 *               data:
 *                 id: "seller123"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Authentication (Public)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "jane@example.com"
 *               password:
 *                 type: string
 *                 example: "JaneStrongPass123!"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "User Logged In"
 *               data:
 *                 token: "jwt.token.here"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */


// ### Authenticated Routes (Require JWT) ### //

/**
 * @swagger
 * /auth/complete-password-reset:
 *   post:
 *     summary: Complete password reset using OTP
 *     tags: [Authentication (User)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "NewPassword123!"
 *               confirmNewPassword:
 *                 type: string
 *                 example: "NewPassword123!"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "Password Reset Successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change current user's password
 *     tags: [Authentication (User)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "OldPass123!"
 *               newPassword:
 *                 type: string
 *                 example: "NewPass456!"
 *               confirmNewPassword:
 *                 type: string
 *                 example: "NewPass456!"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "Password Changed Successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /auth/generate-otp:
 *   post:
 *     summary: Generate a new OTP
 *     tags: [Authentication (User)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP generated
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "OTP generated"
 *               data: "654321"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Retrieve current user's profile
 *     tags: [Authentication (User)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *         content:
 *           application/json:
 *             example:
 *               code: "00"
 *               message: "User Acquired"
 *               data:
 *                 id: "abc123"
 *                 username: "janedoe"
 *                 email: "jane@example.com"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */