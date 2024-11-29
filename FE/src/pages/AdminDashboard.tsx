import React from 'react';

import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { AdminLayout } from '../components/admin/AdminLayout';

export function AdminDashboard() {
  const stats = [
    {
      name: 'Total Products',
      value: '248',
      icon: Package,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Total Orders',
      value: '1,234',
      icon: ShoppingCart,
      change: '+25%',
      changeType: 'increase',
    },
    {
      name: 'Total Users',
      value: '4,567',
      icon: Users,
      change: '+18%',
      changeType: 'increase',
    },
    {
      name: 'Revenue',
      value: '$45,678',
      icon: TrendingUp,
      change: '+32%',
      changeType: 'increase',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500"> from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  id: 1,
                  type: 'order',
                  message: 'New order #12345 received from John Doe',
                  time: '5 minutes ago',
                },
                {
                  id: 2,
                  type: 'product',
                  message: 'Product "Summer Dress" stock updated',
                  time: '1 hour ago',
                },
                {
                  id: 3,
                  type: 'user',
                  message: 'New user registration: sarah@example.com',
                  time: '2 hours ago',
                },
              ].map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-600">{activity.message}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}