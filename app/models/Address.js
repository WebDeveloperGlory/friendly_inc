const { Schema, default: mongoose } = require('mongoose');

const addressSchema = new Schema({
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
    }
});

module.exports = mongoose.model( 'Address', addressSchema );