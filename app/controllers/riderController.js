const riderService = require('../services/riderService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getAllRiders = async ( req, res ) => {
    try {
        const result = await riderService.getAllRiders();

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getRiderDetails = async ( req, res ) => {
    try {
        const result = await riderService.getRiderDetails( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getPersonalRiderDetails = async ( req, res ) => {
    try {
        const result = await riderService.getPersonalRiderDetails( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

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
        const result = await riderService.getSpecificRiderOrder( req.params, req.user );

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
        const result = await riderService.cancelOrder( req.params, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.completeOrder = async ( req, res ) => {
    try {
        const result = await riderService.completeOrder( req.params, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getRiderNotifications = async ( req, res ) => {
    try {
        const result = await riderService.getRiderNotifications( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;