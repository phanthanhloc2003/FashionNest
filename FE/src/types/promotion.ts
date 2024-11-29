export interface Promotion {
    id?: number;
    name: string;
    description?: string;
    discountType: 'percentage' | 'fixed_amount';
    discountValue: number;
    startDate: string;
    endDate: string;
    minimumOrderAmount?: number;
    createdAt?: string;
  }
  
  export interface ProductPromotion {
    id?: number;
    productId: number;
    promotionId: number;
    createdAt?: string;
  }