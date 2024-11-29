import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ImageGallery } from '../components/ProductDetail/ImageGallery';
import { ProductInfo } from '../components/ProductDetail/ProductInfo';
import { Reviews } from '../components/ProductDetail/Reviews';

const mockProduct = {
  id: 1,
  name: "Women's Summer Floral Maxi Dress",
  price: 299000,
  originalPrice: 499000,
  description: "A beautiful floral maxi dress perfect for summer occasions. Made with lightweight, breathable fabric featuring a flattering A-line silhouette and adjustable waist tie.",
  images: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800"
  ],
  category: "Dresses",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Blue", code: "#1E40AF" },
    { name: "Pink", code: "#EC4899" },
    { name: "Green", code: "#059669" }
  ],
  stock: 50,
  sold: 1234,
  rating: 4.5,
  reviews: [
    {
      id: 1,
      userId: "user1",
      userName: "Sarah Johnson",
      rating: 5,
      comment: "This dress is absolutely beautiful! The fabric is high quality and the fit is perfect. I've received so many compliments wearing it.",
      date: "2024-03-15",
      likes: 24,
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      id: 2,
      userId: "user2",
      userName: "Emily Davis",
      rating: 4,
      comment: "Love the dress but it runs a bit large. I would recommend sizing down. Otherwise, great purchase!",
      date: "2024-03-14",
      likes: 12
    }
  ]
};

export function ProductDetail() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ImageGallery images={mockProduct.images} />
          <ProductInfo product={mockProduct} />
        </div>
        <Reviews reviews={mockProduct.reviews} />
      </div>
    </Layout>
  );
}