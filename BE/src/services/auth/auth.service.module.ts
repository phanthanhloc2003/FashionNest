import { Module } from '@nestjs/common';
import { Authservices } from './auth.service';
import { UserServiceModule } from '../users/users.service.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategys/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserServiceModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('KEY_ACCESS_TOKEN'),
        signOptions: {
          expiresIn: configService.get<string>('TIME_ACCESS_TOKEN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Authservices, LocalStrategy, JwtStrategy],
  exports: [Authservices],
})
export class AuthServiceModule {}
