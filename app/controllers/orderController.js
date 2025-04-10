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

module.exports = exports;