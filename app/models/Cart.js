const { Schema, default: mongoose } = require('mongoose');

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cartItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: { type: Number, default: 0 }
});

module.exports = mongoose.model( 'Cart', cartSchema );