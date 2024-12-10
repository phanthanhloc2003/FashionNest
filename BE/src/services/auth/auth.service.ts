import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserNoPassword } from 'src/entitys/user.entity';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class Authservices {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    try {
      const user = await this.userService.findOneByPhone(username);
      if (user && bcrypt.compareSync(pass, user?.passwordHash)) {
        const result = { ...user };
        delete result.passwordHash;
        delete result.role;
        return result;
      }
      throw new HttpException(
        'Phone number or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async login(user: UserNoPassword, response: Response) {
    const refreshToken = this.createRefreshToken(user);
    response.cookie('c_user', refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, // Thời gian sống của cookie: 1 ngày
      httpOnly: true, // Cookie không thể truy cập từ JavaScript
      secure: false, // Chỉ bật nếu chạy HTTP
    });
    const payload = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return {
      access_token: this.jwtService.sign(payload),

      user,
    };
  }

  async handleRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<
        UserNoPassword & { exp: number; iat: number }
      >(refreshToken, {
        secret: this.configService.get<string>('KEY_REFRESH_TOKEN'),
      });
      const phone = payload.phone;
      const user = await this.userService.findOneByPhone(phone);
      if (!user) throw new UnauthorizedException();
      const payloadResponse = { ...user };
      delete payloadResponse.passwordHash;

      return {
        accessToken: this.jwtService.sign(payloadResponse),
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  createRefreshToken(payload: UserNoPassword, time?: number) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('KEY_REFRESH_TOKEN'),
      expiresIn: time ?? this.configService.get<string>('TIME_REFRESH_TOKEN'),
    });
    return refreshToken;
  }
  async handleLogout(response: Response): Promise<{ message: string }> {
    response.clearCookie('c_user');
    return { message: 'Logged out successfully' };
  }
}
