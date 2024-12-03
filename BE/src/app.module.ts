import { Module } from '@nestjs/common';
import { UsersControllerModule } from './controllers/users/users.controller.module';
import { AuthControllerModule } from './controllers/auth/auth.controller.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsControllerModule } from './controllers/products/products.controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersControllerModule,
    AuthControllerModule,
    ProductsControllerModule,
  ],
})
export class AppModule {}
