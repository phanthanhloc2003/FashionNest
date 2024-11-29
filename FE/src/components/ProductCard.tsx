import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  sold?: number;
}

export function ProductCard({ id, image, name, price, originalPrice, sold }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              -{discount}%
            </div>
          )}
          <button 
            className="absolute top-2 left-2 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist functionality
            }}
          >
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-sm text-gray-800 line-clamp-2 mb-2">{name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-red-500">₫{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">₫{originalPrice.toLocaleString()}</span>
            )}
          </div>
          {sold && (
            <div className="mt-2 text-xs text-gray-500">
              {sold.toLocaleString()} sold
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}