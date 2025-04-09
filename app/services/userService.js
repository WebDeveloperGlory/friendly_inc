const db = require('../config/db');

exports.getProfile = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Return success
    return { success: true, message: 'User Details Acquired', data: foundUser };
}

exports.getUserFavorites = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId )
        .populate({
            path: 'favorites',
            populate: {
                path: 'main_image',
                select: 'filename originalname path width height'
            }
        })
        .select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Return success
    return { success: true, message: 'User Favorites Acquired', data: foundUser.favorites }
}

exports.addProductToFavorites = async({ productId }, { userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if product exists
    const foundProduct = await db.Product.findById( productId );
    if( !foundProduct ) return { success: false, message: 'Invalid Product' };

    // Add product to wishlist
    const updatedUser = await db.User.findByIdAndUpdate(
        userId,
        { $addToSet: { favorites: productId } },
        { new: true }
    );

    // Return success
    return { success: true, message: 'Product Added To Favorites', data: updatedUser.favorites }
}

exports.removeProductFromFavorites = async({ productId }, { userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if product exists
    const foundProduct = await db.Product.findById( productId );
    if( !foundProduct ) return { success: false, message: 'Invalid Product' };

    // Add product to wishlist
    const updatedUser = await db.User.findByIdAndUpdate(
        userId,
        { $pull: { favorites: productId } },
        { new: true }
    );

    // Return success
    return { success: true, message: 'Product Added To Favorites', data: updatedUser.favorites }
}

exports.getUserAddresses = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId )
        .populate({
            path: 'addresses'
        })
        .select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Return success
    return { success: true, message: 'Addresses Acquired', data: foundUser.addresses };
}

exports.addAddress = async ({ userId }, { title, lat, long, location, city, state }) => {{
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    const createdAddress = await db.Address.create({
        title, lat, long, location, city, state,
        user: foundUser._id
    });
    await db.User.findByIdAndUpdate(
        userId,
        { $addToSet: { addresses: createdAddress._id } },
        { new: true }
    );

    // Return success
    return { success: true, message: 'Address Added Successfully', data: createdAddress }
}};

exports.getUserCart = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId )
        .select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Get all cart items
    const userCart = await db.Cart.findOne(
        { user: userId }
    ).populate({
        path: 'cartItems.product',
        select: 'product_name normal_price discounted_price main_image',
        populate: {
            path: 'main_image',
            select: 'filename originalname path width height'
        }
    });

    // Return success
    return { success: true, message: 'Cart Items Acquired', data: userCart }
}

exports.addProductToCart = async({ productId }, { userId }, { quantity }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if product exists
    const foundProduct = await db.Product.findById( productId );
    if( !foundProduct ) return { success: false, message: 'Invalid Product' };

    // Add check if user has a cart
    if( !foundUser.cart ) {
        const userCart = await db.Cart.create({ user: foundUser._id });
        foundUser.cart = userCart._id;
        await foundUser.save();
    }

    // Get user cart
    const userCart = await db.Cart.findById( foundUser.cart );
    const cartItems = userCart.cartItems;
    
    // Check if product is in cart
    const productInCart = cartItems.some( item => item.product._id === foundProduct._id );

    if( productInCart ) {
        // Find the cart item for the given product
        const cartItem = userCart.cartItems.find(item => item.product._id.toString() === productId.toString());

        // Increase the quantity of the product
        cartItem.quantity += quantity;
    } else {
        userCart.cartItems.push({ product: foundProduct._id, quantity });
    }

    // Save cart
    await userCart.save();

    // Refresh cart
    const refreshedCart = await db.Cart.findById( foundUser.cart )
        .populate({
            path: 'cartItems.product',
            select: 'product_name normal_price discounted_price main_image',
            populate: {
                path: 'main_image',
                select: 'filename originalname path width height'
            }
        });

    // Return success
    return { success: true, message: 'Cart Updated', data: refreshedCart }
}

exports.deleteProductFromCart = async({ productId }, { userId }) => {
    // Find the user's cart
    const cart = await db.Cart.findOne({ user: userId });
    if ( !cart ) return { success: false, message: 'Cart not found' }

    // Check if the product exists in the cart
    const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId.toString());

    if (productIndex === -1) {
        return { success: false, message: 'Product not found in cart' };
    }

    // Remove the product from the cartItems array
    cart.cartItems.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    // Refresh cart
    const refreshedCart = await db.Cart.findOne({ user: userId })
        .populate({
            path: 'cartItems.product',
            select: 'product_name normal_price discounted_price main_image',
            populate: {
                path: 'main_image',
                select: 'filename originalname path width height'
            }
        });

    return { success: true, message: 'Product removed from cart', data: refreshedCart };
}

module.exports = exports;