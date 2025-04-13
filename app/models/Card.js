const { Schema, default: mongoose } = require('mongoose');

const cardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    cardType: {
        type: String,
        enum: ['Visa', 'Mastercard', 'Discover', 'Others' ],
        required: true
    },
    cardDigits: { type: Number },
    expiryMonth: { type: Number },
    expiryYear: { type: Number },
    cardholderName: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Card', cardSchema );