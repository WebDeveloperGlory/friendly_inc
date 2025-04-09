const { Schema, default: mongoose } = require('mongoose');

const imageSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    originalname: String,
    width: Number,
    height: Number,
    isProcessed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Image', imageSchema );