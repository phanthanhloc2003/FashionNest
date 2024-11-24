import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserServiceModule } from 'src/services/users/users.service.module';

@Module({
  imports: [UserServiceModule],
  controllers: [UsersController],
})
export class UsersControllerModule {}
