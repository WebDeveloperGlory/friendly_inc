const { Schema, default: mongoose } = require('mongoose');

const notificationSchema = new Schema({

}, {
    timestamps: true
});

module.exports = mongoose.model( 'Notification', notificationSchema )