const orderService = require('../services/orderService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getAllOrders = async ( req, res ) => {
    try {
        const result = await orderService.getAllOrders();

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getOneOrder = async ( req, res ) => {
    try {
        const result = await orderService.getOneOrder( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.updateOrderStatus = async ( req, res ) => {
    try {
        const result = await orderService.updateOrderStatus( req.params, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.placeOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const { addressId, email } = req.body;

        const result = await orderService.placeOrder({ userId }, { addressId, email });

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { orderId, reference } = req.body;

        const result = await orderService.verifyOrderPayment(orderId, reference);

        if (result.success) {
            return success(res, result.message, result.data);
        }
        return error(res, result.message);
    } catch (err) {
        return serverError(res, err);
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        const crypto = require('crypto');
        const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
                          .update(JSON.stringify(req.body))
                          .digest('hex');

        if (hash !== req.headers['x-paystack-signature']) {
            return res.status(401).send('Unauthorized');
        }

        const result = await orderService.handleWebhook(req.body);
        
        if (result.success) {
            return res.status(200).send('Webhook processed');
        }
        return res.status(400).send(result.message);
    } catch (err) {
        return serverError(res, err);
    }
};

exports.handlePaystackCallback = async (req, res) => {
    try {
        // Get reference from query params
        const reference = req.query.reference;
        
        if (!reference) {
            return res.status(400).send(renderPaymentResponse(false, 'No reference provided'));
        }

        // Verify payment through service
        const result = await orderService.verifyOrderPayment(reference);
        
        // Send appropriate HTML response
        return res.send(renderPaymentResponse(
            result.success,
            result.message,
            result.data || null
        ));
    } catch (error) {
        console.error('Paystack callback error:', error);
        return res.status(500).send(renderPaymentResponse(false, 'Internal server error'));
    }
};

// HTML rendering helper function
function renderPaymentResponse(success, message, order = null) {
    const title = success ? 'Payment Successful' : 'Payment Failed';
    const color = success ? 'green' : 'red';
    const orderDetails = order ? `
        <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Status:</strong> ${order.order_status}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
    ` : '';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #f5f5f5;
            }
            .container {
                background-color: white;
                border-radius: 10px;
                padding: 30px;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: ${color};
            }
            .order-details {
                margin-top: 20px;
                text-align: left;
                padding: 15px;
                background-color: #f9f9f9;
                border-radius: 5px;
            }
            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${title}</h1>
            <p>${message}</p>
            ${orderDetails}
            <a href="/" class="btn">Return to Home</a>
        </div>
    </body>
    </html>
    `;
}

module.exports = exports;