const { Schema, default: mongoose } = require('mongoose');

const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    long: {
        type: String,
        required: true,
    },
    location: {
        type: String
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model( 'Address', addressSchema );