import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, CartSummary } from '../types/cart';
import { mockCartItems } from '../data/mockCart';

interface CartContextType {
  items: CartItem[];
  summary: CartSummary;
  addItem: (item: CartItem) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_THRESHOLD = 500000;
const SHIPPING_FEE = 30000;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    } else {
      setItems(mockCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(mockCartItems));
    updateSummary();
  }, [items]);

  const updateSummary = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const discount = subtotal >= 1000000 ? subtotal * 0.1 : 0;

    setSummary({
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount,
    });
  };

  const addItem = (item: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      if (existingItem) {
        return currentItems.map((i) =>
          i.id === existingItem.id
            ? { ...i, quantity: Math.min(i.maxQuantity, i.quantity + item.quantity) }
            : i
        );
      }

      return [...currentItems, { ...item, id: Date.now() }];
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}