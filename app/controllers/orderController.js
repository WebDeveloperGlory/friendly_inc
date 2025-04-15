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

module.exports = exports;