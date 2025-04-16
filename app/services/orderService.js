const db = require('../config/db');
const paymentUtils = require('../utils/paymentUtils');

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

exports.placeOrder = async({ userId }, { addressId, email }) => {
    // Get user cart
    const userCart = await db.Cart.findOne({ user: userId });
    if (!userCart) return { success: false, message: 'Invalid Cart' };
    if (userCart.cartItems.length === 0) return { success: false, message: 'No Items In Cart' };

    // Check if address exists
    const foundAddress = await db.Address.findById(addressId);
    if (!foundAddress) return { success: false, message: 'Invalid Address' };

    // Validate product quantities before creating the order
    const quantityValidation = await Promise.all(userCart.cartItems.map(async (item) => {
        const product = await db.Product.findById(item.product);
        if (!product) {
            return { valid: false, message: `Product no longer available` };
        }

        if (product.quantity < item.quantity) {
            return { 
                valid: false, 
                message: `Insufficient stock for ${product.product_name}. Only ${product.quantity} available.` 
            };
        }

        return { valid: true };
    }));

    // Check if any validation failed
    const invalidItem = quantityValidation.find(item => !item.valid);
    if (invalidItem) {
        return { success: false, message: invalidItem.message };
    }

    // Create order with pending status
    const createdOrder = await db.Order.create({ 
        user_id: userId, 
        order_status: 'pending',
        address_id: foundAddress._id,
        order_products: [],
        sum_total: userCart.total,
        transaction_status: 'pending'
    });

    // Initialize payment with Paystack
    const paymentResponse = await paymentUtils.initializePayment(
        email,
        userCart.total,
        {
            order_id: createdOrder._id.toString(),
            user_id: userId.toString(),
            custom_fields: [
                {
                    display_name: "Order ID",
                    variable_name: "order_id",
                    value: createdOrder._id.toString()
                }
            ]
        }
    );

    if (!paymentResponse.success) {
        // Update order status to reflect payment failure
        await db.Order.findByIdAndUpdate(createdOrder._id, {
            order_status: 'payment_failed',
            payment_attempts: 1
        });

        return { 
            success: false, 
            message: paymentResponse.message || 'Payment initialization failed' 
        };
    }

    // Update order with payment reference
    await db.Order.findByIdAndUpdate(createdOrder._id, {
        transaction_reference: paymentResponse.data.reference,
        transaction_id: paymentResponse.data.access_code
    });

    // Return payment authorization URL to frontend
    return { 
        success: true, 
        message: 'Payment initialized', 
        data: {
            authorization_url: paymentResponse.data.authorization_url,
            access_code: paymentResponse.data.access_code,
            reference: paymentResponse.data.reference,
            order_id: createdOrder._id
        }
    };
};

exports.verifyOrderPayment = async (orderId) => {
    // Check if order exists
        const order = await db.Order.findById(orderId);
    if (!order) {
        return { success: false, message: 'Order not found' };
    };

    // Verify payment with Paystack
    const verification = await paymentUtils.verifyPayment( order.transaction_reference );

    if (!verification.success) {
        return { success: false, message: 'Payment verification failed' };
    }

    if (verification.data.status !== 'success') {
        // Payment failed
        order.order_status = 'payment_failed';
        order.transaction_status = 'failed';
        order.payment_attempts += 1;
        await order.save();

        return { success: false, message: 'Payment not successful' };
    }

    // Payment successful - proceed with order processing
    order.transaction_status = 'completed';
    order.transaction_id = verification.data.id;
    order.transaction_reference = verification.data.reference;
    await order.save();

    // Process the order items (moved from original placeOrder)
    try {
        const userCart = await db.Cart.findOne({ user: order.user_id });

        // Map through cart items
        const updateOrderProducts = userCart.cartItems.map(async (item) => {
            // Get product details
            const foundProduct = await db.Product.findById(item.product).select('product_name quantity discounted_price normal_price');

            // Create order product
            const createdOrderProduct = await db.OrderProduct.create({
                order_id: order._id,
                product_id: item.product,
                quantity: item.quantity,
                product_price: foundProduct.discounted_price || foundProduct.normal_price
            });

            if (!createdOrderProduct) {
                throw new Error('Error Creating Order Product');
            }

            // Update product quantity (reduce inventory)
            foundProduct.quantity -= item.quantity;
            await foundProduct.save();

            return createdOrderProduct._id;
        });

        const orderProductIds = await Promise.all(updateOrderProducts);
        order.order_products = orderProductIds;
        order.order_status = 'processing'; // Ready for fulfillment
        await order.save();

        // Clear user's cart after successful order
        userCart.cartItems = [];
        userCart.total = 0;
        await userCart.save();

        return { success: true, message: 'Payment verified and order processed', data: order };
    } catch (error) {
        // Handle processing errors
        order.order_status = 'payment_failed';
        await order.save();

        return { 
            success: false, 
            message: error.message || 'Error processing order after payment' 
        };
    }
};

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