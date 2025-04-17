const db = require('../config/db');

const sendAdminNotification = async ({ title, message, type }) => {
    await db.Notification.create({
        target: 'admin',
        title,
        message,
        type
    });
}

const sendRiderNotification = async ({ recipient_id, title, message, type }) => {
    const foundTarget = await db.Rider.findById( recipient_id );
    if( !foundTarget ) return;

    await db.Notification.create({
        target: 'rider',
        recipient_id,
        title,
        message,
        type
    });
}

const sendUserNotification = async ({ recipient_id, title, message, type }) => {
    const foundTarget = await db.User.findById( recipient_id );
    if( !foundTarget ) return;

    await db.Notification.create({
        target: 'user',
        recipient_id,
        title,
        message,
        type
    });
}

module.exports = { 
    sendAdminNotification, 
    sendRiderNotification, 
    sendUserNotification, 
};