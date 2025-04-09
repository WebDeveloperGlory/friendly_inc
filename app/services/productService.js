const db = require('../config/db');

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

exports.updateProduct = async ({ productId }, { }) => {

}

exports.deleteProduct = async ({ productId }) => {
    // Delete product
    const deletedProduct = await db.Product.findByIdAndDelete( productId );
    if( !deletedProduct ) return { success: false, message: 'Invalid Product' }

    // Return success
    return { success: true, message: 'Product Deleted', data: deletedProduct }
}

module.exports = exports;