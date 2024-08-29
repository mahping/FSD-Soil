import React, { createContext, useState, useEffect } from 'react';
import { getUser } from '../data/repository';
import { getCart, addToCart as addToCartAPI, updateCartItem as updateCartItemAPI, removeFromCart as removeFromCartAPI } from '../data/repository';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const user = getUser();

    useEffect(() => {
        if (user) {
            getCart(user.id)
                .then(setCartItems)
                .catch(error => console.error("Error fetching cart items:", error));
        }
    }, [user]);

    const addToCart = (product) => {
        if (!user) {
            toast.error("You need to log in to add items to the cart.");
            return;
        }
        
        const cartItem = { userId: user.id, productId: product.id, quantity: 1 };
        addToCartAPI(cartItem)
            .then(() => {
                setCartItems(prevItems => {
                    const itemExists = prevItems.find(item => item.productId === product.id);
                    if (itemExists) {
                        return prevItems.map(item =>
                            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        );
                    } else {
                        return [...prevItems, { ...product, quantity: 1 }];
                    }
                });
            })
            .catch(error => console.error("Error adding to cart:", error));
    };

    const removeFromCart = (productId) => {
        if (!user) {
            toast.error("You need to log in to remove items from the cart.");
            return;
        }

        const cartItem = { userId: user.id, productId };
        removeFromCartAPI(cartItem)
            .then(() => {
                setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
            })
            .catch(error => console.error("Error removing from cart:", error));
    };

    const updateQuantity = (productId, quantity) => {
        if (!user) {
            toast.error("You need to log in to update the cart.");
            return;
        }

        const cartItem = { userId: user.id, productId, quantity };
        updateCartItemAPI(cartItem)
            .then(() => {
                setCartItems(prevItems => 
                    prevItems.map(item => 
                        item.productId === productId ? { ...item, quantity } : item
                    )
                );
            })
            .catch(error => console.error("Error updating cart item:", error));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
