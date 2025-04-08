const adminService = require('../services/adminService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getAdminDashboardDetails = async ( req, res ) => {
    try {
        const result = await adminService.getAdminDashboardDetails();

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.assignRidersToOrders = async ( req, res ) => {
    try {
        const result = await adminService.assignRidersToOrders( req.params, req.body );

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
        const result = await adminService.cancelOrder( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getPersonalDetails = async ( req, res ) => {
    try {
        const result = await adminService.getPersonalDetails( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.editPersonalDetails = async ( req, res ) => {
    try {
        const result = await adminService.editPersonalDetails( req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.registerAdministratorOrRider = async ( req, res ) => {
    try {
        const result = await adminService.registerAdministratorOrRider( req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;