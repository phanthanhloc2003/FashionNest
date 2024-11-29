import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">({product.reviews.length} reviews)</span>
          </div>
          <span className="text-sm text-gray-500">{product.sold.toLocaleString()} sold</span>
        </div>
      </div>

      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-bold text-red-500">₫{product.price.toLocaleString()}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-gray-400 line-through">
              ₫{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-red-500">-{discount}%</span>
          </>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Description</h3>
        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedSize === size
                  ? 'bg-purple-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>
        <div className="mt-2 flex space-x-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color.name ? 'border-purple-600' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.code }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
        <div className="mt-2 flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 border border-gray-300 rounded-md"
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-3 py-1 border border-gray-300 rounded-md"
          >
            +
          </button>
          <span className="text-sm text-gray-500">{product.stock} available</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2">
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
        <button className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50">
          <Heart className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}