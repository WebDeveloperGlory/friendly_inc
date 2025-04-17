const db = require('../config/db');
const { sendAdminNotification, sendUserNotification } = require('../utils/notificationUtils');

exports.getAllRiders = async () => {
    // Get all riders
    const allRiders = await db.Rider.find();

    // Return success
    return { success: true, message: 'All Riders Acquired', data: allRiders }
}

exports.getRiderDetails = async ({ riderId }) => {
    // Check if rider exists
    const foundRider = await db.Rider.findById( riderId );
    if( !foundRider ) return { success: false, message: 'Invalid Rider' };

    // Return success 
    return { success: true, message: 'Rider Details Acquired', data: foundRider }
}

exports.getPersonalRiderDetails = async ({ riderId }) => {
    // Check if rider exists
    const foundRider = await db.Rider.findById( riderId );
    if( !foundRider ) return { success: false, message: 'Invalid Rider' };

    // Return success 
    return { success: true, message: 'Rider Details Acquired', data: foundRider }
}

exports.getRiderDashboard = async ({ userId }) => {
    // Check if user is a rider
    const foundRider = await db.Rider.findById( userId );
    if( !foundRider ) return { success: false, message: 'Unauthorized User' }

    const totalCompletedOrders = await db.Order.countDocuments({ order_status: 'delivered' });
    const totalRiderCompletedOrders = await db.Order.countDocuments({ order_status: 'delivered', assigned_rider_id: userId });
    const totalRiderCancelledOrders = await db.Order.countDocuments({ order_status: 'cancelled', assigned_rider_id: userId });

    const recentNotifications = await db.Notification.find({ target: 'rider', recipient_id: userId })
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

exports.getSpecificRiderOrder = async ({ orderId }, { userId }) => {
    // Check if order exists
    const foundOrder = await db.Order.findOne({ _id: orderId, assigned_rider_id: userId });
    if( !foundOrder ) return { success: false, message: 'Invalid Order' }

    // Return success
    return { success: true, message: 'Order Acquired', data: foundOrder }
}

exports.cancelOrder = async ({ orderId }, { userId }) => {
    // Update order_status
    const updatedOrder = await db.Order.findOneAndUpdate(
        { _id: orderId, assigned_rider_id: userId },
        { order_status: 'cancelled' },
        { new: true }
    );
    if( !updatedOrder ) return { success: false, message: 'Invalid Order' };

    // Get user name and rider name
    const rider = await db.Rider.findById( updatedOrder.assigned_rider_id ).select('username');
    const user = await db.User.findById( updatedOrder.user_id ).select('name');

    // Send admin and user notifications
    const title = 'Order Cancelled';
    const adminMessage = `${ user.name } Order Cancelled By ${ rider.username }`;
    const userMessage = `Order Cancelled By ${ rider.username }`;
    const type = 'Order';
    await sendAdminNotification({
        title, type,
        message: adminMessage
    });
    await sendUserNotification({
        title, type,
        message: userMessage,
        recipient_id: user._id,
    })

    // Return success
    return { success: true, message: 'Order Cancelled', data: updatedOrder };
}

exports.completeOrder = async ({ orderId }, { userId }) => {
    // Update order_status
    const updatedOrder = await db.Order.findOneAndUpdate(
        { _id: orderId, assigned_rider_id: userId },
        { order_status: 'delivered' },
        { new: true }
    );
    if( !updatedOrder ) return { success: false, message: 'Invalid Order' };

    // Get user name and rider name
    const rider = await db.Rider.findById( updatedOrder.assigned_rider_id ).select('username');
    const user = await db.User.findById( updatedOrder.user_id ).select('name');

    // Send admin and user notifications
    const title = 'Order Delivered';
    const adminMessage = `${ user.name } Order Delivered By ${ rider.username }`;
    const userMessage = `Order Delivered By ${ rider.username }`;
    const type = 'Order';
    await sendAdminNotification({
        title, type,
        message: adminMessage
    });
    await sendUserNotification({
        title, type,
        message: userMessage,
        recipient_id: user._id,
    })

    // Return success
    return { success: true, message: 'Order Completed', data: updatedOrder };
}

module.exports = exports;