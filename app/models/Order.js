const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    order_status: { 
        type: String, 
        enum: ['pending', 'shipped', 'delivered', 'cancelled', 'returned'] 
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