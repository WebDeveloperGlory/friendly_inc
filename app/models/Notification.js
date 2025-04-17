const { Schema, default: mongoose } = require('mongoose');

const notificationSchema = new Schema({
    target: {
        type: String,
        enum: [ 'admin', 'user', 'rider' ]
    },
    recipient_id: { type: String },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Notification', notificationSchema )