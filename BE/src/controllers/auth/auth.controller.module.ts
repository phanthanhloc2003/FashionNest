import { Module } from '@nestjs/common';

import { AuthServiceModule } from 'src/services/auth/auth.service.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthServiceModule],
  controllers: [AuthController],
})
export class AuthControllerModule {}
