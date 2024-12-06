import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DatabaseModule } from 'src/db/database.module';
import { categoryProviders } from 'src/providers/category.providers';
import { ProductProviders } from 'src/providers/product.providers';
import { ProductImageProviders } from 'src/providers/product-image.providers';
import { productVariantProviders } from 'src/providers/product-variant.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ProductsService,
    ...categoryProviders,
    ...ProductProviders,
    ...ProductImageProviders,
    ...productVariantProviders,
  ],
  exports: [ProductsService],
})
export class ProductServiceModule {}
