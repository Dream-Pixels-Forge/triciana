import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Cart Context
 * Manages shopping cart state across the application
 */
const CartContext = createContext(null);

/**
 * Cart Provider Component
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on mount
    const saved = localStorage.getItem('triciana-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('triciana-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1, options = {}) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && 
                JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingIndex > -1) {
        // Update quantity of existing item
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        // Add new item
        return [...prev, { ...product, quantity, options }];
      }
    });
    setIsCartOpen(true);
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Cart calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartSubtotal = cartTotal;
  const cartTax = cartTotal * 0.08; // 8% tax
  const cartShipping = cartTotal > 75 ? 0 : 9.99; // Free shipping over $75
  const cartFinalTotal = cartSubtotal + cartTax + cartShipping;

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartFinalTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Use Cart Hook
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
