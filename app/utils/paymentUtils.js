const axios = require('axios');
const db = require('../config/db');
const { PAYSTACK_SECRET_KEY, PAYSTACK_BASE_URL } = require('../config/env');

// Initialize Paystack payment
exports.initializePayment = async (email, amount, metadata = {}) => {
    try {
        const response = await axios.post(
            `${PAYSTACK_BASE_URL}/transaction/initialize`,
            {
                email,
                amount: amount * 100,
                metadata
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        console.error('Paystack initialization error:', error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Payment initialization failed'
        };
    }
};

// Verify Paystack payment
exports.verifyPayment = async (reference) => {
    try {
        const response = await axios.get(
            `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
                }
            }
        );

        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        console.error('Paystack verification error:', error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Payment verification failed'
        };
    }
};

// Webhook handler for Paystack events
exports.handleWebhook = async (payload) => {
    const event = payload.event;
    const data = payload.data;

    if (event === 'charge.success') {
        const order = await db.Order.findOne({ transaction_id: data.reference });
        if (!order) {
            return { success: false, message: 'Order not found' };
        }

        // Update order status based on successful payment
        order.transaction_status = 'completed';
        order.order_status = 'pending'; // Ready for processing
        await order.save();

        return { success: true, message: 'Payment processed successfully' };
    }

    return { success: false, message: 'Unhandled event type' };
};

module.exports = exports;