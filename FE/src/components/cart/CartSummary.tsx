import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartSummary as CartSummaryType } from '../../types/cart';

interface CartSummaryProps {
  summary: CartSummaryType;
}

export function CartSummary({ summary }: CartSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Subtotal</p>
          <p className="text-sm font-medium text-gray-900">₫{summary.subtotal.toLocaleString()}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Shipping</p>
          <p className="text-sm font-medium text-gray-900">
            {summary.shipping > 0 ? `₫${summary.shipping.toLocaleString()}` : 'Free'}
          </p>
        </div>

        {summary.discount > 0 && (
          <div className="flex items-center justify-between text-red-600">
            <p className="text-sm">Discount</p>
            <p className="text-sm font-medium">-₫{summary.discount.toLocaleString()}</p>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-gray-900">Order total</p>
            <p className="text-base font-medium text-gray-900">₫{summary.total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-purple-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Proceed to Checkout
        </button>
      </div>

      <div className="mt-6 text-sm text-center">
        <p className="text-gray-600">or</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-purple-600 font-medium hover:text-purple-500"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}