const db = require('../config/db');

exports.getAllOrders = async () => {
    // Find all orders
    const allOrders = await db.Order.find()
        .populate([
            {
                path: 'order_products',
                populate: {
                    path: 'product_id',
                    select: 'product_name description main_image status',
                    populate: {
                        path: 'main_image',
                        select: 'filename originalname path width height'
                    }
                }
            },
        ]);

    // Return success
    return { success: true, message: 'Orders Acquired', data: allOrders };
}

exports.getOneOrder = async({ orderId }) => {
    // Check if order exists
    const foundOrder = await db.Order.findById( orderId )
        .populate([
            {
                path: 'user_id',
                select: 'username phone'
            },
            {
                path: 'address_id',
                select: 'title lat long location city state'
            },
            {
                path: 'assigned_rider_id',
                select: 'name username phone_number'
            },
            {
                path: 'order_products',
                populate: {
                    path: 'product_id',
                    select: 'product_name description main_image status',
                    populate: {
                        path: 'main_image',
                        select: 'filename originalname path width height'
                    }
                }
            },
        ]);
    if( !foundOrder ) return { success: false, message: 'Invalid Order' };

    // Return success
    return { success: true, message: 'Order Acquired', data: foundOrder };
}

exports.updateOrderStatus = async ({ orderId }, { order_status }) => {
    const allowedStatuses = ['pending', 'shipped', 'delivered', 'cancelled', 'returned']
    if( !allowedStatuses.includes( order_status ) ) return { success: false, message: 'Invalid Status' };

    // Update order status
    const updatedOrder = await db.Order.findByIdAndUpdate(
        orderId,
        { order_status },
        { new: true }
    );
    if( !updatedOrder ) return { success: false, message: 'Invalid Order' };

    // Return success
    return { success: true, message: 'Order Status Updated', data: updatedOrder };
}

module.exports = exports;