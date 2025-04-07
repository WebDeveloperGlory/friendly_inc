const { Schema, default: mongoose } = require('mongoose');

const orderProductSchema = new Schema({
    order_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Order' 
    },
    product_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    price_1: { type: Number, required: true },
    price_2: { type: Number },
    quantity: { type: Number, required: true },
    returnable: { type: Boolean, default: false },
    product_status: { type: String, enum: ['available', 'out_of_stock', 'returned'] },
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderProduct', orderProductSchema);