const riderService = require('../services/riderService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getRiderDashboard = async ( req, res ) => {
    try {
        const result = await riderService.getRiderDashboard( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.setAvailability = async ( req, res ) => {
    try {
        const result = await riderService.setAvailability( req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getAllRiderOrders = async ( req, res ) => {
    try {
        const result = await riderService.getAllRiderOrders( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getSpecificRiderOrder = async ( req, res ) => {
    try {
        const result = await riderService.getSpecificRiderOrder( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.cancelOrder = async ( req, res ) => {
    try {
        const result = await riderService.cancelOrder( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;