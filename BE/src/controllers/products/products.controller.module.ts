import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductServiceModule } from 'src/services/products/products.service.module';
import { UserServiceModule } from 'src/services/users/users.service.module';

@Module({
  imports: [ProductServiceModule, UserServiceModule],
  controllers: [ProductsController],
})
export class ProductsControllerModule {}
