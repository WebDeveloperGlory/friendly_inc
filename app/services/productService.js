const db = require('../config/db');
const imageService = require('./imageService');

exports.getAllProducts = async () => {
    // Get all products
    const allProducts = await db.Product.find()
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
    // Delete product
    const deletedProduct = await db.Product.findByIdAndDelete( productId );
    if( !deletedProduct ) return { success: false, message: 'Invalid Product' };

    // Check if product had an image
    if( deletedProduct.main_image ) {
        await imageService.deleteImage( deletedProduct.main_image )
    }

    // Return success
    return { success: true, message: 'Product Deleted', data: deletedProduct }
}

module.exports = exports;