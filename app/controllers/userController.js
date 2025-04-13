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
        const result = await userService.addProductToFavorites( req.query, req.user );

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
        const result = await userService.removeProductFromFavorites( req.query, req.user );

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
        const result = await userService.addAddress( req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.deleteAddress = async ( req, res ) => {
    try {
        const result = await userService.deleteAddress( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getUserCart = async ( req, res ) => {
    try {
        const result = await userService.getUserCart( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.addProductToCart = async ( req, res ) => {
    try {
        const result = await userService.addProductToCart( req.query, req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.deleteProductFromCart = async ( req, res ) => {
    try {
        const result = await userService.deleteProductFromCart( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.increaseCartItemQuantity = async ( req, res ) => {
    try {
        const result = await userService.increaseCartItemQuantity( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.reduceCartItemQuantity = async ( req, res ) => {
    try {
        const result = await userService.reduceCartItemQuantity( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getUserOrders = async ( req, res ) => {
    try {
        const result = await userService.getUserOrders( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.placeOrder = async ( req, res ) => {
    try {
        const result = await userService.placeOrder( req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getUserCards = async ( req, res ) => {
    try {
        const result = await userService.getUserCards( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.addCard = async ( req, res ) => {
    try {
        const result = await userService.addCard( req.user, req.body );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.deleteCard = async ( req, res ) => {
    try {
        const result = await userService.deleteCard( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;