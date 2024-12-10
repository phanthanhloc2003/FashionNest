import type { CartItem } from '../types/cart';

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    productId: 1,
    name: "Women's Summer Floral Dress",
    price: 299000,
    quantity: 1,
    maxQuantity: 5,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
    size: "M",
    color: "Blue"
  },
  {
    id: 2,
    productId: 2,
    name: "Men's Casual Denim Jacket",
    price: 599000,
    quantity: 2,
    maxQuantity: 3,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800",
    size: "L",
    color: "Dark Blue"
  },
  {
    id: 3,
    productId: 3,
    name: "Classic White Sneakers",
    price: 399000,
    quantity: 1,
    maxQuantity: 10,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    size: "42",
    color: "White"
  }
];