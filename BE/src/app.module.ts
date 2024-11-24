import { Module } from '@nestjs/common';
import { UsersControllerModule } from './controllers/users/users.controller.module';
import { AuthControllerModule } from './controllers/auth/auth.controller.module';

@Module({
  imports: [UsersControllerModule, AuthControllerModule],
})
export class AppModule {}
