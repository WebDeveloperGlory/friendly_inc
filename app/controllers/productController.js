const productService = require('../services/productService');
const imageService = require('../services/imageService');
const { success, error, serverError } = require('../utils/responseUtils');

// Create a new product with image
exports.createProduct = async ( req, res ) => {
    try {
        // Use multer middleware to handle the file upload
        imageService.uploadProductImage( req, res, async function(err) {
            if ( err ) return error( res, `Upload error: ${err.message}` );
  
            try {
                // Check if file exists
                if ( !req.file ) return error( res, `Product Image Required` );
        
                // Process the uploaded image and save to database
                const imageRecord = await imageService.processAndSaveImage( req.file );
        
                // Extract product data from request
                const { 
                    product_name, 
                    description, 
                    normal_price, 
                    discounted_price, 
                    quantity, 
                    category 
                } = req.body;
        
                // Create the product with processed image reference
                const result = await productService.createProduct({
                    product_name,
                    description,
                    normal_price: parseFloat(normal_price),
                    discounted_price: discounted_price ? parseFloat(discounted_price) : undefined,
                    quantity: parseInt(quantity),
                    main_image: imageRecord._id, // Use the image document ID
                    category
                });
    
                if ( result.success ) {
                    return success( res, result.message, result.data, 201 );
                }
                return error( res, result.message );
            } catch ( err ) {
                serverError( res, err );
            }
        });
    } catch ( err ) {
        return serverError( res, err );
    }
};

module.exports = exports;