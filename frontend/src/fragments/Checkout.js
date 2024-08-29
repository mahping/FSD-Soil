import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Checkout.css';
import CartContext from "./CartContext";

function Checkout() {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState('credit');

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/purchasesummary', { state: { cartItems, paymentMethod } });
    };

    return(
        <>
        <div className='header-checkout'>
            <h3>Checkout</h3>
        </div>
        <div className='container-checkout'>
            <a href='/cart'>Edit Your Cart</a>
            <h4>Billing Address</h4>
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='form-group half-width'>
                        <label for='firstname'>First Name</label>
                        <input type='text' className='form-control' id='firstname' placeholder='First Name' required />
                    </div>
                    <div className='form-group half-width'>
                        <label for='lastname'>Last Name</label>
                        <input type='text' className='form-control' id='lastname' placeholder='Last Name' required />
                    </div>
                </div>
                <div className='form-group'>
                    <label for='username'>Username</label>
                    <div className='input-group'>
                        <input type='text' className='form-control' id='username' placeholder='Username' required />
                    </div>
                </div>
                <div className='form-group'>
                    <label for='email'>Email</label>
                    <input type='email' className='form-control' id='email' placeholder='you@example.com' required />
                </div>
                <div className='form-group'>
                    <label for='address'>Address</label>
                    <input type='text' className='form-control' id='address' placeholder='1234 Main Street' required />
                </div>
                <div className='form-group'>
                    <label for='address2'>Address 2</label>
                    <input type='text' className='form-control' id='address2' placeholder='Apartment, studio, or floor' />
                </div>
                <div className='form-row'>
                    <div className='form-group third-width'>
                        <label for='country'>Country</label>
                        <select className='form-control' id='country'>
                            <option value>Choose...</option>
                            <option>Australia</option>
                        </select>
                    </div>
                    <div className='form-group third-width'>
                        <label for='state'>State</label>
                        <select className='form-control' id='state'>
                            <option value>Choose...</option>
                            <option>NSW</option>
                            <option>QLD</option>
                            <option>SA</option>
                            <option>TAS</option>
                            <option>VIC</option>
                            <option>WA</option>
                        </select>
                    </div>
                    <div className='form-group third-width'>
                        <label for='city'>City</label>
                        <select className='form-control' id='city'>
                            <option value>Choose...</option>
                            <option>Melbourne</option>
                            <option>Sydney</option>
                            <option>Perth</option>
                            <option>Adelaide</option>
                            <option>Brisbane</option>
                            <option>Hobart</option>
                        </select>
                    </div>
                    <div className='form-group third-width'>
                        <label for='postcode'>Postcode</label>
                        <input type='text' pattern='[0-9]{4}' className='form-control' id='postcode' placeholder='Postcode' required />
                    </div>
                </div>
                <hr />
                <div className='form-check'>
                    <input type='checkbox' id='shipping-address' />
                    <label for='shipping-address'>Shipping address is the same as my billing address</label>
                </div>
                <div className='form-check'>
                    <input type='checkbox' id='save-address' />
                    <label for='save-address'>Save this information for next time</label>
                </div>
                <hr />
                <h4>Payment</h4>
                <div class='form-check'>
                <input type="radio" id="credit" name="payment-method" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} required />
                    <label for="credit">Credit Card</label>
                </div>
                <div class='form-check'>
                <input type="radio" id="debit" name="payment-method" value="debit" checked={paymentMethod === 'debit'} onChange={() => setPaymentMethod('debit')} required />
                    <label for="debit">Dedit Card</label>
                </div>
                <div className="form-row">
				    <div className="form-group half-width">
					    <label htmlFor="card-name">Name on card</label>
					    <input type="text" className="form-control" id="card-name" required />
				    </div>
				    <div className="form-group half-width">
					    <label htmlFor="card-no">Card Number</label>
					    <input 
                            type="text" 
                            className="form-control" 
                            id="card-no" 
                            pattern="\d{16}" 
                            title="Credit card number must be 16 digits" 
                            required />
				    </div>
			    </div>
                <div className="form-row">
				    <div className="form-group half-width">
					    <label htmlFor="expiration">Expiration Date</label>
					    <input 
                            type="text" 
                            className="form-control" 
                            id="expiration" 
                            pattern="\d{2}/\d{2}" 
                            placeholder="MM/YY" 
                            title="Expiration date must be in MM/YY format" 
                            required />
				    </div>
				    <div className="form-group half-width">
					    <label htmlFor="ccv-no">CVV</label>
					    <input 
                            type="text" 
                            className="form-control" 
                            id="ccv-no" 
                            pattern="\d{3}" 
                            title="CVV must be 3 digits" 
                            required />
				    </div>
			    </div>

                <button type='submit' className='checkout-btn'>Place Order</button>
            </form>
        </div>
        </>
    );
}

export default Checkout;