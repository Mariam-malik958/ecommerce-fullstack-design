import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add To Cart
  const addToCart = (product) => {
    const productId = product._id || product.id; // ✅ FIX: _id || id support

    const existingProduct = cartItems.find(
      (item) => (item._id || item.id) === productId // ✅ FIX
    );

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          (item._id || item.id) === productId // ✅ FIX
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  // Remove From Cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => (item._id || item.id) !== id)); // ✅ FIX
  };

  // Update Quantity
  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map(item => {
      if ((item._id || item.id) === id) { // ✅ FIX
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => {
      const priceNum = typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
        : item.price;
      return total + (priceNum || 0) * item.quantity;
    },
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);