import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/db/database.module';
import { UserProviders } from 'src/providers/user.providers';
@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
})
export class UserServiceModule {}
