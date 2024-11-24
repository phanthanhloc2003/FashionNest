import { Module } from '@nestjs/common';
import { Authservices } from './auth.service';
import { UserServiceModule } from '../users/users.service.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategys/jwt.strategy';

@Module({
  imports: [
    UserServiceModule,
    PassportModule,
    JwtModule.register({
      secret: 'ádsdsad',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [Authservices, LocalStrategy, JwtStrategy],
  exports: [Authservices],
})
export class AuthServiceModule {}
