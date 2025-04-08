const db = require('../config/db');
const { error, serverError } = require('../utils/responseUtils');

const hasAdminPermissions = async ( req, res, next ) => {
    const { userId } = req.user;

    try {
        const foundUser = await db.Admin.findById( userId );
        if( !foundUser ) return error( res, '
        next();            
    } catch ( err ) {
        return serverError( res, err );
    }
};

module.exports = { authenticateUser };