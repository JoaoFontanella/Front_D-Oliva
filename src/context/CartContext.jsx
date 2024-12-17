import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    const priceString = product.description.replace('R$', '').trim();
    const price = parseFloat(priceString.replace(',', '.'));

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      const newItem = {
        ...product,
        price: price,
        quantity: 1,
        image: product.image
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    );
    const filteredCartItems = updatedCartItems.filter(
      (item) => item.quantity > 0
    );
    setCartItems(filteredCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
