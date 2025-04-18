const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpecV1 } = require('./app/config/swagger');
const { PORT, ALLOWED_ORIGINS } = require('./app/config/env');

const authRoutes = require('./app/routes/authRoutes');
const adminRoutes = require('./app/routes/adminRoutes');
const riderRoutes = require('./app/routes/riderRoutes');
const productRoutes = require('./app/routes/productRoutes');
const altProductRoutes = require('./app/routes/altProductRoutes');
const userRoutes = require('./app/routes/userRoutes');
const orderRoutes = require('./app/routes/orderRoutes');

const app = express();
const APP_PORT = PORT;

// CORS SETTINGS //
const allowedOrigins = ALLOWED_ORIGINS;
const corsOptions = {
    origin: ( origin, callback ) => {
        if ( !origin || allowedOrigins.includes( origin ) ) {
            callback( null, true );
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
// END OF CORS SETTINGS //

// MIDDLEWARES //
app.use( cors( corsOptions ) );
app.use( express.json() );
app.use( '/api/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerSpecV1 ) );
// END OF MIDDLEWARES //

// STATIC FILES //
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// STATIC FILES //

// TEST ROUTE //
app.get( '/', ( req, res ) => {
    res.send( 'Deployed And Working with CORS for testing' );
});
//END OF TEST ROUTES //

// ROUTES //
app.use( '/api/auth', authRoutes );
app.use( '/api/admin', adminRoutes );
app.use( '/api/rider', riderRoutes );
app.use( '/api/product', productRoutes );
app.use( '/api/product/v2', altProductRoutes );
app.use( '/api/user', userRoutes );
app.use( '/api/order', orderRoutes );
// END OF ROUTES //

app.listen( PORT, () => {
    console.log(`Friendly Inc Server Running On Port: ${ APP_PORT }`);
    console.log(`Swagger Docs Available At: ${ APP_PORT }/api/api-docs`);
});