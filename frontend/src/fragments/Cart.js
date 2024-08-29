import React, { useContext } from "react";
import './Cart.css';
import CartContext from "./CartContext";

function Cart() {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const shippingRate = 5.00;

    const calculateTotal = (items) => items.reduce((total, item) => {
        const price = parseFloat(item.price.slice(1)); 
        return total + price * item.quantity;
    }, 0);
    
    const subtotal = calculateTotal(cartItems);
    const shipping = subtotal > 0 ? shippingRate : 0;
    const total = subtotal + shipping;

    return (
        <>
            <div className='header-cart'>
                <h3>Shopping Cart</h3>
            </div>
            <div className='shopping-cart'>
                <div className='column-labels'>
                    <label className='product-image'>Image</label>
                    <label className="product-details">Product</label>
                    <label className="product-price">Price</label>
                    <label className="product-quantity">Quantity</label>
                    <label className="product-removal">Remove</label>
                    <label className="product-line-price">Total</label>
                </div>

                {cartItems.map(product => (
                    <div className='product' key={product.productId}>
                        <div className='product-image'>
                            <img src={product.img} alt={product.name} />
                        </div>
                        <div className='product-title'>{product.name}</div>
                        <div className='product-price'>{product.price}</div>
                        <div className='product-quantity'>
                            <input
                                type='number'
                                value={product.quantity}
                                min='1'
                                onChange={(e) => updateQuantity(product.productId, parseInt(e.target.value, 10))}
                            />
                        </div>
                        <div className='product-removal'>
                            <button className='remove-product' onClick={() => removeFromCart(product.productId)}>Remove</button>
                        </div>
                        <div className='product-line-price'>${(parseFloat(product.price.slice(1)) * product.quantity).toFixed(2)}</div>
                    </div>
                ))}

                <div className='totals'>
                    <div className='totals-item'>
                        <label>Subtotal</label>
                        <div className='totals-value' id='cart-subtotal'>${subtotal.toFixed(2)}</div>
                    </div>
                    <div className='totals-item'>
                        <label>Shipping</label>
                        <div className='totals-value' id='cart-shipping'>${shipping.toFixed(2)}</div>
                    </div>
                    <div className='totals-item totals-item-total'>
                        <label>Grand Total</label>
                        <div className='totals-value' id='cart-total'>${total.toFixed(2)}</div>
                    </div>
                </div>
                <a href='/checkout'> <button className='checkout'>Checkout</button> </a>
            </div>
        </>
    );
}

export default Cart;
