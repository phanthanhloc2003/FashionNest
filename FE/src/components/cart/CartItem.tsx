import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="py-6 flex animate-fadeIn">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/product/${item.productId}`} className="hover:text-purple-600">
                {item.name}
              </Link>
            </h3>
            <p className="ml-4">₫{item.price.toLocaleString()}</p>
          </div>
          {(item.size || item.color) && (
            <p className="mt-1 text-sm text-gray-500">
              {item.size && `Size: ${item.size}`}
              {item.size && item.color && ' / '}
              {item.color && `Color: ${item.color}`}
            </p>
          )}
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-2 text-gray-600 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, Math.min(item.maxQuantity, item.quantity + 1))}
              className="p-2 text-gray-600 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity >= item.maxQuantity}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-red-600 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}