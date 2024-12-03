import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductServiceModule } from 'src/services/products/products.service.module';

@Module({
  imports: [ProductServiceModule],
  controllers: [ProductsController],
})
export class ProductsControllerModule {}
