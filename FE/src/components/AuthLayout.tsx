import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <ShoppingBag className="mx-auto h-12 w-12 text-purple-600" />
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-purple-600">FASHION STORE</h1>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}