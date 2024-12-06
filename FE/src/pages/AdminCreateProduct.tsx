import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ProductFormData } from "../types/product";
import { productSchema } from "../lib/validations/product";
import { ImageForm } from "../components/admin/products/ImageForm";
import { BasicInfoForm } from "../components/admin/products/BasicInfoForm";
import { VariantForm } from "../components/admin/products/VariantForm";
import { AdminLayout } from "../components/admin/AdminLayout";
import { ProductApi } from "../api/product";

export function AdminCreateProduct() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [],
      images: [],
    },
    mode: "all",
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        "name",
        "category",
        "description",
        "price",
        "stock_quantity",
        "brand",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger("images");
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      await ProductApi.createProduct(data);
      toast.success("Product created successfully");
      navigate('/admin/products');
    } catch (error) {
      console.log(error);
      toast.error("sku has been duplicated");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h2>
            <BasicInfoForm />
          </div>
        );
      case 2:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Product Images
            </h2>
            <ImageForm />
          </div>
        );
      case 3:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <VariantForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Product
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
            {["Basic Information", "Product Images", "Product Variants"].map(
              (step, index) => (
                <div
                  key={step}
                  className={`flex flex-col items-center ${
                    index + 1 <= currentStep
                      ? "text-purple-600"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index + 1 <= currentStep
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm font-medium">{step}</span>
                </div>
              )
            )}
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {renderStepContent()}

            {/* Form Actions */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <div className="ml-auto flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating..." : "Create Product"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </AdminLayout>
  );
}
