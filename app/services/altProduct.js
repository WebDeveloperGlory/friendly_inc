const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const db = require('../config/db');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure temporary storage for processing before Cloudinary upload
const tempStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = 'uploads/temp';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'product-' + uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

// Create multer upload middleware
const upload = multer({
    storage: tempStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});

// Export the middleware for route handlers
exports.uploadProductImage = upload.single('main_image');

// Process and save image to database
exports.processAndSaveImage = async (file) => {
    try {
        if (!file) {
            throw new Error('No image file provided');
        }

        // Process the image with sharp
        const processedImagePath = file.path.replace(/\.\w+$/, '_processed$&');

        // Process the image
        const processedImage = await sharp(file.path)
            .resize(800)
            .jpeg({ quality: 80 })
            .toFile(processedImagePath);

        // Upload processed file to Cloudinary
        const cloudinaryResult = await cloudinary.uploader.upload(processedImagePath, {
            folder: 'products',
            resource_type: 'image'
        });

        // Create image record in database
        const imageRecord = await db.Image.create({
            filename: path.basename(cloudinaryResult.secure_url),
            path: cloudinaryResult.secure_url,
            mimetype: file.mimetype,
            size: cloudinaryResult.bytes,
            originalname: file.originalname,
            width: cloudinaryResult.width,
            height: cloudinaryResult.height,
            isProcessed: true,
            cloudinaryId: cloudinaryResult.public_id
        });

        // Delete temporary files
        fs.unlinkSync(file.path);
        fs.unlinkSync(processedImagePath);

        return imageRecord;
    } catch (error) {
        // Cleanup temporary files on error
        if (file && file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        if (fs.existsSync(file.path.replace(/\.\w+$/, '_processed$&'))) {
            fs.unlinkSync(file.path.replace(/\.\w+$/, '_processed$&'));
        }
        throw new Error(`Image processing failed: ${error.message}`);
    }
};

// Get image by ID
exports.getImageById = async ({ imageId }) => {
    // Check if image exists
    const image = await db.Image.findById(imageId);
    if (!image) return { success: false, message: 'Invalid Image' };

    return { success: true, message: 'Image Acquired', data: image };
};

exports.deleteImage = async ({ imageId }) => {
    // Check if image exists
    const image = await db.Image.findById(imageId);
    if (!image) return { success: false, message: 'Invalid Image' };

    // Delete from Cloudinary
    if (image.cloudinaryId) {
        await cloudinary.uploader.destroy(image.cloudinaryId);
    }

    // Delete from database
    await db.Image.findByIdAndDelete(imageId);

    // Return success
    return { success: true, message: 'Image deleted successfully' };
};

exports.updateImage = async ({ imageId }, newFile) => {
    // Check if image exists
    const image = await db.Image.findById(imageId);
    if (!image) return { success: false, message: 'Invalid Image' };

    // Process the new image
    const processedImage = await this.processAndSaveImage(newFile);

    // Delete the old image from Cloudinary
    if (image.cloudinaryId) {
        await cloudinary.uploader.destroy(image.cloudinaryId);
    }

    // Update the image record with new data
    image.filename = processedImage.filename;
    image.path = processedImage.path;
    image.mimetype = processedImage.mimetype;
    image.size = processedImage.size;
    image.originalname = processedImage.originalname;
    image.width = processedImage.width;
    image.height = processedImage.height;
    image.cloudinaryId = processedImage.cloudinaryId;

    await image.save();

    // Delete the temporary new image record
    await db.Image.findByIdAndDelete(processedImage._id);

    // Return success
    return { success: true, message: 'Image Updated successfully', data: image };
};

module.exports = exports;