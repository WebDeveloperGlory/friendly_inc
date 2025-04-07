const { Schema, default: mongoose } = require('mongoose');

const riderSchema = new Schema({
    rider_name: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    topRated: {
        type: Boolean,
        default: false
    },
    home_address: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    NIN: {
        type: String,
        required: true,
        unique: true
    },
    riding_license: {
        type: String,
        required: true,
        unique: true
    },
    vehicle_type: {
        type: String,
        enum: ['bike', 'maruwa', 'car', 'rocket'],
        required: true
    },
    vehicle_color: {
        type: String,
        required: true
    },
    vehicle_plate_number: {
        type: String,
        required: true,
        unique: true
    },
    ratings: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Rider', riderSchema );