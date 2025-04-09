const userService = require('../services/userService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getProfile = async ( req, res ) => {
    try {
        const result = await userService.getProfile( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getUserFavorites = async ( req, res ) => {
    try {
        const result = await userService.getUserFavorites( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.addProductToFavorites = async ( req, res ) => {
    try {
        const result = await userService.addProductToFavorites( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.removeProductFromFavorites = async ( req, res ) => {
    try {
        const result = await userService.removeProductFromFavorites( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getUserAddresses = async ( req, res ) => {
    try {
        const result = await userService.getUserAddresses( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.addAddress = async ( req, res ) => {
    try {
        const result = await userService.addAddress( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getProfile = async ( req, res ) => {
    try {
        const result = await userService.getProfile( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getProfile = async ( req, res ) => {
    try {
        const result = await userService.getProfile( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;