
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';

export function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:space-x-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                  <p className="text-sm text-gray-500">{user?.phone}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-2 text-purple-600 p-2 rounded-lg bg-purple-50">
                  <User className="h-5 w-5" />
                  <span>My Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                  <ShoppingBag className="h-5 w-5" />
                  <span>My Orders</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-red-600 p-2 rounded-lg hover:bg-red-50 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.fullName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.phone}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}