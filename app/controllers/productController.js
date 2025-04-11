const productService = require('../services/productService');
const imageService = require('../services/imageService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getAllProducts = async ( req, res ) => {
    try {
        const result = await productService.getAllProducts( req.query );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getProductsByCategory = async ( req, res ) => {
    try {
        const result = await productService.getProductsByCategory( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getSingleProduct = async ( req, res ) => {
    try {
        const result = await productService.getSingleProduct( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

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

// Update product
exports.updateProduct = async ( req, res ) => {
    console.log( req.body )
    try {
        const { product_name, description, normal_price, discounted_price, quantity, category } = req.body;
        
        // If there's a new image file
        if ( req.file ) {
            imageService.uploadProductImage(req, res, async function(err) {
                if ( err ) return error( res, `Upload error: ${err.message}` );
            
                try {
                    // Get current product to get the old image ID
                    const currentProduct = await productService.getSingleProduct( req.params );
                    if ( !currentProduct.success ) {
                        return error( res, currentProduct.message, 404 )
                    }
                    
                    // Process the new image
                    const imageRecord = await imageService.processAndSaveImage(req.file);
                    
                    // Delete the old image if it exists
                    if ( currentProduct.data.main_image ) {
                        await imageService.deleteImage( currentProduct.data.main_image._id );
                    }
                    
                    // Update the product with the new image and other data
                    const result = await productService.updateProduct( req.params, {
                        product_name,
                        description,
                        normal_price: parseFloat(normal_price),
                        discounted_price: discounted_price ? parseFloat(discounted_price) : null,
                        quantity: parseInt(quantity),
                        main_image: imageRecord._id,
                        category
                    });
                    
                    if ( result.success ) {
                        return success( res, result.message, result.data, 201 );
                    }
                    return error( res, result.message );
                } catch ( err ) {
                    return serverError( res, err )
                }
            });
        } else {
            // No new image, just update the other fields
            const result = await productService.updateProduct( 
                req.params, 
                {
                    product_name,
                    description,
                    normal_price: parseFloat(normal_price),
                    discounted_price: discounted_price ? parseFloat(discounted_price) : undefined,
                    quantity: parseInt(quantity),
                    category
                }
            );
            
            if ( result.success ) {
                return success( res, result.message, result.data, 201 );
            }
            return error( res, result.message );
        }
    } catch ( err ) {
        return serverError( res, err );
    }
};

exports.deleteProduct = async ( req, res ) => {
    try {
        const result = await productService.deleteProduct( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.updateProductQuantity = async ( req, res ) => {
    try {
        const result = await productService.updateProductQuantity( req.params, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.updateProductStatus = async ( req, res ) => {
    try {
        const result = await productService.updateProductStatus( req.params, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;