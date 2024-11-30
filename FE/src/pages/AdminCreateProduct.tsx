import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
// import { adminApi } from '../../lib/api/admin';
import { ProductFormData } from '../types/product';
import { productSchema } from '../lib/validations/product';
import { BasicInfoForm } from '../components/admin/products/BasicInfoForm';
import { AdminLayout } from '../components/admin/AdminLayout';
import { VariantForm } from '../components/admin/products/VariantForm';
import { ImageForm } from '../components/admin/products/ImageForm';


export function AdminCreateProduct() {
  const navigate = useNavigate();
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [],
      images: [],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
    //   await adminApi.createProduct(data);
      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <BasicInfoForm />
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Product Images</h2>
              <ImageForm />
            </div>

            {/* Variants */}
            <div className="bg-white rounded-lg shadow p-6">
              <VariantForm />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {methods.formState.isSubmitting ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </AdminLayout>
  );
}