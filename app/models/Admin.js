const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    phone_number: { type: String, required: true, unique: true },
    lastLogin: { type: Date }
}, {
    timestamps: true
});

adminSchema.pre('save', async function (next) {
    if ( !this.isModified('password') ) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

adminSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model( 'Administrator', adminSchema );