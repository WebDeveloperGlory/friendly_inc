const productService = require('../services/altProductService');
const imageService = require('../services/altImageService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAllProducts(req.query);

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
}

exports.getProductsByCategory = async (req, res) => {
    try {
        const result = await productService.getProductsByCategory(req.params);

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
}

exports.getSingleProduct = async (req, res) => {
    try {
        const result = await productService.getSingleProduct(req.params);

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
}

exports.createProduct = async (req, res) => {
    try {
        // Use multer middleware to handle the file upload
        imageService.uploadProductImage(req, res, async function(err) {
            if (err) return error(res, `Upload error: ${err.message}`);

            try {
                // Check if file exists
                if (!req.file) return error(res, `Product Image Required`);

                // Process the uploaded image and save to database with Cloudinary
                const imageRecord = await imageService.processAndSaveImage(req.file);

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

                if (result.success) {
                    return success(res, result.message, result.data, 201);
                }
                return error(res, result.message);
            } catch (err) {
                // If there's an error, ensure we handle cleanup if needed
                serverError(res, err);
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        // Process the image upload first if file is included
        imageService.uploadProductImage(req, res, async function(err) {
            if (err) return error(res, `Upload error: ${err.message}`);

            try {
                const { product_name, description, normal_price, discounted_price, quantity, category } = req.body;
                
                // Get current product to check if it exists
                const currentProduct = await productService.getSingleProduct(req.params);
                if (!currentProduct.success) {
                    return error(res, currentProduct.message, 404);
                }

                // Prepare update data
                const updateData = {
                    product_name,
                    description,
                    normal_price: normal_price ? parseFloat(normal_price) : undefined,
                    discounted_price: discounted_price ? parseFloat(discounted_price) : undefined,
                    quantity: quantity ? parseInt(quantity) : undefined,
                    category
                };

                // If there's a new image file
                if (req.file) {
                    // Process the new image with Cloudinary
                    const imageRecord = await imageService.processAndSaveImage(req.file);
                    
                    // Add the new image ID to the update data
                    updateData.main_image = imageRecord._id;
                    
                    // Delete the old image if it exists (handled in productService.updateProduct)
                }

                // Update the product with all data
                const result = await productService.updateProduct(req.params, updateData);

                if (result.success) {
                    return success(res, result.message, result.data, 200);
                }
                return error(res, result.message);
            } catch (err) {
                return serverError(res, err);
            }
        });
    } catch (err) {
        return serverError(res, err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params);

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
}

exports.updateProductQuantity = async (req, res) => {
    try {
        const result = await productService.updateProductQuantity(req.params, req.body);

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
}

exports.updateProductStatus = async (req, res) => {
    try {
        const result = await productService.updateProductStatus(req.params, req.body);

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
}

module.exports = exports;