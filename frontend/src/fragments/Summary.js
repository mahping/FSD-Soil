import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Summary.css';
import CartContext from "./CartContext";

function Summary() {
    const location = useLocation();
    const { clearCart } = useContext(CartContext);
    const [summaryItems, setSummaryItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    

    useEffect(() => {
        if (location.state?.cartItems) {
            setSummaryItems(location.state.cartItems);
            setPaymentMethod(location.state.paymentMethod);
            clearCart();
        }
    }, [location.state, clearCart]);

    const shippingRate = 5.00;

    const total = summaryItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.price.slice(1)), 0) + shippingRate;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <div className='summary-container'>
            <h1 className='ty'>Thank you for your purchase!</h1>
            <p>Your order has been successfully processed</p>

            <div className='summary-details'>
                <h2>Order Details</h2>
                <p><strong>Order number:</strong> #12345689</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                <p><strong>Payment Method:</strong> {paymentMethod === 'credit' ? 'Credit Card' : 'Debit Card'}</p>

                <h3>Purchased Items</h3>
                <div className='item-list'>
                    {summaryItems.map((item) => (
                        <div className='item' key={item.id}>
                            <img src={item.img} alt={item.name} className='product-image' />
                            <span>{item.quantity} {item.name} - ${parseFloat(item.price.slice(1)).toFixed(2)} each</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='instructions'>
                <h2>What's next?</h2>
                <p>You will receive an email confirmation shortly. Your items will be shipped to you within 3-5 business days.</p>
            </div>

            <a href='/specialdeals' className='back-btn'>Continue Shopping</a>
        </div>
    );
}

export default Summary;
