import React from 'react';
import { Image as ImageIcon, X, Plus } from 'lucide-react';
import type { ProductImage } from '../../../types/product';

interface ImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const handleImageAdd = (url: string) => {
    const newImage: ProductImage = {
      imageUrl: url,
      isPrimary: images.length === 0, // First image is primary by default
    };
    onChange([...images, newImage]);
  };

  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    if (images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    onChange(newImages);
  };

  const handleSetPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative group rounded-lg overflow-hidden border-2 ${
              image.isPrimary ? 'border-purple-500' : 'border-gray-200'
            }`}
          >
            <img
              src={image.imageUrl}
              alt={`Product ${index + 1}`}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => handleSetPrimary(index)}
                className={`p-1.5 rounded-full ${
                  image.isPrimary ? 'bg-purple-500' : 'bg-white'
                } text-white hover:bg-purple-600`}
                disabled={image.isPrimary}
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {image.isPrimary && (
              <span className="absolute top-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                Primary
              </span>
            )}
          </div>
        ))}
        {images.length < 8 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 hover:text-purple-500 cursor-pointer">
            <Plus className="w-8 h-8 mb-2" />
            <input
              type="url"
              placeholder="Enter image URL"
              className="w-full text-sm text-center focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  handleImageAdd(input.value);
                  input.value = '';
                }
              }}
            />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">
        Upload up to 8 images. Click on an image to set it as primary.
      </p>
    </div>
  );
}