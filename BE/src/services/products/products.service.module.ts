import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DatabaseModule } from 'src/db/database.module';
import { categoryProviders } from 'src/providers/category.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ProductsService, ...categoryProviders],
  exports: [ProductsService],
})
export class ProductServiceModule {}
