const db = require('../config/db');

exports.getAdminDashboardDetails = async () => {
    const registeredUserCount = await db.User.countDocuments();
    const registeredAdminCount = await db.Admin.countDocuments();
    const registeredRiders = await db.Rider.countDocuments();
    const totalOrders = await db.Order.countDocuments();
    const totalItemsSold = await db.OrderProduct.countDocuments();
    const totalProducts = await db.Product.countDocuments();
    const totalCancelledOrders = await db.Order.countDocuments({ order_status: 'cancelled' });
    const totalCompletedOrders = await db.Order.countDocuments({ order_status: 'delivered' });

    const recentNotifications = await db.Notification.find()
        .sort({})
        .limit( 5 );

    // Return success
    return { 
        success: true, 
        message: 'Dashboard Details Acquired', 
        data: {
            registeredRiders,
            registeredUserCount,
            registeredAdminCount,
            totalOrders,
            totalProducts,
            totalItemsSold,
            totalCancelledOrders,
            totalCompletedOrders,
            recentNotifications
        }
    }
}

exports.assignRidersToOrders = async ({ orderId }, { riderId }) => {
    // Check if order exists
    const foundOrder = await db.Order.findById( orderId );
    if( !foundOrder ) return { success: false, message: 'Invalid Order' }

    // Check if rider exists
    const foundRider = await db.Rider.findById( riderId );
    if( !foundRider ) return { success: false, message: 'Invalid Rider' }

    // Update order rider
    const updatedOrder = await db.Order.findByIdAndUpdate(
        orderId,
        { assigned_rider_id: riderId },
        { new: true }
    );
    const updatedRider = await db.Rider.findByIdAndUpdate(
        riderId,
        { $addToSet: { orders: orderId } },
        { new: true }
    );

    // Return success
    return { 
        success: true, 
        message: `Rider ${ foundRider.username }, assigned to order ${ foundOrder._id }`,
        data: {
            updatedOrder,
            updatedRider
        }
    }
}

exports.getPersonalDetails = async ({ userId }) => {
    // Get admin details
    const foundAdmin = await db.Admin.findById( userId ).select('-password');
    if( !foundAdmin ) return { success: false, message: 'Invalid Admin' };

    // Return success
    return { success: true, message: 'Admin Details Acquired', data: foundAdmin}
}
exports.editPersonalDetails = async ({ userId }, { username, name, phone_number }) => {
    // Check if admin exists
    const foundAdmin = await db.Admin.findById({ userId }).select('-password');
    if( !foundAdmin ) return { success: false, message: 'Invalid Admin' };

    // Check if username already taken
    const existingUsername = await db.Admin.findOne({ username });
    if( existingUsername ) return { success: false, message: 'Username Already Taken' };

    // Update admin based on request body
    if( username ) foundAdmin.username = username;
    if( name ) foundAdmin.name = name;
    if( phone_number ) foundAdmin.phone_number = phone_number;

    // Save document
    await foundAdmin.save();

    // Return success
    return { success: true, message: 'Admin Details Updated', data: foundAdmin }
}

exports.registerAdministratorOrRider = async ({ name, username, email, password, phone_number, task }) => {
    // Define accepted tasks and check if task was passed in
    const acceptedTasks = ['administrator', 'rider']
    if( !task || !acceptedTasks.includes( task ) ) return { success: false, message: 'Invalid Task' };

    // Check if user passed in a password
    if( !password ) return { success: false, message: 'Password Required' }

    // Check task and register accordingly
    let registeredUser;

    if( task === 'administrator' ) {
        registeredUser = await db.Admin.create({ name, email, username, phone_number });
        registeredUser.password = password;
        await registeredUser.save();
    } else if( task === 'rider' ) {
        registeredUser = await db.Rider.create({ name, email, username, phone_number });
        registeredUser.password = password;
        await registeredUser.save();
    }

    const user = {
        name: registeredUser.name, 
        username: registeredUser.username, 
        phone_number: registeredUser.phone_number,
        isActive: task === 'rider' ? registeredUser.isActive : 'inapplicable'
    }

    // Return success
    return { success: true, message: `${ task.toUpperCase() } Created`, data: user };
}

module.exports = exports;