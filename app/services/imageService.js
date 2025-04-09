const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const db = require('../config/db'); // Adjust path as needed

// Configure storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = 'uploads/products';
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
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});

// Export the middleware for route handlers
exports.uploadProductImage = upload.single('main_image');

// Process and save image to database
exports.processAndSaveImage = async ( file ) => {
    try {
        if (!file) {
        throw new Error('No image file provided');
        }

        // Process the image with sharp
        const processedImagePath = file.path.replace(/\.\w+$/, '_processed$&');
        
        const processedImage = await sharp(file.path)
            .resize(800)
            .jpeg({ quality: 80 })
            .toFile(processedImagePath);
        
        // Create image record in database
        const imageRecord = await db.Image.create({
            filename: path.basename(processedImagePath),
            path: processedImagePath,
            mimetype: file.mimetype,
            size: file.size,
            originalname: file.originalname,
            width: processedImage.width,
            height: processedImage.height,
            isProcessed: true
        });
            
            // Optional: Delete original unprocessed image
            // fs.unlinkSync(file.path);
            
        return imageRecord;
    } catch (error) {
        throw new Error(`Image processing failed: ${error.message}`);
    }
};
    
// Get image by ID
exports.getImageById = async ({ imageId }) => {
    // Check if image exists
    const image = await db.Image.findById( imageId );
    if ( !image ) return { success: false, message: 'Invalid Image' }

    return { success: true, message: 'Image Acquired', data: image }
};
  
exports.deleteImage = async ({ imageId }) => {
    // Check if image exists
    const image = await db.Image.findById( imageId );
    if ( !image ) return { success: false, message: 'Invalid Image' }
      
    // Delete file from filesystem
    if ( fs.existsSync( image.path ) ) {
        fs.unlinkSync( image.path );
    }
      
    // Delete from database
    await db.Image.findByIdAndDelete( imageId );
      
    // Return success
    return { success: true, message: 'Image deleted successfully' };
};
  
exports.updateImage = async ({ imageId }, newFile ) => {
    // Check if image exists
    const image = await db.Image.findById( imageId );
    if ( !image ) return { success: false, message: 'Invalid Image' }

    // Process the new image
    const processedImage = await this.processAndSaveImage( newFile );
      
    // Delete the old image file
    if (fs.existsSync( image.path )) {
        fs.unlinkSync( image.path );
    }
      
    // Update the image record with new data
    image.filename = processedImage.filename;
    image.path = processedImage.path;
    image.mimetype = processedImage.mimetype;
    image.size = processedImage.size;
    image.originalname = processedImage.originalname;
    image.width = processedImage.width;
    image.height = processedImage.height;
    
    await image.save();
      
    // Delete the temporary new image record
    await db.Image.findByIdAndDelete( processedImage._id );
      
    // Return success
    return { success: true, message: 'Image Updated successfully', data: image };
};