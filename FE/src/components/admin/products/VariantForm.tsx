import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { ProductFormData } from '../../../types/product';

export function VariantForm() {
  const { control, register, formState: { errors } } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
        <button
          type="button"
          onClick={() => append({ size: '', color: '', sku: '', stock_quantity: 0, priceAdjustment: 0 })}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Variant
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <select
                  {...register(`variants.${index}.size`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  <option value="">Select Size</option>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.variants?.[index]?.size && (
                  <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.size?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="text"
                  {...register(`variants.${index}.color`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="e.g., Red"
                />
                {errors.variants?.[index]?.color && (
                  <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.color?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">SKU</label>
                <input
                  type="text"
                  {...register(`variants.${index}.sku`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="SKU-001"
                />
                {errors.variants?.[index]?.sku && (
                  <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.sku?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  {...register(`variants.${index}.stock_quantity`, { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  min="0"
                />
                {errors.variants?.[index]?.stock_quantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.variants[index]?.stock_quantity?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price Adjustment</label>
                <input
                  type="number"
                  {...register(`variants.${index}.priceAdjustment`, { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  step="0.01"
                />
                {errors.variants?.[index]?.priceAdjustment && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.variants[index]?.priceAdjustment?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No variants added. Click "Add Variant" to create product variations.
        </p>
      )}
    </div>
  );
}