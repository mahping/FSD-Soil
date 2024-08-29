import React from 'react';
import { render, act } from '@testing-library/react';
import { CartProvider } from './CartContext';
import CartContext from './CartContext';
import { getCart, addToCart as addToCartAPI, updateCartItem as updateCartItemAPI, removeFromCart as removeFromCartAPI, getUser } from '../data/repository';
import { toast } from 'react-toastify';

jest.mock('../data/repository');
jest.mock('react-toastify');

describe('CartContext', () => {
  let testProduct;
  let user;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    testProduct = { id: 1, name: 'Test Product', price: 10 };
    user = { id: 1, name: 'Test User' };
    getUser.mockReturnValue(user);
  });

  test('should add a product to the cart', async () => {
    // Explanation: This test checks if a product can be successfully added to the cart. 
    // It verifies that the cartItems state updates correctly and that the product is added with an initial quantity of 1.
    getCart.mockResolvedValue([]);
    addToCartAPI.mockResolvedValue();

    let cartItems;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {value => {
            cartItems = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    await act(async () => {
      await cartItems.addToCart(testProduct);
    });

    expect(cartItems.cartItems).toHaveLength(1);
    expect(cartItems.cartItems[0]).toEqual({ ...testProduct, quantity: 1 });
  });

  test('should update product quantity in the cart', async () => {
    // Explanation: This test checks if the quantity of an existing product in the cart can be successfully updated.
    // It verifies that the cartItems state updates correctly and that the product quantity increments.
    getCart.mockResolvedValue([{ ...testProduct, quantity: 1 }]);
    addToCartAPI.mockResolvedValue();

    let cartItems;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {value => {
            cartItems = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    await act(async () => {
      await cartItems.addToCart(testProduct);
    });

    expect(cartItems.cartItems).toHaveLength(1);
    expect(cartItems.cartItems[0].quantity).toBe(2);
  });

  test('should remove a product from the cart', async () => {
    // Explanation: This test checks if a product can be successfully removed from the cart. 
    // It verifies that the cartItems state updates correctly and that the product is removed.
    getCart.mockResolvedValue([{ ...testProduct, quantity: 1 }]);
    removeFromCartAPI.mockResolvedValue();

    let cartItems;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {value => {
            cartItems = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    await act(async () => {
      await cartItems.removeFromCart(testProduct.id);
    });

    expect(cartItems.cartItems).toHaveLength(0);
  });
});
