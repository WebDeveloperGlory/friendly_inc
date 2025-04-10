const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const riderSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    isActive: { type: Boolean, default: false },
    phone_number: { type: String, required: true, unique: true },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'Administrator'
    },
    lastLogin: { type: Date }
}, {
    timestamps: true
});


riderSchema.pre('save', async function (next) {
    if ( !this.isModified('password') ) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

riderSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model( 'Rider', riderSchema );