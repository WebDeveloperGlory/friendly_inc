const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    normal_price: {
        type: Number,
        required: true
    },
    discounted_price: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    main_image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    category: { 
        type: String,
        enum: [ 'restaurant', 'gadget store', 'super mart' ],
        required: true
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    status: { 
        type: String, 
        enum: ['available', 'out_of_stock', 'discontinued']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Product', productSchema );