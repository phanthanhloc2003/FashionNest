
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, Heart, User as UserIcon, Package, LogOut } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-purple-600" />
              <h1 className="ml-2 text-xl font-bold text-purple-600">FASHION STORE</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-purple-600">
                <Heart className="h-6 w-6" />
              </button>
              <button className="text-gray-600 hover:text-purple-600">
                <ShoppingBag className="h-6 w-6" />
              </button>
              <span className="text-gray-900">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800"
                alt="Women's Fashion"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Women's Fashion</h3>
              <p className="text-gray-600">Discover the latest trends in women's clothing</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800"
                alt="Men's Fashion"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Men's Fashion</h3>
              <p className="text-gray-600">Explore our collection of men's wear</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800"
                alt="Accessories"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Accessories</h3>
              <p className="text-gray-600">Complete your look with our accessories</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg flex items-center">
              <Package className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg flex items-center">
              <UserIcon className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold">Member Discount</h3>
                <p className="text-sm text-gray-600">Up to 20% off</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg flex items-center">
              <Package className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day returns</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg flex items-center">
              <Heart className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold">Special Offers</h3>
                <p className="text-sm text-gray-600">Save on your first order</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}