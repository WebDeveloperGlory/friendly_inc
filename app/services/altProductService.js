const db = require('../config/db');
const imageService = require('./altImageService');

exports.getAllProducts = async ({ categoryName }) => {
    const allowedCategories = [ 'restaurant', 'gadget store', 'super mart' ];

    // Build filter
    const filter = {};
    if (categoryName && allowedCategories.includes(categoryName.toLowerCase())) {
        filter.category = categoryName.toLowerCase();
    }

    // Get all products
    const allProducts = await db.Product.find(filter)
        .populate({
            path: 'main_image',
            select: 'filename originalname path width height'
        });

    // Return success
    return { success: true, message: 'All Products Acquired', data: allProducts };
}

exports.getProductsByCategory = async ({ categoryName }) => {
    // Check if categoryName is correct
    const allowedCategories = [ 'restaurant', 'gadget store', 'super mart' ];
    if( !allowedCategories.includes( categoryName ) ) return { success: false, message: 'Invalid Category' };

    // Get all products
    const allProducts = await db.Product.find({ category: categoryName })
        .populate({
            path: 'main_image',
            select: 'filename originalname path width height'
        });

    // Return success
    return { success: true, message: 'All Products Acquired', data: allProducts };
}

exports.getSingleProduct = async ({ productId }) => {
    // Check if product exists
    const foundProduct = await db.Product.findById( productId )
        .populate({
            path: 'main_image',
            select: 'filename originalname path width height'
        });
    if( !foundProduct ) return { success: false, message: 'Invalid Product' }

    // Return success
    return { success: true, message: 'Product Acquired', data: foundProduct }
}

exports.createProduct = async ({ 
    product_name, description, 
    normal_price, discounted_price, 
    quantity, main_image, 
    category, 
}) => {
    // Validate required fields
    if ( !product_name || !normal_price || !quantity || !category || !main_image ) return { success: false, message: 'Missing required fields' };

    // Create product
    const newProduct = await db.Product.create({
        product_name,
        description,
        normal_price,
        discounted_price,
        quantity,
        main_image,
        category,
        status: quantity > 0 ? 'available' : 'out_of_stock'
    });

    // Return success
    return {
        success: true, 
        message: 'Product Created', 
        data: newProduct 
    };
}

exports.updateProduct = async (
    { productId }, 
    {
        product_name, description, 
        normal_price, discounted_price, 
        quantity, main_image, 
        category,
    }
) => {
    // Check if product exists
    const foundProduct = await db.Product.findById( productId );
    if( !foundProduct ) return { success: false, message: 'Invalid Product' };

    // Update product fields
    if( product_name ) foundProduct.product_name = product_name;
    if( description ) foundProduct.description = description;
    if( normal_price ) foundProduct.normal_price = normal_price;
    if( discounted_price ) foundProduct.discounted_price = discounted_price;
    if( quantity ) foundProduct.quantity = quantity;
    if( main_image ) foundProduct.main_image = main_image;
    if( category ) foundProduct.category = category;

    // Save product
    await foundProduct.save();

    // Return success
    return { success: true, message: 'Product updated', data: foundProduct };
}

exports.deleteProduct = async ({ productId }) => {
    // Check if product exists before deleting
    const productToDelete = await db.Product.findById(productId);
    if (!productToDelete) return { success: false, message: 'Invalid Product' };
    
    // Check if product had an image and delete it first
    if (productToDelete.main_image) {
        await imageService.deleteImage({ imageId: productToDelete.main_image });
    }
    
    // Now delete the product
    const deletedProduct = await db.Product.findByIdAndDelete(productId);

    // Return success
    return { success: true, message: 'Product Deleted', data: deletedProduct }
}

exports.updateProductQuantity = async ({ productId }, { quantity }) => {
    const updatedProduct = await db.Product.findByIdAndUpdate( 
        productId,
        { quantity },
        { new: true }
    );
    if( !updatedProduct ) return { success: false, message: 'Invalid Product' };

    // Return success
    return { success: true, message: 'Product Quantity Updated', data: updatedProduct }
}

exports.updateProductStatus = async ({ productId }, { status }) => {
    // Check if status is valid
    const allowedStatuses = ['available', 'out_of_stock', 'discontinued'];
    if( !allowedStatuses.includes( status ) ) return { success: false, message: 'Invalid Status' };

    // Check if product exists
    const updatedProduct = await db.Product.findByIdAndUpdate( 
        productId,
        { status },
        { new: true }
    );
    if( !updatedProduct ) return { success: false, message: 'Invalid Product' };

    // Return success
    return { success: true, message: 'Product Status Updated', data: updatedProduct }
}

module.exports = exports;