import React, { useState } from 'react';
import { Star, ThumbsUp, Image as ImageIcon } from 'lucide-react';
import type { Review } from '../../types/product';

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Product Reviews</h2>

      {/* Rating Summary */}
      <div className="flex items-center space-x-8 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">{reviews.length} reviews</div>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((review) => review.rating === rating).length;
            const percentage = (count / reviews.length) * 100;
            return (
              <div key={rating} className="flex items-center space-x-2 mb-1">
                <div className="text-sm text-gray-500 w-8">{rating} star</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-gray-500 w-12">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Filters */}
      <div className="flex space-x-4 mb-6">
        {['all', 'with-photos', '5-star', '4-star', '3-star', '2-star', '1-star'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-medium">
                    {review.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{review.userName}</span>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-700 mb-4">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.images.map((image, index) => (
                  <div key={index} className="h-20 w-20 rounded-lg overflow-hidden">
                    <img src={image} alt={`Review ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.likes})</span>
              </button>
              {review.images && (
                <button className="flex items-center space-x-1 text-sm text-gray-500">
                  <ImageIcon className="h-4 w-4" />
                  <span>{review.images.length} photos</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}