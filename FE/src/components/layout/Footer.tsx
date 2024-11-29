import React from 'react';
import { ShoppingBag, Facebook, Instagram, Twitter, Youtube, CreditCard, Truck, Clock, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      {/* Features */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Truck className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-gray-500">Dedicated support</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Money Back</h3>
                <p className="text-sm text-gray-500">30 days guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">FASHION STORE</span>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Your one-stop destination for trendy fashion and accessories.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-4">
              {['New Arrivals', 'Best Sellers', 'Sale', 'Collections'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-purple-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Help</h3>
            <ul className="mt-4 space-y-4">
              {['Track Order', 'Returns', 'Shipping', 'FAQs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-purple-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-gray-500 text-sm">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-l-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-r-lg border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Fashion Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}