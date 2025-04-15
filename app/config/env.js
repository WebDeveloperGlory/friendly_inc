require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    OTP_EXPIRATION: 600,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
}