const authService = require('../services/authService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.initiateEnrollment = async ( req, res ) => {
    try {
        const result = await authService.initiateEnrollment( req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.completeEnrollment = async ( req, res ) => {
    try {
        const result = await authService.completeEnrollment( req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.registerSeller = async ( req, res ) => {
    try {
        const result = await authService.registerSeller( req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.loginUser = async ( req, res ) => {
    try {
        const result = await authService.loginUser( req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.initiatePasswordReset = async ( req, res ) => {
    try {
        const result =  await authService.initiatePasswordReset( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}
exports.completePasswordReset = async ( req, res ) => {
    try {
        const result = await authService.completePasswordReset( req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}
exports.changePassword = async ( req, res ) => {
    try {
        const result = await authService.changePassword( req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.resendOtp = async ( req, res ) => {
    try {
        const result = await authService.resendOtp( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getUserProfile = async ( req, res ) => {
    try {
        const result = await authService.getUserProfile( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;