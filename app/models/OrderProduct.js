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
    product_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    returnable: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderProduct', orderProductSchema);