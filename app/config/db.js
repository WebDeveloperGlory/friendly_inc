const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

const URI = MONGO_URI;
mongoose.Promise = Promise;

mongoose.connect( URI )
    .then( ( res ) => console.log('Connected to friendly_inc db') )
    .catch( ( err ) => console.log( err ) );

module.exports.Address = require('../models/Address');
module.exports.Admin = require('../models/Admin');
module.exports.Brand = require('../models/Brand');
module.exports.Category = require('../models/Category');
module.exports.Image = require('../models/Image');
module.exports.Notification = require('../models/Notification');
module.exports.Order = require('../models/Order');
module.exports.OrderProduct = require('../models/OrderProduct');
module.exports.Product = require('../models/Product');
module.exports.Rider = require('../models/Rider');
module.exports.Seller = require('../models/Seller');
module.exports.User = require('../models/User');