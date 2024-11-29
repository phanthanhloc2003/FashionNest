import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Thumbnails */}
      <div className="col-span-2 space-y-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-full aspect-square rounded-lg border-2 overflow-hidden ${
              selectedImage === index ? 'border-purple-600' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="col-span-10">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={images[selectedImage]}
            alt="Product main"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}