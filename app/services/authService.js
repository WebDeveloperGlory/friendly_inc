const bcrypt = require('bcrypt');
const db = require('../config/db');
const { setOtp, verifyOtp, sendOtpEmail } = require('../utils/otpUtils');
const { generateToken } = require('../utils/jwtUtils');

exports.initiateEnrollment = async ({ name, email }) => {
    let otp;

    // Check if user already exists
    const foundUser = await db.User.findOne({ email });
    if ( foundUser && foundUser.isActive ) {
        return { success: false, message: 'User Already Exists' };
    } else if ( foundUser && !foundUser.isActive ) {
        // Regenerate Otp
        otp = setOtp( foundUser );
        await foundUser.save();
        // Send otp to user
        sendOtpEmail( email, otp );
        return { success: true, message: 'OTP regenerated', data: otp };
    }

    // Create new user and generate otp
    const newUser = await db.User.create({ name, email });
    otp = setOtp( newUser );
    await newUser.save();

    // Send otp to email
    sendOtpEmail( email, otp );

    // Return success
    return { success: true, message: 'OTP sent to email', data: otp };
};

exports.completeEnrollment = async ({ otp, email, password, gender, username, phone }) => {
    // Check if user exists
    const foundUser = await db.User.findOne({ email });
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check validity of otp
    const verifiedOtp = verifyOtp( foundUser, otp );
    if( !verifiedOtp ) return { success: false, message: 'Invalid or Expired OTP' };

    // Save the password and reset otp fields for the user
    foundUser.password = password;
    foundUser.isActive = true;
    foundUser.otp = null;
    foundUser.otpExpiresAt = null;
    foundUser.gender = gender;
    foundUser.username = username;
    foundUser.phone = phone;
    await foundUser.save();

    // Generate jwt
    const token = generateToken( foundUser );

    const user = {
        id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        gender: foundUser.gender,
        phone: foundUser.phone,
    }

    // Return success
    return { success: true, message: 'User Registered Successfully', data: { user, token } };
}

// exports.registerSeller = async ({ personal_phone, personal_email, personal_name, store_name, public_phone, public_email, physical_location, store_category }) => {
//     // Create seller account
//     const createdSeller = await db.Seller.create({
//         personal_phone,
//         personal_email,
//         personal_name,
//         store_name,
//         public_phone,
//         public_email,
//         physical_location,
//         store_category
//     });
//     if( !createdSeller ) return { success: false, message: 'Seller Account Creation Failed' };
    
//     // Return success
//     return { success: true, message: 'Seller Account Created', data: createdSeller };
// }

exports.loginUser = async ({ email, password }) => {
    // Check if user exists
    const foundUser = await db.User.findOne({ email });
    if( !foundUser ) return { success: false, message: 'Invalid Email' };

    // Check if password is coreect
    const isPasswordMatch = await foundUser.comparePassword( password );
    if( !isPasswordMatch ) return { success: false, message: 'Invalid Password' };

    // Generate jwt
    const token = generateToken( foundUser );

    // Return success
    return { success: true, message: 'User Logged In', data: token };
}

exports.initiatePasswordReset = async ({ email }) => {
    // Find user in database
    const foundUser = await db.User.findOne({ email });
    if( !foundUser ) return { success: false, message: 'User Not Found' };

    // Set OTP
    const otp = setOtp( foundUser );
    await foundUser.save();
    // Send otp to users email
    sendOtpEmail( foundUser.email, otp );

    // Return success
    return { success: true, message: 'OTP generated', data: otp };
}

exports.completePasswordReset = async ( { email, otp, newPassword, confirmNewPassword } ) => {
    // Find user in database
    const foundUser = await db.User.findOne({ email });
    if( !foundUser ) return { success: false, message: 'User Not Found' };

    // Check validity of otp
    const verifiedOtp = verifyOtp( foundUser, otp );
    if( !verifiedOtp ) return { success: false, message: 'Invalid or Expired OTP' };

    // Check if passwords match
    const matchingPasswords = newPassword === confirmNewPassword;
    if( !matchingPasswords ) return { success: false, message: 'Passwords Do Not Match' };

    // Update password
    foundUser.password = newPassword;
    foundUser.otp = null;
    foundUser.otpExpiresAt = null;
    await foundUser.save();

    return { success: true, message: 'Password Reset Successfully', data: null };
}

exports.changePassword = async ( { userId }, { oldPassword, newPassword, confirmNewPassword } ) => {
    // Find user in database
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'User Not Found' };

    // Check if old password is correct
    const isPasswordMatch = await foundUser.comparePassword( oldPassword );
    if( !isPasswordMatch ) return { success: false, message: 'Invalid Old Password' };

    // Check if passwords match
    const matchingPasswords = newPassword === confirmNewPassword;
    if( !matchingPasswords ) return { success: false, message: 'Passwords Do Not Match' };

    // Change password and invalidate otp
    foundUser.password = newPassword;
    foundUser.otp = null;
    foundUser.otpExpiresAt = null;
    await foundUser.save();

    // Return success
    return { success: true, message: 'Password Changed Successfully', data: null };
}

exports.resendOtp = async ({ email }) => {
    // Find user in database
    const foundUser = await db.User.findOne( email );
    if( !foundUser ) return { success: false, message: 'User Not Found' };

    // Set OTP
    const otp = setOtp( foundUser );
    await foundUser.save();
    // Send otp to users email
    sendOtpEmail( foundUser.email, otp );

    // Return success
    return { success: true, message: 'OTP generated', data: otp };
}

exports.getUserProfile = async ({ userId }) => {
    // Find user in database
    const foundUser = await db.User.findById( userId ).select( '-password -lastLogin' );
    if( !foundUser ) return { success: false, message: 'User Not Found' };

    // Return success
    return { success: true, message: 'User Aquired', data: foundUser };
}

exports.adminLogin = async ({ username, email, password }) => {
    // Check if user exists
    const foundAdmin = await db.Admin.findOne({ 
        $or: [
            { username },
            { email }
        ]
    });
    if( !foundAdmin ) return { success: false, message: 'Invalid Username/Email' };

    // Check if password is coreect
    const isPasswordMatch = await foundAdmin.comparePassword( password );
    if( !isPasswordMatch ) return { success: false, message: 'Invalid Password' };

    // Generate jwt
    const token = generateToken( foundAdmin );

    // Return success
    return { success: true, message: 'Admin Logged In', data: token };
}

exports.riderLogin = async ({ username, email, password }) => {
    // Check if user exists
    const foundRider = await db.Rider.findOne({ 
        $or: [
            { username },
            { email }
        ]
    });
    if( !foundRider ) return { success: false, message: 'Invalid Username' };

    // Check if password is coreect
    const isPasswordMatch = await foundRider.comparePassword( password );
    if( !isPasswordMatch ) return { success: false, message: 'Invalid Password' };

    // Generate jwt
    const token = generateToken( foundRider );

    // Return success
    return { success: true, message: 'Rider Logged In', data: token };
}

exports.adminLoginAlternative = async ({ username, email, password }) => {
    // Check if user exists
    const foundAdmin = await db.Admin.findOne({ 
        $or: [
            { username },
            { email }
        ]
    });
    if(!foundAdmin) return { success: false, message: 'Invalid Username/Email' };

    // Get the raw hash from the database
    const storedHash = foundAdmin.password;
    
    // Try multiple comparison methods
    let isPasswordMatch = false;
    
    // Method 1: Using bcrypt.compare directly
    try {
        isPasswordMatch = await bcrypt.compare(password, storedHash);
        console.log("Method 1 result:", isPasswordMatch);
    } catch (err) {
        console.error("Method 1 error:", err);
    }
    
    // Method 2: Using bcrypt.compareSync as alternative
    try {
        const syncResult = bcrypt.compareSync(password, storedHash);
        console.log("Method 2 result:", syncResult);
        if (syncResult) isPasswordMatch = true;
    } catch (err) {
        console.error("Method 2 error:", err);
    }
    
    if(!isPasswordMatch) return { success: false, message: 'Invalid Password' };

    // Generate jwt
    const token = generateToken(foundAdmin);

    // Return success
    return { success: true, message: 'Admin Logged In', data: token };
}

module.exports = exports;