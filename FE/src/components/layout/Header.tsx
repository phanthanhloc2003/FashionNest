import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User as UserIcon, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SearchBar } from '../SearchBar';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {/* Top banner */}
      <div className="bg-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">Free shipping on orders over $50! 🚚</p>
        </div>
      </div>

      {/* Main header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">FASHION STORE</span>
            </Link>

            <SearchBar />

            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="flex flex-col items-center text-gray-700 hover:text-purple-600">
                <Heart className="h-6 w-6" />
                <span className="text-xs mt-1">Wishlist</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center text-gray-700 hover:text-purple-600 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-xs mt-1">Cart</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <div className="relative group">
                <button className="flex flex-col items-center text-gray-700 hover:text-purple-600">
                  <UserIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">{user?.fullName}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                    My Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 inline mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories menu */}
          <div className="border-t">
            <ul className="flex space-x-8 py-3">
              {['New Arrivals', 'Women', 'Men', 'Kids', 'Accessories', 'Sale'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}