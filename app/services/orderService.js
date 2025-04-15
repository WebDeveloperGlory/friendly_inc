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

exports.handleWebhook = async (payload) => {
    const event = payload.event;
    const data = payload.data;

    if (event === 'charge.success') {
        const order = await db.Order.findOne({ transaction_reference: data.reference });
        if (!order) {
            return { success: false, message: 'Order not found' };
        }

        // Update order status based on successful payment
        order.transaction_status = 'completed';
        order.order_status = 'processing'; // Ready for fulfillment
        await order.save();

        // Process order items (similar to verifyOrderPayment)
        const userCart = await db.Cart.findOne({ user: order.user_id });

        const updateOrderProducts = userCart.cartItems.map(async (item) => {
            const foundProduct = await db.Product.findById(item.product).select('product_name quantity discounted_price normal_price');

            const createdOrderProduct = await db.OrderProduct.create({
                order_id: order._id,
                product_id: item.product,
                quantity: item.quantity,
                product_price: foundProduct.discounted_price || foundProduct.normal_price
            });

            foundProduct.quantity -= item.quantity;
            await foundProduct.save();

            return createdOrderProduct._id;
        });

        const orderProductIds = await Promise.all(updateOrderProducts);
        order.order_products = orderProductIds;
        await order.save();

        // Clear cart
        userCart.cartItems = [];
        userCart.total = 0;
        await userCart.save();

        return { success: true, message: 'Payment processed successfully' };
    }

    return { success: false, message: 'Unhandled event type' };
};

module.exports = exports;