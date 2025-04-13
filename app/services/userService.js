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
    return { success: true, message: 'Product Removed From Favorites', data: updatedUser.favorites }
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

exports.deleteAddress = async ({ addressId }, { userId }) => {{
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if address exists
    const foundAddress = await db.Address.findOne({ _id: addressId, user: foundUser._id });
    if( !foundAddress ) return { success: false, message: 'Invalid Address' };

    // Delete address
    await db.Address.findByIdAndDelete( addressId );
    const updatedUser = await db.User.findByIdAndUpdate(
        userId,
        { $pull: { addresses: addressId } },
        { new: true }
    );

    // Return success
    return { success: true, message: 'Address Deleted Successfully', data: updatedUser }
}};

exports.getUserCart = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId )
        .select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if user has a cart
    if ( !foundUser.cart ) {
        const userCart = await db.Cart.create({ user: foundUser._id });
        foundUser.cart = userCart._id;
        await foundUser.save();
    }

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
    
    // Check if product has quantity field and it's sufficient
    if (foundProduct.quantity !== undefined && quantity > foundProduct.quantity) {
        return { 
            success: false, 
            message: `Insufficient stock. Only ${foundProduct.quantity} items available.` 
        };
    }

    // Add check if user has a cart
    if( !foundUser.cart ) {
        const userCart = await db.Cart.create({ user: foundUser._id, total: 0 });
        foundUser.cart = userCart._id;
        await foundUser.save();
    }

    // Get user cart
    const userCart = await db.Cart.findById( foundUser.cart );
    const cartItems = userCart.cartItems;
    
    // Check if product is in cart
    const productInCart = cartItems.some( item => item.product._id === foundProduct._id );
    
    // Get the price of the product (use discounted price if available)
    const productPrice = foundProduct.discounted_price || foundProduct.normal_price;

    if( productInCart ) {
        // Find the cart item for the given product
        const cartItem = userCart.cartItems.find(item => item.product._id.toString() === productId.toString());
        
        // Check if adding more would exceed available quantity
        const newQuantity = cartItem.quantity + quantity;
        if (foundProduct.quantity !== undefined && newQuantity > foundProduct.quantity) {
            return { 
                success: false, 
                message: `Cannot add ${quantity} more items. Only ${foundProduct.quantity - cartItem.quantity} more available.` 
            };
        }

        // Calculate price difference for updating total
        const priceDifference = productPrice * quantity;
        
        // Increase the quantity of the product
        cartItem.quantity = newQuantity;
        
        // Update cart total
        userCart.total += priceDifference;
    } else {
        userCart.cartItems.push({ product: foundProduct._id, quantity });
        
        // Update cart total with new item
        userCart.total += productPrice * quantity;
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
    
    // Get the product details to calculate price reduction
    const cartItem = cart.cartItems[productIndex];
    const product = await db.Product.findById(productId);
    
    if (product) {
        const productPrice = product.discounted_price || product.normal_price;
        // Reduce the cart total by the price of the removed items
        cart.total -= productPrice * cartItem.quantity;
        
        // Ensure total doesn't go below zero due to calculation errors
        if (cart.total < 0) cart.total = 0;
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

exports.increaseCartItemQuantity = async({ productId }, { userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById(userId).select('-password');
    if (!foundUser) return { success: false, message: 'Invalid User' };
    
    // Check if user has a cart
    if (!foundUser.cart) {
        return { success: false, message: 'Cart not found' };
    }
    
    // Get user cart
    const userCart = await db.Cart.findById(foundUser.cart);
    if (!userCart) return { success: false, message: 'Cart not found' };
    
    // Find the cart item
    const cartItem = userCart.cartItems.find(item => item.product.toString() === productId.toString());
    
    // Check if product is in cart
    if (!cartItem) {
        return { success: false, message: 'Product not found in cart' };
    }
    
    // Check if product exists and get its details
    const foundProduct = await db.Product.findById(productId);
    if (!foundProduct) return { success: false, message: 'Product no longer available' };
    
    // Check if increasing quantity would exceed available stock
    if (foundProduct.quantity !== undefined && cartItem.quantity + 1 > foundProduct.quantity) {
        return { 
            success: false, 
            message: `Cannot increase quantity. Maximum available: ${foundProduct.quantity}` 
        };
    }
    
    // Get the price of the product (use discounted price if available)
    const productPrice = foundProduct.discounted_price || foundProduct.normal_price;
    
    // Increase the quantity
    cartItem.quantity += 1;
    
    // Update cart total
    userCart.total += productPrice;
    
    // Save cart
    await userCart.save();
    
    // Refresh cart
    const refreshedCart = await db.Cart.findById(foundUser.cart)
        .populate({
            path: 'cartItems.product',
            select: 'product_name normal_price discounted_price main_image',
            populate: {
                path: 'main_image',
                select: 'filename originalname path width height'
            }
        });
    
    return { success: true, message: 'Quantity increased', data: refreshedCart };
}

exports.reduceCartItemQuantity = async({ productId }, { userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById(userId).select('-password');
    if (!foundUser) return { success: false, message: 'Invalid User' };
    
    // Check if user has a cart
    if (!foundUser.cart) {
        return { success: false, message: 'Cart not found' };
    }
    
    // Get user cart
    const userCart = await db.Cart.findById(foundUser.cart);
    if (!userCart) return { success: false, message: 'Cart not found' };
    
    // Find the cart item and its index
    const cartItemIndex = userCart.cartItems.findIndex(item => item.product.toString() === productId.toString());
    
    // Check if product is in cart
    if (cartItemIndex === -1) {
        return { success: false, message: 'Product not found in cart' };
    }
    
    const cartItem = userCart.cartItems[cartItemIndex];
    
    // Get product details for price calculation
    const foundProduct = await db.Product.findById(productId);
    if (!foundProduct) return { success: false, message: 'Product no longer available' };
    
    // Get the price of the product (use discounted price if available)
    const productPrice = foundProduct.discounted_price || foundProduct.normal_price;
    
    // If quantity is 1, remove the item completely
    if (cartItem.quantity === 1) {
        // Remove the product from the cartItems array
        userCart.cartItems.splice(cartItemIndex, 1);
        
        // Update cart total
        userCart.total -= productPrice;
    } else {
        // Decrease the quantity
        cartItem.quantity -= 1;
        
        // Update cart total
        userCart.total -= productPrice;
    }
    
    // Ensure total doesn't go below zero due to calculation errors
    if (userCart.total < 0) userCart.total = 0;
    
    // Save cart
    await userCart.save();
    
    // Refresh cart
    const refreshedCart = await db.Cart.findById(foundUser.cart)
        .populate({
            path: 'cartItems.product',
            select: 'product_name normal_price discounted_price main_image',
            populate: {
                path: 'main_image',
                select: 'filename originalname path width height'
            }
        });
    
    return { success: true, message: 'Quantity reduced', data: refreshedCart };
}

exports.getUserOrders = async ({ userId }) => {
    // Check if order exists
    const foundOrders = await db.Order.find({ user_id: userId });

    // Return success
    return { success: true, message: 'User Orders Acquired', data: foundOrders };
}

exports.placeOrder = async({ userId }, { addressId }) => {
    // Get user cart
    const userCart = await db.Cart.findOne({ user: userId });
    if (!userCart) return { success: false, message: 'Invalid Cart' };
    if (userCart.cartItems.length === 0) return { success: false, message: 'No Items In Cart' };

    // Check if address exists
    const foundAddress = await db.Address.findById(addressId);
    if (!foundAddress) return { success: false, message: 'Invalid Address' };

    // Validate product quantities before creating the order
    const quantityValidation = await Promise.all(userCart.cartItems.map(async (item) => {
        const product = await db.Product.findById(item.product);
        if (!product) {
            return { valid: false, message: `Product no longer available` };
        }
        
        if (product.quantity < item.quantity) {
            return { 
                valid: false, 
                message: `Insufficient stock for ${product.product_name}. Only ${product.quantity} available.` 
            };
        }
        
        return { valid: true };
    }));
    
    // Check if any validation failed
    const invalidItem = quantityValidation.find(item => !item.valid);
    if (invalidItem) {
        return { success: false, message: invalidItem.message };
    }

    // Create order
    const createdOrder = await db.Order.create({ 
        user_id: userId, 
        order_status: 'pending',
        address_id: foundAddress._id,
        order_products: [],
        sum_total: userCart.total
    });

    // Map through cart items
    const updateOrderProducts = userCart.cartItems.map(async (item) => {
        // Get product details
        const foundProduct = await db.Product.findById(item.product).select('product_name quantity discounted_price normal_price');
        
        // Create order product
        const createdOrderProduct = await db.OrderProduct.create({
            order_id: createdOrder._id,
            product_id: item.product,
            quantity: item.quantity,
            product_price: foundProduct.discounted_price || foundProduct.normal_price
        });
        
        if (!createdOrderProduct) {
            throw new Error('Error Creating Order Product');
        }

        // Update product quantity (reduce inventory)
        foundProduct.quantity -= item.quantity;
        await foundProduct.save();
        
        // Return the order product ID for adding to order
        return createdOrderProduct._id;
    });

    try {
        // Wait for all order products to be created and get their IDs
        const orderProductIds = await Promise.all(updateOrderProducts);
        
        // Add product IDs to order
        createdOrder.order_products = orderProductIds;
        await createdOrder.save();
        
        // Clear user's cart after successful order
        userCart.cartItems = [];
        userCart.total = 0;
        await userCart.save();
        
        // Return success
        return { success: true, message: 'Order Created', data: createdOrder };
    } catch (error) {
        // Handle errors (ideally would include rollbacks in production)
        return { success: false, message: error.message || 'Error processing order' };
    }
}

exports.getUserCards = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check for users cards
    const foundCards = db.Card.find({ user: userId });

    // Return success
    return { success: true, message: 'User Cards Acquired', data: foundCards }
}

exports.addCard = async ({ userId }, { cardType, cardDigits, expiryMonth, expiryYear, cardholderName }) => {{
    // Check if card type is valid
    const allowedCardTypes = ['Visa', 'Mastercard', 'Discover', 'Others' ];
    if( !allowedCardTypes.includes( cardType ) ) return { success: false, message: 'Invalid Card Type' }

    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Create card
    const createdCard = await db.Card.create({
        cardType, cardDigits, expiryMonth, expiryYear, cardholderName,
        user: foundUser._id
    });
    await db.User.findByIdAndUpdate(
        userId,
        { $addToSet: { payment_methods: createdCard._id } },
        { new: true }
    );

    // Return success
    return { success: true, message: 'Card Added Successfully', data: createdCard }
}};

exports.deleteCard = async ({ cardId }, { userId }) => {{
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if card exists
    const foundCard = await db.Card.findOne({ _id: cardId, user: foundUser._id });
    if( !foundCard ) return { success: false, message: 'Invalid Address' };

    // Delete card
    await db.Card.findByIdAndDelete( cardId );
    const updatedUser = await db.User.findByIdAndUpdate(
        userId,
        { $pull: { payment_methods: cardId } },
        { new: true }
    );

    // Return success
    return { success: true, message: 'Card Deleted Successfully', data: updatedUser }
}};

module.exports = exports;