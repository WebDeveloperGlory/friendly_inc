const db = require('../config/db')

exports.cancelOrder = async ({ orderId }) => {
    // Update order_status
    const updatedOrder = await db.Order.findByIdAndUpdate(
        orderId,
        { order_status: 'cancelled' },
        { new: true }
    );
    if( !updatedOrder ) return { success: false, message: 'Invalid Order' };

    // Return success
    return { success: true, message: 'Order Cancelled', data: updatedOrder };
}

module.exports = exports;