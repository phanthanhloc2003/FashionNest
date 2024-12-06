import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Category } from 'src/entitys/category.entity';
import { ProductImage } from 'src/entitys/product-image.entity';
import { ProductVariant } from 'src/entitys/product-variant.entity';
import { Product } from 'src/entitys/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @Inject('CATEGOTY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,

    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,

    @Inject('PRODUCTVARIANT_REPOSITORY')
    private readonly variantRepository: Repository<ProductVariant>,

    @Inject('PRODUCTIMAGE_REPOSITORY')
    private readonly imageRepository: Repository<ProductImage>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async create(body: CreateProductDto) {
    try {
      const { variants, images, ...productData } = body;

      const newProduct = this.productRepository.create(productData);
      await this.productRepository.save(newProduct);

      if (variants?.length) {
        const variantEntities = variants.map((variant) =>
          this.variantRepository.create({
            ...variant,
            product: newProduct,
          }),
        );
        await this.variantRepository.save(variantEntities);
      }

      if (images?.length) {
        const imageEntities = images.map((image) =>
          this.imageRepository.create({
            ...image,
            product: newProduct,
          }),
        );
        await this.imageRepository.save(imageEntities);
      }
      return await this.productRepository.findOne({
        where: { id: newProduct.id },
        relations: ['variants', 'images'],
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product. Please try again.');
    }
  }

  async getProduct(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw error;
    }
  }
}
