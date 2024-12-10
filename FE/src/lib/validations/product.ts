import { z } from "zod";

export const productVariantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  sku: z.string().min(1, "SKU is required"),
  stock_quantity: z.number().min(0, "Stock must be greater than or equal to 0"),
  priceAdjustment: z.number().default(0),
});

export const productImageSchema = z.object({
  image_url: z.string().url("Must be a valid URL"),
  isPrimary: z.boolean().default(false),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  sale_price: z
    .number()
    .min(0, "Sale price must be greater than or equal to 0")
    .optional(),
  brand: z.string().min(1, "Brand is required"),
  variants: z
    .array(productVariantSchema)
    .min(1, "At least one variant is required"),
  images: z
    .array(productImageSchema)
    .min(1, "At least one image is required")
    .refine(
      (images) => images.some((img) => img.isPrimary),
      "One image must be set as primary"
    ),
});
