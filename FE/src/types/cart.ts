export interface CartItem {
    id: number;
    productId: number;
    variantId?: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
    color?: string;
    maxQuantity: number;
  }
  
  export interface CartSummary {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
  }