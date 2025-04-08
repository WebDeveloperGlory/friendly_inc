const db = require('../config/db')

exports.getRiderDashboard = async ({ userId }) => {
    // Check if user is a rider
    const foundRider = await db.Rider.findById( userId );
    if( !foundRider ) return { success: false, message: 'Unauthorized User' }

    const totalCompletedOrders = await db.Order.countDocuments({ order_status: 'delivered' });
    const totalRiderCompletedOrders = await db.Order.countDocuments({ order_status: 'delivered', assigned_rider_id: userId });
    const totalRiderCancelledOrders = await db.Order.countDocuments({ order_status: 'cancelled', assigned_rider_id: userId });

    const recentNotifications = await db.Notification.find()
        .sort()
        .limit( 5 );

    return { 
        success: true, 
        message: 'Dashboard Details Acquired',
        data: {
            totalCompletedOrders,
            totalRiderCompletedOrders,
            totalRiderCancelledOrders,
            recentNotifications
        }
    }
}

exports.setAvailability = async ({ userId }, { isActive }) => {
    // Check if isActive is boolean
    if( typeof isActive !== "boolean" ) return { success: false, message: 'Invalid isActive value' };

    // Update rider status
    const updatedRider = await db.Rider.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true }
    ).select('-password');
    if( !updatedRider ) return { success: false, message: 'Invalid Rider' }

    // Return success
    return { success: true, message: 'Availability Updated', data: updatedRider }
}

exports.getAllRiderOrders = async ({ userId }) => {
    // Get all rider orders
    const allRiderOrder = await db.Order.find({ assigned_rider_id: userId });

    // Return succcess
    return { success: true, message: 'All Rider Orders Acquired', data: allRiderOrder }
}

exports.getSpecificRiderOrder = async ({ orderId }) => {
    // Check if order exists
    const foundOrder = await db.Order.findById( orderId );
    if( !foundOrder ) return { success: false, message: 'Invalid Order' }

    // Return success
    return { success: true, message: 'Order Acquired', data: foundOrder }
}

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