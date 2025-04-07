const { Schema, default: mongoose } = require('mongoose');

const brandSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo_url: { type: String },
    country_of_origin: { type: String },
    established_year: { type: Number },
    categories: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    is_active: { 
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Brand', brandSchema );