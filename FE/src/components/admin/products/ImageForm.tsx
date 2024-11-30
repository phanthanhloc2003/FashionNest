import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Image as ImageIcon, X, Plus } from 'lucide-react';
import type { ProductFormData } from '../../../types/product';

export function ImageForm() {
  const { control, register, formState: { errors } } = useFormContext<ProductFormData>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'images',
  });

  const handleSetPrimary = (index: number) => {
    fields.forEach((field, i) => {
      update(i, { ...field, isPrimary: i === index });
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`relative group rounded-lg overflow-hidden border-2 ${
              field.isPrimary ? 'border-purple-500' : 'border-gray-200'
            }`}
          >
            <img
              src={field.imageUrl}
              alt={`Product ${index + 1}`}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => handleSetPrimary(index)}
                className={`p-1.5 rounded-full ${
                  field.isPrimary ? 'bg-purple-500' : 'bg-white'
                } text-white hover:bg-purple-600`}
                disabled={field.isPrimary}
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {field.isPrimary && (
              <span className="absolute top-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                Primary
              </span>
            )}
            <input type="hidden" {...register(`images.${index}.imageUrl`)} />
            <input type="hidden" {...register(`images.${index}.isPrimary`)} />
          </div>
        ))}

        {fields.length < 8 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 hover:text-purple-500">
            <Plus className="w-8 h-8 mb-2" />
            <input
              type="url"
              placeholder="Enter image URL"
              className="w-full text-sm text-center focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  append({ imageUrl: input.value, isPrimary: fields.length === 0 });
                  input.value = '';
                }
              }}
            />
          </div>
        )}
      </div>

      {errors.images && (
        <p className="text-sm text-red-600">{errors.images.message}</p>
      )}

      <p className="text-sm text-gray-500">
        Upload up to 8 images. Click on an image to set it as primary.
      </p>
    </div>
  );
}