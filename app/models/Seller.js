const { Schema, default: mongoose } = require('mongoose');

const sellerSchema = new Schema({
    personal_phone: {
        type: String,
        required: true,
        unique: true
    },
    personal_email: {
        type: String,
        required: true,
        unique: true
    },
    personal_name: {
        type: String,
        required: true
    },
    store_name: {
        type: String,
        required: true
    },
    public_phone: {
        type: String,
        required: true
    },
    public_email: {
        type: String,
        required: true
    },
    physical_location: {
        type: String,
        required: true
    },
    store_category: {
        type: String,
        enum: ['resturant', 'fashion', 'electronics', 'groceries', 'skincare'],
        required: true
    },
    logo_url: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp'
    },
    banner_url: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Seller', sellerSchema );