const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_slug: {
        type: String,
        required: true
    },
    short_description: { 
        type: String, 
        maxlength: 500 
    },
    description: {
        type: String
    },
    price_1: {
        type: Number,
        required: true
    },
    price_2: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    main_image: {
        type: String,
    },
    other_images: [{
        type: String
    }],
    category_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    brand_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Brand' 
    },
    seller_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    status: { 
        type: String, 
        enum: ['available', 'out_of_stock', 'discontinued']
    },
    tags: [{
        type: String
    }],
    returnable: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Product', productSchema );