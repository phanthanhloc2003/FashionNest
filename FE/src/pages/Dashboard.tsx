import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ProductCard } from '../components/ProductCard';

export function Dashboard() {
  const products = [
    {
      id: 1,
      name: "Women's Summer Floral Dress",
      price: 299000,
      originalPrice: 499000,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
      sold: 1234
    },
    {
      id: 2,
      name: "Men's Casual Denim Jacket",
      price: 599000,
      originalPrice: 799000,
      image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800",
      sold: 856
    },
    {
      id: 3,
      name: "Classic White Sneakers",
      price: 399000,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
      sold: 2341
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 499000,
      originalPrice: 699000,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
      sold: 543
    },
    {
      id: 5,
      name: "Summer Straw Hat",
      price: 199000,
      originalPrice: 299000,
      image: "https://images.unsplash.com/photo-1565440707934-c9bacbad2146?auto=format&fit=crop&q=80&w=800",
      sold: 234
    },
    {
      id: 6,
      name: "Floral Print Blouse",
      price: 259000,
      image: "https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=800",
      sold: 678
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000"
            alt="Fashion Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="text-white ml-12">
              <h1 className="text-5xl font-bold mb-4">Summer Collection</h1>
              <p className="text-xl mb-6">Up to 50% off on selected items</p>
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800' },
              { name: 'Men', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800' },
              { name: 'Kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=800' },
              { name: 'Accessories', image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&q=80&w=800' }
            ].map((category) => (
              <div
                key={category.name}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Flash Sale</h2>
            <div className="flex items-center space-x-2 text-red-500">
              <span className="font-semibold">Ends in:</span>
              <div className="bg-red-500 text-white px-2 py-1 rounded">05</div>
              <span>:</span>
              <div className="bg-red-500 text-white px-2 py-1 rounded">23</div>
              <span>:</span>
              <div className="bg-red-500 text-white px-2 py-1 rounded">45</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Popular Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}