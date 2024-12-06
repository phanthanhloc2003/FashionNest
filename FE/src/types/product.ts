export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: { name: string; code: string }[];
  stock: number;
  sold: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  images?: string[];
}

export interface ProductImage {
  id?: number;
  image_url: string;
  isPrimary: boolean;
}
export interface ProductVariant {
  id?: number;
  size: string;
  color: string;
  sku: string;
  stockQuantity: number;
  priceAdjustment: number;
}

export interface ProductFormData {
  name: string;
  categoryId: string;
  description: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  brand: string;
  variants: ProductVariant[];
  images: ProductImage[];
}

export interface CategotyData {
  id: number;
  name: string;
}
