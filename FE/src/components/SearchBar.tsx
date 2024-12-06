import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    // console.log('Searching for:', query);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="flex-1 max-w-2xl mx-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for products, brands and more..."
            className="w-full pl-12 pr-12 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-14 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-4 text-purple-600 hover:text-purple-700"
          >
            Search
          </button>
        </div>

        {/* Search suggestions */}
        {isFocused && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 text-xs text-gray-500 uppercase">Popular Searches</div>
            {['Summer Dresses', 'Men\'s Sneakers', 'Denim Jackets', 'Accessories'].map((item) => (
              <button
                key={item}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 text-left flex items-center"
              >
                <Search className="h-4 w-4 mr-2 text-gray-400" />
                {item}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}