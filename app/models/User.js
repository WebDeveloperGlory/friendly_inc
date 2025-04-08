const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: { type: String },
    interests: [{
        type: String,
    }],
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    profile_image: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp'
    },
    phone: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    addresses: [{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }],
    otp: { type: String },
    otpExpiresAt: { type: Date },
    lastLogin: { type: Date },
},{
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if ( !this.isModified('password') ) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model( 'User', userSchema );