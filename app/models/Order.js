const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    transaction_id: { type: String, required: true },
    order_status: { 
        type: String, 
        enum: ['pending', 'shipped', 'delivered', 'canceled', 'returned'] 
    },
    sum_total: { type: Number },
    user_id: { 
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    address_id: { 
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
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