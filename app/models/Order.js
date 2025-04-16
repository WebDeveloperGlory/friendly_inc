const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    order_status: { 
        type: String, 
        enum: ['pending', 'shipped', 'delivered', 'cancelled', 'returned', 'payment_failed'] 
    },
    sum_total: { type: Number },
    user_id: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address_id: { 
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    transaction_id: { type: String },
    transaction_reference: { type: String }, // Paystack reference
    payment_method: { 
        type: String, 
        enum: ['paystack', 'other'], 
        default: 'paystack' 
    },
    transaction_status: {
        type: String,
        enum: ['completed', 'pending', 'failed'],
        default: 'pending',
    },
    payment_attempts: { type: Number, default: 0 },
    assigned_rider_id: { 
        type: Schema.Types.ObjectId,
        ref: 'Rider'
    },
    order_products: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderProduct'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Order', orderSchema );