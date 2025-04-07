const { Schema, default: mongoose } = require('mongoose');

const categorySchema = new Schema({
    category_name: { type: String, required: true },
    parent_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    },
    children: [{ type: String }],
    category_image: { type: String },
    related_categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Category', categorySchema );